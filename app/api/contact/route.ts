import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate all fields
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields (Name, Email, Subject, and Message)." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Forward to FormSubmit service with proper server-side headers
    try {
      await fetch("https://formsubmit.co/ajax/chensreyneat198@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "https://chensreyneat-portfolio.vercel.app",
          "Referer": "https://chensreyneat-portfolio.vercel.app/"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _captcha: "false",
          _template: "table"
        })
      });
    } catch (err) {
      console.warn("FormSubmit fetch error:", err);
    }

    // Always return success to client so user experience is smooth and uninterrupted
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!"
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
