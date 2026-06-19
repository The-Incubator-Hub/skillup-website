export const APPLICATION_FORM_PATH = "/skillup-plus";

export const FORM_SHEETS = {
  skillUpPlus: "SkillUp Plus Applications",
  contact: "Contact Messages",
} as const;

export type FormType = keyof typeof FORM_SHEETS;
