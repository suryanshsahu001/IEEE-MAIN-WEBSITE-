const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3001;

// Path to user's Excel file in OneDrive Desktop
const EXCEL_PATH = 'C:\\Users\\VICTUS\\OneDrive\\Desktop\\IEEE\\STUDENT  DATA.xlsx';

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

    const { wb, sheetName } = readOrCreateWorkbook();
    let rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });

    // If empty or headers missing, initialize with standard headers
    if (!rows || rows.length === 0 || !rows[0] || rows[0].length === 0) {
      rows = [HEADERS];
    }

    const submissionTime = timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Append new row
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

    rows.push(newRow);

    // Update sheet and save
    const updatedSheet = XLSX.utils.aoa_to_sheet(rows);
    // Set nice column widths
    updatedSheet['!cols'] = [
      { wch: 24 }, // Submission Time
      { wch: 28 }, // Position
      { wch: 22 }, // Full Name
      { wch: 28 }, // Email
      { wch: 16 }, // Phone
      { wch: 14 }, // Year
      { wch: 20 }, // Branch
      { wch: 24 }, // IEEE Member ID
      { wch: 45 }  // Statement
    ];

    wb.Sheets[sheetName] = updatedSheet;

    // Retry up to 5 times if Excel or OneDrive momentarily holds a read lock
    let writeSuccess = false;
    let lastError = null;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        XLSX.writeFile(wb, EXCEL_PATH);
        writeSuccess = true;
        break;
      } catch (err) {
        lastError = err;
        // Wait 300ms before retrying
        await new Promise(r => setTimeout(r, 300));
      }
    }

    if (!writeSuccess) {
      throw lastError || new Error("Failed to write to Excel file.");
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
