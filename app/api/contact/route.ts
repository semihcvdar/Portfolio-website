export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderEmail, message } = body;

    return NextResponse.json({ 
      success: true, 
      received: { senderEmail, message } 
    }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}