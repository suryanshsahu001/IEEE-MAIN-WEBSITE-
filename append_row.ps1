param (
    [string]$ExcelPath = "C:\Users\VICTUS\OneDrive\Attachments\STUDENT  DATA.xlsx",
    [string]$SubmissionTime,
    [string]$Position,
    [string]$FullName,
    [string]$Email,
    [string]$Phone,
    [string]$AcademicYear,
    [string]$Branch,
    [string]$IEEEMembershipID,
    [string]$Statement
)

try {
    # Check if Excel is already running
    $excel = $null
    $wasRunning = $false
    try {
        $excel = [System.Runtime.InteropServices.Marshal]::GetActiveObject("Excel.Application")
        $wasRunning = $true
    } catch {
        $excel = New-Object -ComObject Excel.Application
        $excel.Visible = $false
        $wasRunning = $false
    }
    
    $excel.DisplayAlerts = $false

    # Find if workbook is already open in Excel
    $wb = $null
    foreach ($w in $excel.Workbooks) {
        if ($w.FullName.ToLower() -eq $ExcelPath.ToLower()) {
            $wb = $w
            break
        }
    }

    $openedByUs = $false
    if ($null -eq $wb) {
        $wb = $excel.Workbooks.Open($ExcelPath)
        $openedByUs = $true
    }

    $sheet = $wb.Sheets.Item(1)
    
    # Headers if empty
    $headers = @(
        "Submission Date & Time",
        "Position Applied",
        "Full Name",
        "Email Address",
        "Phone Number",
        "Academic Year",
        "Branch / Stream",
        "IEEE Membership Number",
        "Statement / Why Suited"
    )

    $used = $sheet.UsedRange
    $startRow = 1
    if ($sheet.Cells.Item(1, 1).Value2 -eq $null -or $sheet.Cells.Item(1, 1).Text -eq "") {
        for ($c = 0; $c -lt $headers.Count; $c++) {
            $sheet.Cells.Item(1, $c + 1).Value2 = $headers[$c]
        }
        $startRow = 2
    } else {
        # Find next empty row
        $lastRow = $sheet.Cells.Find("*", [System.Reflection.Missing]::Value, [System.Reflection.Missing]::Value, [System.Reflection.Missing]::Value, 1, 2, [System.Reflection.Missing]::Value) # 1=xlByRows, 2=xlPrevious
        if ($lastRow) {
            $startRow = $lastRow.Row + 1
        } else {
            $startRow = $used.Rows.Count + 1
        }
    }

    # Append data
    $sheet.Cells.Item($startRow, 1).Value2 = $SubmissionTime
    $sheet.Cells.Item($startRow, 2).Value2 = $Position
    $sheet.Cells.Item($startRow, 3).Value2 = $FullName
    $sheet.Cells.Item($startRow, 4).Value2 = $Email
    $sheet.Cells.Item($startRow, 5).Value2 = $Phone
    $sheet.Cells.Item($startRow, 6).Value2 = $AcademicYear
    $sheet.Cells.Item($startRow, 7).Value2 = $Branch
    $sheet.Cells.Item($startRow, 8).Value2 = $IEEEMembershipID
    $sheet.Cells.Item($startRow, 9).Value2 = $Statement

    # Save
    $wb.Save()

    if ($openedByUs -and -not $wasRunning) {
        $wb.Close($false)
        $excel.Quit()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
    }

    Write-Output "SUCCESS"
    exit 0
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
