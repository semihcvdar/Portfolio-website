export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { validateString, getErrorMessage } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderEmail, message } = body;

    if (!validateString(senderEmail, 500)) {
      return NextResponse.json({ error: "Invalid sender email" }, { status: 400 });
    }

    if (!validateString(message, 5000)) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "smhbdbd@gmail.com",
        subject: `📧 Yeni Portfolio Mesajı - ${senderEmail}`,
        text: `Gönderen: ${senderEmail}\n\n${message}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}