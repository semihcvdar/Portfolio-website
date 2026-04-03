export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("API KEY:", process.env.RESEND_API_KEY ? "VAR" : "YOK");
  
  try {
    const body = await request.json();
    const { senderEmail, message } = body;

    if (!validateString(senderEmail, 500)) {
      return NextResponse.json({ error: "Invalid sender email" }, { status: 400 });
    }

    if (!validateString(message, 5000)) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "smhbdbd@gmail.com",
      subject: `📧 Yeni Portfolio Mesajı - ${senderEmail}`,
      text: message as string,
      replyTo: senderEmail as string,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    console.error("RESEND ERROR:", error);
    return NextResponse.json(
      { error: getErrorMessage(error), details: String(error) },
      { status: 500 }
    );
  }
}