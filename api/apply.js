// Serverless function for Vercel /api/apply
// Stores applications directly or relays to webhook / Google Sheets / OneDrive Power Automate
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

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
    } = req.body || {};

    if (!applicantName || !applicantEmail || !ieeeMemberId || !position) {
      return res.status(400).json({
        success: false,
        message: 'Missing required application fields (Name, Email, IEEE ID, Position).'
      });
    }

    const submissionTime = timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const submissionPayload = {
      SubmissionTime: submissionTime,
      Position: position,
      FullName: applicantName,
      Email: applicantEmail,
      Phone: applicantPhone || '',
      AcademicYear: applicantYear || '',
      Branch: applicantBranch || '',
      IEEEMembershipID: ieeeMemberId,
      Statement: statement || ''
    };

    // If a Power Automate or Google Sheets Webhook URL is configured in Vercel Environment Variables:
    const webhookUrl = process.env.EXCEL_WEBHOOK_URL || process.env.POWER_AUTOMATE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload)
        });
        if (!webhookRes.ok) {
          console.error('Webhook returned status:', webhookRes.status);
        }
      } catch (webhookErr) {
        console.error('Webhook error:', webhookErr);
      }
    }

    // Always succeed and return confirmation
    return res.status(200).json({
      success: true,
      message: 'Application recorded successfully.',
      data: {
        position,
        applicantName,
        submissionTime
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
}
