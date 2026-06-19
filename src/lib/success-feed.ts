// Demo feed for the floating live success ticker. In production, the data
// would come from a CRM/database query of recent admit + visa-clear events.

export type SuccessEvent = {
  type: "admit" | "visa" | "scholarship" | "registration";
  initials: string;           // anonymised — only initials displayed
  detail: string;             // 1-line description
  minutesAgo: number;         // for the "X hrs ago" stamp
  country: string;            // flag context
  flag: string;
};

export const successFeed: SuccessEvent[] = [
  { type: "admit",         initials: "S.I.", detail: "got an admit at Trinity College Dublin · MSc Data Analytics", minutesAgo: 35,  country: "Ireland",   flag: "🇮🇪" },
  { type: "visa",          initials: "A.M.", detail: "Canada study permit approved · MSc Computer Science",         minutesAgo: 122, country: "Canada",    flag: "🇨🇦" },
  { type: "scholarship",   initials: "R.V.", detail: "won 30% tuition scholarship at University of Manchester",      minutesAgo: 240, country: "UK",         flag: "🇬🇧" },
  { type: "admit",         initials: "K.R.", detail: "admitted to University of Waterloo · MEng Data Science",       minutesAgo: 480, country: "Canada",    flag: "🇨🇦" },
  { type: "visa",          initials: "P.N.", detail: "Ireland Type D visa approved · MSc Cyber Security",            minutesAgo: 720, country: "Ireland",   flag: "🇮🇪" },
  { type: "admit",         initials: "T.S.", detail: "admitted to University of Sydney · Master of Nursing",         minutesAgo: 60,  country: "Australia", flag: "🇦🇺" },
  { type: "registration",  initials: "M.K.", detail: "registered for our SOP Clinic webinar",                       minutesAgo: 18,  country: "India",     flag: "🇮🇳" },
  { type: "scholarship",   initials: "A.J.", detail: "secured a Government of Ireland Scholarship · UCD",            minutesAgo: 1080, country: "Ireland",  flag: "🇮🇪" },
  { type: "admit",         initials: "N.B.", detail: "got an admit at TU Munich · MSc Computer Science",             minutesAgo: 200, country: "Germany",   flag: "🇩🇪" },
  { type: "visa",          initials: "V.R.", detail: "Australia Subclass 500 visa approved · Master of IT",           minutesAgo: 95,  country: "Australia", flag: "🇦🇺" },
];

const labels: Record<SuccessEvent["type"], string> = {
  admit:        "Admit",
  visa:         "Visa cleared",
  scholarship:  "Scholarship",
  registration: "Webinar registration",
};

export function eventLabel(t: SuccessEvent["type"]): string {
  return labels[t];
}

export function timeAgo(minutesAgo: number): string {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
