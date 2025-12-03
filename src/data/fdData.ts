// Fixed Deposit Mock Data with RBI compliance information

export interface FDProvider {
  id: string;
  bankName: string;
  logo: string;
  type: "Scheduled Commercial Bank" | "Small Finance Bank" | "NBFC" | "Co-operative Bank";
  regulatedBy: string;
  interestRate: number;
  seniorCitizenRate: number;
  maxTenure: string;
  minDeposit: number;
  maxDeposit: number;
  dicgcInsured: boolean;
  dicgcLimit: number;
  tenureOptions: { months: number; rate: number; seniorRate: number }[];
  payoutOptions: string[];
  prematureWithdrawal: boolean;
  prematureWithdrawalPenalty: string;
  features: string[];
  about: string;
}

export const fdProviders: FDProvider[] = [
  {
    id: "fd-1",
    bankName: "Bajaj Finance Limited",
    logo: "🅱️",
    type: "NBFC",
    regulatedBy: "Reserve Bank of India",
    interestRate: 9.10,
    seniorCitizenRate: 9.35,
    maxTenure: "5 Years",
    minDeposit: 15000,
    maxDeposit: 30000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 7.40, seniorRate: 7.65 },
      { months: 18, rate: 7.70, seniorRate: 7.95 },
      { months: 24, rate: 8.10, seniorRate: 8.35 },
      { months: 36, rate: 8.50, seniorRate: 8.75 },
      { months: 48, rate: 8.85, seniorRate: 9.10 },
      { months: 60, rate: 9.10, seniorRate: 9.35 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Half-yearly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "No new bank account required",
      "Flexible tenure from 12-60 months",
      "Easy withdrawal after 7 days",
      "Competitive interest rates",
    ],
    about: "Bajaj Finance Limited is one of India's leading NBFCs, offering a wide range of financial products including fixed deposits with attractive interest rates and flexible tenure options.",
  },
  {
    id: "fd-2",
    bankName: "Utkarsh Small Finance Bank",
    logo: "🏦",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 8.10,
    seniorCitizenRate: 8.60,
    maxTenure: "5 Years",
    minDeposit: 10000,
    maxDeposit: 20000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 7.00, seniorRate: 7.50 },
      { months: 18, rate: 7.25, seniorRate: 7.75 },
      { months: 24, rate: 7.60, seniorRate: 8.10 },
      { months: 36, rate: 7.85, seniorRate: 8.35 },
      { months: 48, rate: 8.00, seniorRate: 8.50 },
      { months: 60, rate: 8.10, seniorRate: 8.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "0.5% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "RBI regulated Small Finance Bank",
      "Higher rates for senior citizens",
      "Online account opening",
      "Loan against FD available",
    ],
    about: "Utkarsh Small Finance Bank is a RBI regulated small finance bank providing banking services to underserved sections with attractive FD rates.",
  },
  {
    id: "fd-3",
    bankName: "Shivalik Small Finance Bank",
    logo: "🏔️",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 6.10,
    seniorCitizenRate: 6.60,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 15000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 5.50, seniorRate: 6.00 },
      { months: 24, rate: 5.80, seniorRate: 6.30 },
      { months: 36, rate: 5.95, seniorRate: 6.45 },
      { months: 60, rate: 6.10, seniorRate: 6.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "Low minimum deposit",
      "Doorstep banking services",
      "Tax-saving FD available",
    ],
    about: "Shivalik Small Finance Bank is committed to providing inclusive banking services with competitive FD rates.",
  },
  {
    id: "fd-4",
    bankName: "North East Small Finance Bank",
    logo: "🌲",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 6.80,
    seniorCitizenRate: 7.30,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 10000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 6.00, seniorRate: 6.50 },
      { months: 24, rate: 6.40, seniorRate: 6.90 },
      { months: 36, rate: 6.60, seniorRate: 7.10 },
      { months: 60, rate: 6.80, seniorRate: 7.30 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "0.5% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "Focus on North East region",
      "Digital banking enabled",
      "Flexible payout options",
    ],
    about: "North East Small Finance Bank focuses on providing banking services to the North Eastern region of India.",
  },
  {
    id: "fd-5",
    bankName: "Shriram Finance Ltd",
    logo: "🏛️",
    type: "NBFC",
    regulatedBy: "Reserve Bank of India",
    interestRate: 8.10,
    seniorCitizenRate: 8.60,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 50000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 7.35, seniorRate: 7.85 },
      { months: 24, rate: 7.65, seniorRate: 8.15 },
      { months: 36, rate: 7.95, seniorRate: 8.45 },
      { months: 60, rate: 8.10, seniorRate: 8.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Half-yearly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "CRISIL AAA rated",
      "40+ years of trust",
      "Wide branch network",
      "Easy online investment",
    ],
    about: "Shriram Finance is one of India's largest retail NBFCs with over 40 years of experience in financial services.",
  },
  {
    id: "fd-6",
    bankName: "HDFC Bank",
    logo: "🔵",
    type: "Scheduled Commercial Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 7.25,
    seniorCitizenRate: 7.75,
    maxTenure: "10 Years",
    minDeposit: 5000,
    maxDeposit: 100000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    tenureOptions: [
      { months: 12, rate: 6.60, seniorRate: 7.10 },
      { months: 24, rate: 7.00, seniorRate: 7.50 },
      { months: 36, rate: 7.10, seniorRate: 7.60 },
      { months: 60, rate: 7.25, seniorRate: 7.75 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    features: [
      "DICGC Insured upto ₹5 Lakh",
      "India's largest private bank",
      "Instant FD via net banking",
      "Sweep-in facility available",
      "Auto-renewal option",
    ],
    about: "HDFC Bank is India's largest private sector bank offering a comprehensive range of banking and financial services.",
  },
];

export const fdCalculatorDefaults = {
  minDeposit: 15000,
  maxDeposit: 30000000,
  minTenure: 12,
  maxTenure: 60,
  defaultDeposit: 100000,
  defaultTenure: 60,
};
