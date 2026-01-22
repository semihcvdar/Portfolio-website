import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderEmail, message } = body;

    // Server-side validation
    if (!validateString(senderEmail, 500)) {
      return NextResponse.json(
        { error: "Invalid sender email" },
        { status: 400 }
      );
    }

    if (!validateString(message, 5000)) {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "smhbdbd@gmail.com",
      subject: `📧 Yeni Portfolio Mesajı - ${senderEmail}`,
      text: message as string,
      replyTo: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
