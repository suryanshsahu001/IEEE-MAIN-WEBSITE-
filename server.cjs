const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3001;

// Path to user's Excel file in OneDrive Desktop
const EXCEL_PATH = 'C:\\Users\\VICTUS\\OneDrive\\Desktop\\IEEE\\STUDENT  DATA.xlsx';
const BACKUP_QUEUE_PATH = path.join(__dirname, 'submissions_backup.json');

app.use(cors());
app.use(express.json());

// Standard Headers matching application requirements
const HEADERS = [
  'Submission Date & Time',
  'Position Applied',
  'Full Name',
  'Email Address',
  'Phone Number',
  'Academic Year',
  'Branch / Stream',
  'IEEE Membership Number',
  'Statement / Why Suited'
];

function readOrCreateWorkbook() {
  let wb;
  if (fs.existsSync(EXCEL_PATH)) {
    try {
      wb = XLSX.readFile(EXCEL_PATH);
    } catch {
      wb = XLSX.utils.book_new();
    }
  } else {
    wb = XLSX.utils.book_new();
  }

  const sheetName = wb.SheetNames[0] || 'Sheet1';
  let sheet = wb.Sheets[sheetName];

  if (!sheet) {
    sheet = XLSX.utils.aoa_to_sheet([HEADERS]);
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  }

  return { wb, sheetName };
}

// Queue helper in case Excel file is locked in desktop Excel app
function appendToBackupQueue(row) {
  try {
    let queue = [];
    if (fs.existsSync(BACKUP_QUEUE_PATH)) {
      queue = JSON.parse(fs.readFileSync(BACKUP_QUEUE_PATH, 'utf8') || '[]');
    }
    queue.push(row);
    fs.writeFileSync(BACKUP_QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving to backup queue:', e);
  }
}

function flushBackupQueue(wb, sheetName) {
  if (!fs.existsSync(BACKUP_QUEUE_PATH)) return;
  try {
    const queue = JSON.parse(fs.readFileSync(BACKUP_QUEUE_PATH, 'utf8') || '[]');
    if (queue.length === 0) return;

    let rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
    if (!rows || rows.length === 0 || !rows[0]) {
      rows = [HEADERS];
    }

    queue.forEach(row => rows.push(row));
    wb.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(rows);
    fs.unlinkSync(BACKUP_QUEUE_PATH);
    console.log(`Flushed ${queue.length} pending queued submissions into Excel.`);
  } catch (e) {
    console.error('Error flushing queue:', e);
  }
}

// Endpoint to append application row to Excel
app.post('/api/apply', async (req, res) => {
  try {
    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantYear,
      applicantBranch,
      ieeeMemberId,
      position,
      statement,
      timestamp
    } = req.body;

    if (!applicantName || !applicantEmail || !ieeeMemberId || !position) {
      return res.status(400).json({
        success: false,
        message: 'Missing required application fields (Name, Email, IEEE ID, Position).'
      });
    }

    const submissionTime = timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const newRow = [
      submissionTime,
      position,
      applicantName,
      applicantEmail,
      applicantPhone || '',
      applicantYear || '',
      applicantBranch || '',
      ieeeMemberId,
      statement || ''
    ];

    let writeSuccess = false;
    let attempts = 0;

    // Retry loop (3 attempts)
    while (!writeSuccess && attempts < 3) {
      attempts++;
      try {
        const { wb, sheetName } = readOrCreateWorkbook();
        flushBackupQueue(wb, sheetName);

        let rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
        if (!rows || rows.length === 0 || !rows[0] || rows[0].length === 0) {
          rows = [HEADERS];
        }

        rows.push(newRow);

        const updatedSheet = XLSX.utils.aoa_to_sheet(rows);
        updatedSheet['!cols'] = [
          { wch: 24 },
          { wch: 28 },
          { wch: 22 },
          { wch: 28 },
          { wch: 16 },
          { wch: 14 },
          { wch: 20 },
          { wch: 24 },
          { wch: 45 }
        ];

        wb.Sheets[sheetName] = updatedSheet;
        XLSX.writeFile(wb, EXCEL_PATH);
        writeSuccess = true;
      } catch (err) {
        if (err.code === 'EBUSY') {
          // Wait 400ms before retrying
          await new Promise(r => setTimeout(r, 400));
        } else {
          throw err;
        }
      }
    }

    if (!writeSuccess) {
      // If still locked because the user has the workbook open in Microsoft Excel,
      // save safely into persistent local queue and tell the user politely or auto-sync
      appendToBackupQueue(newRow);
      console.log(`[QUEUED] Excel file is currently open in Excel. Appended to queue safely.`);

      return res.status(200).json({
        success: true,
        queued: true,
        message: 'Application recorded safely and queued! (Please close Excel to allow instant synchronization).',
        data: {
          position,
          applicantName,
          submissionTime
        }
      });
    }

    console.log(`[${new Date().toISOString()}] Saved application for ${applicantName} (${position}) to Excel.`);

    return res.status(200).json({
      success: true,
      message: 'Application recorded successfully into Excel workbook.',
      data: {
        position,
        applicantName,
        submissionTime
      }
    });
  } catch (error) {
    console.error('Error saving application to Excel:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save application to Excel: ' + error.message
    });
  }
});

// Periodic auto-sync worker to flush queued items whenever Excel is closed
setInterval(() => {
  if (fs.existsSync(BACKUP_QUEUE_PATH)) {
    try {
      const { wb, sheetName } = readOrCreateWorkbook();
      flushBackupQueue(wb, sheetName);
      XLSX.writeFile(wb, EXCEL_PATH);
      console.log('Auto-sync worker successfully flushed queued submissions to Excel.');
    } catch {
      // Still locked, will retry next interval
    }
  }
}, 3000);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    excelPath: EXCEL_PATH,
    excelExists: fs.existsSync(EXCEL_PATH)
  });
});

app.listen(PORT, () => {
  console.log(`IEEE Excel Backend server running on http://localhost:${PORT}`);
  console.log(`Connected to Excel: ${EXCEL_PATH}`);
});
