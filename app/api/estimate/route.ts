import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Lazy initialize Resend to avoid crash if key is missing on startup
let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('RESEND_API_KEY is not defined');
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

export async function POST(req: Request) {
  try {
    const { email, estimate, details, userName } = await req.json();

    const resend = getResend();
    const adminEmail = process.env.ADMIN_EMAIL || 'anichisom4top@gmail.com';

    // 1. Send confirmation to the user
    await resend.emails.send({
      from: 'OverHorizon <onboarding@resend.dev>',
      to: email,
      subject: 'Your Project Estimate - OverHorizon',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a;">
          <h1 style="font-weight: 300; letter-spacing: -0.02em;">OverHorizon®</h1>
          <p>Hey there!</p>
          <p>Thanks for using our estimation tool. Based on the details provided, here is a ballpark figure for your project:</p>
          <div style="background: #f4f4f4; padding: 24px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.1em;">Ballpark Estimate</p>
            <h2 style="margin: 8px 0 0 0; font-size: 32px;">${estimate}</h2>
          </div>
          <p><strong>Project Details:</strong></p>
          <ul style="color: #444;">
            ${details.map((d: string) => `<li>${d}</li>`).join('')}
          </ul>
          <p>If you're ready to take the next step, just reply to this email or reach out to us directly.</p>
          <p style="margin-top: 40px; font-size: 12px; color: #999;">&copy; 2026 OverHorizon Studio</p>
        </div>
      `,
    });

    // 2. Notify the admin
    await resend.emails.send({
      from: 'Leads <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Lead: ${userName || 'Anonymous'} - ${estimate}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Project Estimate Generated</h2>
          <p><strong>Name:</strong> ${userName || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Estimate:</strong> ${estimate}</p>
          <p><strong>Details:</strong></p>
          <ul>
            ${details.map((d: string) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Estimate API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
