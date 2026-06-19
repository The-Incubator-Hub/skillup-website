"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Clock3, Laptop, Loader2, ShieldCheck, Users } from "lucide-react";
import { NavbarWithDropdown } from "@/components/UI/navigation";
import Footer from "@/components/UI/Footer";

type FieldType = "text" | "email" | "tel" | "url" | "select" | "radio" | "textarea" | "checkbox";

interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  note?: string;
  options?: string[];
}

interface FormSection {
  eyebrow: string;
  title: string;
  description: string;
  fields: FormField[];
}

const ageRanges = [
  "Under 15",
  "16 - 18",
  "18 - 21",
  "22 - 25",
  "26 - 29",
  "30 - 33",
  "34 - 37",
  "38 - 41",
  "42 - 45",
  "46+",
];

const trainingTracks = [
  "Cybersecurity",
  "Data Analysis",
  "Product Design",
  "Software Development",
  "AI for Professionals",
];

const formSections: FormSection[] = [
  {
    eyebrow: "Section 1",
    title: "Personal Information",
    description: "Help us identify you correctly and prepare your onboarding details.",
    fields: [
      {
        name: "fullName",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Enter your name as it should appear on your certificate",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: ["Female", "Male"],
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
        note: "We will use this for LMS onboarding and selection notifications.",
      },
      {
        name: "phone",
        label: "Primary phone number",
        type: "tel",
        required: true,
        placeholder: "+234...",
      },
      {
        name: "country",
        label: "Country",
        type: "text",
        required: true,
        placeholder: "Nigeria",
      },
      {
        name: "location",
        label: "Local government, city, state/province",
        type: "text",
        required: true,
        placeholder: "Ikeja, Lagos State",
      },
      {
        name: "ageRange",
        label: "Age range",
        type: "select",
        required: true,
        options: ageRanges,
      },
      {
        name: "occupation",
        label: "Current primary occupation",
        type: "select",
        required: true,
        options: [
          "Student",
          "Employed Full-Time",
          "Employed Part-Time",
          "Freelancer",
          "Unemployed / Job Seeker",
        ],
      },
    ],
  },
  {
    eyebrow: "Section 2",
    title: "Course Selection",
    description: "Choose your preferred track and share your current skill baseline.",
    fields: [
      {
        name: "trainingTrack",
        label: "Preferred training track",
        type: "select",
        required: true,
        options: trainingTracks,
      },
      {
        name: "competenceLevel",
        label: "Current competence level in your selected skill",
        type: "radio",
        required: true,
        options: [
          "1 - Absolute beginner",
          "2 - Basic awareness",
          "3 - Some practice",
          "4 - Comfortable with fundamentals",
          "5 - Advanced / built small projects",
        ],
      },
      {
        name: "priorLearning",
        label: "Have you taken any prior courses, certifications, or self-study modules?",
        type: "radio",
        required: true,
        options: ["Yes, extensively", "Yes, a little bit", "No, this is my first time"],
      },
      {
        name: "previousExposure",
        label: "Briefly describe previous exposure or projects in this field",
        type: "textarea",
        required: true,
        placeholder: 'Type "N/A" if this is your first exposure.',
      },
      {
        name: "portfolioLink",
        label: "Portfolio or work link",
        type: "url",
        placeholder: "GitHub, Behance, LinkedIn, or Google Drive URL",
      },
    ],
  },
  {
    eyebrow: "Section 3",
    title: "Technical Readiness",
    description: "Confirm that you can access the tools needed for remote learning and project work.",
    fields: [
      {
        name: "computerAccess",
        label: "Do you have daily access to a functional laptop or desktop?",
        type: "radio",
        required: true,
        options: [
          "Yes, I personally own one",
          "Yes, but I borrow/share it",
          "No, I rely solely on a smartphone/tablet",
        ],
      },
      {
        name: "operatingSystem",
        label: "What operating system does your primary computer run?",
        type: "select",
        required: true,
        options: ["Windows", "macOS", "Linux", "I do not have a computer"],
      },
      {
        name: "internetReliability",
        label: "How reliable is your daily internet access?",
        type: "radio",
        required: true,
        options: [
          "Highly reliable (Broadband/Wi-Fi)",
          "Moderately reliable (Mobile data)",
          "Unreliable / intermittent connection",
        ],
      },
      {
        name: "powerBackup",
        label: "What is your secondary power/electricity backup plan?",
        type: "radio",
        required: true,
        options: [
          "Main grid only",
          "Generator / solar inverter backup",
          "Power bank for mobile/router + laptop battery power",
        ],
      },
    ],
  },
  {
    eyebrow: "Section 4",
    title: "Availability",
    description: "SkillUp Plus requires steady weekly commitment through the full learning pipeline.",
    fields: [
      {
        name: "weeklyCommitment",
        label: "Can you dedicate 10-15 hours weekly for the next 3 months?",
        type: "radio",
        required: true,
        options: ["Yes, absolutely", "Unsure / depends on my work schedule", "No"],
      },
      {
        name: "liveSyncCommitment",
        label: "Can you attend one mandatory live sync contact session every week?",
        type: "radio",
        required: true,
        options: ["Yes, I will prioritize it", "No, I cannot attend live sessions"],
      },
      {
        name: "pipelineAvailability",
        label: "Are you available to complete the full 3-month pipeline without interruptions?",
        type: "radio",
        required: true,
        options: [
          "Yes, I am fully available",
          "No, I have major engagements coming up within this timeline",
        ],
      },
    ],
  },
  {
    eyebrow: "Section 5",
    title: "Motivation & Commitment",
    description: "Share your intent and acknowledge the programme commitment structure.",
    fields: [
      {
        name: "primaryGoal",
        label: "What is your primary goal for joining SkillUp Plus?",
        type: "select",
        required: true,
        options: [
          "To switch career paths",
          "To gain practical skills for my current job",
          "To build a portfolio for freelance opportunities",
          "Personal interest / hobby",
        ],
      },
      {
        name: "selectionReason",
        label: "Why should you be selected for this competitive slot?",
        type: "textarea",
        required: true,
        placeholder: "Keep your answer within 150 words.",
      },
      {
        name: "commitmentFee",
        label: "Do you understand and agree to the mandatory N25,000 commitment fee upon selection?",
        type: "radio",
        required: true,
        options: [
          "Yes, I am aware and ready to make the payment upon selection confirmation",
          "No, I cannot meet this commitment requirement",
        ],
      },
    ],
  },
  {
    eyebrow: "Section 6",
    title: "Campaign Source & Declaration",
    description: "Tell us how you found the programme and confirm your application details.",
    fields: [
      {
        name: "discoverySource",
        label: "How did you first discover this training campaign?",
        type: "select",
        required: true,
        options: [
          "Social media sponsored ad",
          "Traditional media",
          "Word of mouth / referral",
          "WhatsApp status/broadcast link",
          "Email newsletter invitation",
        ],
      },
      {
        name: "declaration",
        label:
          "I certify that all information provided is accurate, and I acknowledge that false information may result in immediate disqualification.",
        type: "checkbox",
        required: true,
      },
    ],
  },
];

