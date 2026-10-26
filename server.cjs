const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3001;

// Paths to user's Excel files in OneDrive (sync across all copies so it shows wherever the user opens it)
const PRIMARY_EXCEL_PATH = process.env.EXCEL_FILE_PATH || 'C:\\Users\\VICTUS\\OneDrive\\Attachments\\STUDENT  DATA.xlsx';
const ALL_EXCEL_PATHS = [
  PRIMARY_EXCEL_PATH,
  'C:\\Users\\VICTUS\\OneDrive\\Desktop\\STUDENT  DATA.xlsx',
  'C:\\Users\\VICTUS\\OneDrive\\STUDENT  DATA.xlsx',
  'C:\\Users\\VICTUS\\OneDrive\\Documents\\STUDENT  DATA.xlsx'
];
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

function readOrCreateWorkbook(filePath = PRIMARY_EXCEL_PATH) {
  let wb;
  if (fs.existsSync(filePath)) {
    try {
      wb = XLSX.readFile(filePath);
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

function saveWorkbookToAllPaths(wb) {
  let atLeastOneSuccess = false;
  for (const p of ALL_EXCEL_PATHS) {
    try {
      XLSX.writeFile(wb, p);
      atLeastOneSuccess = true;
    } catch (err) {
      // If individual file is open or directory not found, continue to others
    }
  }
  return atLeastOneSuccess;
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

    // Optional Power Automate / Cloud Webhook forwarder
    const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL || process.env.EXCEL_WEBHOOK_URL || "https://defaultd1b4b416ddaa4673832736e1d6b764.0a.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/18/workflows/8660ed713fb24f1e83a6fd6cbc05a175/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZHu5Z9i6bw4Ykm4EgjPl5aQDkS-CNq6UIP99eLOFmHc";
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          SubmissionTime: submissionTime,
          Position: position,
          FullName: applicantName,
          Email: applicantEmail,
          Phone: applicantPhone || '',
          AcademicYear: applicantYear || '',
          Branch: applicantBranch || '',
          IEEEMembershipID: ieeeMemberId,
          Statement: statement || ''
        })
      }).catch(err => console.error('[Power Automate Forward Error]:', err.message));
    }

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

        // Clean out any trailing empty or corrupt rows
        while (rows.length > 1 && (!rows[rows.length - 1] || rows[rows.length - 1].length === 0 || rows[rows.length - 1].every(c => c === null || c === undefined || c === ''))) {
          rows.pop();
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
        writeSuccess = saveWorkbookToAllPaths(wb);
        if (writeSuccess) break;
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
      if (saveWorkbookToAllPaths(wb)) {
        console.log('Auto-sync worker successfully flushed queued submissions to Excel.');
      }
    } catch {
      // Still locked, will retry next interval
    }
  }
}, 3000);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    primaryPath: PRIMARY_EXCEL_PATH,
    allPaths: ALL_EXCEL_PATHS,
    exists: ALL_EXCEL_PATHS.map(p => ({ path: p, exists: fs.existsSync(p) }))
  });
});

app.listen(PORT, () => {
  console.log(`IEEE Excel Backend server running on http://localhost:${PORT}`);
  console.log(`Connected to Excel: ${PRIMARY_EXCEL_PATH}`);
});
