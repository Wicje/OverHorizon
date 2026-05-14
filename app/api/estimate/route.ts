import { NextResponse } from 'next/server';
import { Resend } from 'resend';

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, estimate, details } = body;

    if (!email || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await getResend().emails.send({
      from: 'OverHorizon <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'admin@overhorizon.com',
      replyTo: email,
      subject: `New Project Estimate - ${userName}`,
      html: `
        <h1>New Project Estimate</h1>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Estimated Range:</strong> ${estimate}</p>
        <h2>Project Details:</h2>
        <ul>
          ${details.map((detail: string) => `<li>${detail}</li>`).join('')}
        </ul>
      `,
    });

    if (error) {
       console.error('Resend Error:', error);
       return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Estimate API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