const allFields = formSections.flatMap((section) => section.fields);
const defaultValues = Object.fromEntries(allFields.map((field) => [field.name, ""]));

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  const sharedClass =
    "mt-2 w-full rounded-md border border-blue-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  if (field.type === "select") {
    return (
      <select
        id={field.name}
        name={field.name}
        required={field.required}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={sharedClass}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="mt-3 grid gap-2">
        {field.options?.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-blue-100 bg-white px-4 py-3 text-sm text-gray-700 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <input
              type="radio"
              name={field.name}
              value={option}
              required={field.required}
              checked={value === option}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="mt-1 h-4 w-4 accent-blue-700"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.name}
        name={field.name}
        required={field.required}
        value={value}
        placeholder={field.placeholder}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`${sharedClass} min-h-32 resize-y`}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-md border border-blue-100 bg-white px-4 py-3 text-sm text-gray-700 transition hover:border-blue-300 hover:bg-blue-50">
        <input
          type="checkbox"
          name={field.name}
          required={field.required}
          checked={value === "Yes"}
          onChange={(event) => onChange(field.name, event.target.checked ? "Yes" : "")}
          className="mt-1 h-4 w-4 accent-blue-700"
        />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <input
      id={field.name}
      name={field.name}
      type={field.type}
      required={field.required}
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(field.name, event.target.value)}
      className={sharedClass}
    />
  );
}

