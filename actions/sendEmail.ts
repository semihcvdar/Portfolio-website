"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

// Initialize Resend instance with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Handle sending email from contact form
export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Log sender for debugging
  console.log("Sender Email:", senderEmail);

  // Server-side validation
  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }

  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }

  let data;
  try {
    data = await resend.emails.send({
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

    return { success: true };

  } catch (error: unknown) {
    return { error: getErrorMessage(error) 
        
    };
  }

  return {
    data,
  };
};
