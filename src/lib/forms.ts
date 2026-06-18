export const APPLICATION_FORM_PATH = "/tech-trybe-plus";

export const FORM_SHEETS = {
  techTrybePlus: "Tech Trybe Plus Applications",
  contact: "Contact Messages",
} as const;

export type FormType = keyof typeof FORM_SHEETS;
