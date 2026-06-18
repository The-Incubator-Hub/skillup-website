import { NextResponse } from "next/server";
import { FORM_SHEETS, type FormType } from "@/lib/forms";

const allowedFormTypes = Object.keys(FORM_SHEETS) as FormType[];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formType = body?.formType as FormType | undefined;

    if (!formType || !allowedFormTypes.includes(formType)) {
      return NextResponse.json(
        { error: "Unsupported form submission type." },
        { status: 400 }
      );
    }

    const payload = {
      formType,
      sheetName: FORM_SHEETS[formType],
      submittedAt: new Date().toISOString(),
      data: body?.data ?? {},
    };

    const webhookUrl = process.env.SKILLUP_FORMS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.info("SkillUp form submission received without webhook:", payload);
      return NextResponse.json({ ok: true, mode: "preview" });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to save the form submission." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SkillUp form submission failed:", error);
    return NextResponse.json(
      { error: "Unable to process the form submission." },
      { status: 500 }
    );
  }
}