export default function SkillUpPlusApplicationPage() {
  const [values, setValues] = useState<Record<string, string>>(defaultValues);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const completedRequiredFields = useMemo(() => {
    const requiredFields = allFields.filter((field) => field.required);
    const completed = requiredFields.filter((field) => values[field.name]?.trim()).length;
    return { completed, total: requiredFields.length };
  }, [values]);

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "skillUpPlus",
          data: {
            programme: "SkillUp Plus",
            ...values,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setValues(defaultValues);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <NavbarWithDropdown />

      <main className="pt-[72px]">
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 py-14 text-white md:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                SkillUp Plus
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Apply for the next SkillUp Edtech intensive cohort.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-blue-50 md:text-lg">
                This form helps us confirm your readiness, preferred track, availability, and commitment for the SkillUp Plus programme.
              </p>
            </div>

            <div className="grid gap-4 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur md:p-6">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 h-5 w-5 text-orange-200" />
                <div>
                  <p className="font-semibold">3-month learning pipeline</p>
                  <p className="text-sm text-blue-100">LMS content, live sync sessions, projects, mentoring, and certification.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Laptop className="mt-1 h-5 w-5 text-orange-200" />
                <div>
                  <p className="font-semibold">Practical track selection</p>
                  <p className="text-sm text-blue-100">Choose Cybersecurity, Data Analysis, Product Design, Software Development, or AI for Professionals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-orange-200" />
                <div>
                  <p className="font-semibold">N25,000 commitment structure</p>
                  <p className="text-sm text-blue-100">Acknowledged during application and processed after selection confirmation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
            <aside className="h-fit rounded-lg border border-blue-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-blue-900">Application progress</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{
                    width: `${Math.round((completedRequiredFields.completed / completedRequiredFields.total) * 100)}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {completedRequiredFields.completed} of {completedRequiredFields.total} required fields completed
              </p>
              <div className="mt-6 grid gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-700" />
                  Built for serious applicants
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-700" />
                  Sent to the SkillUp Plus sheet
                </div>
              </div>
            </aside>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formSections.map((section) => (
                <section key={section.title} className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">{section.eyebrow}</p>
                  <div className="mt-2 max-w-3xl">
                    <h2 className="text-2xl font-bold text-gray-950">{section.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{section.description}</p>
                  </div>

                  <div className="mt-8 grid gap-x-6 gap-y-5 md:grid-cols-2">
                    {section.fields.map((field) => (
                      <div
                        key={field.name}
                        className={field.type === "textarea" || field.type === "radio" || field.type === "checkbox" ? "md:col-span-2" : ""}
                      >
                        {field.type !== "checkbox" && (
                          <label htmlFor={field.name} className="text-sm font-semibold text-gray-800">
                            {field.label}
                            {field.required && <span className="text-orange-600"> *</span>}
                          </label>
                        )}
                        <FieldControl field={field} value={values[field.name] ?? ""} onChange={handleChange} />
                        {field.note && <p className="mt-2 text-xs leading-5 text-gray-500">{field.note}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <div className="flex flex-col gap-4 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
                <div className="min-h-6 flex-1">
                {status === "success" && (
                  <div className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Your SkillUp Plus application has been received.
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    We could not submit the form. Please try again.
                  </div>
                )}
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto md:min-w-[190px]"
                >
                  {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
