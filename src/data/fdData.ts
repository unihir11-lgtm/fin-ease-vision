// Fixed Deposit Mock Data with RBI compliance information and real investment workflow

export interface FDProvider {
  id: string;
  bankName: string;
  logo: string; // Public logo URL
  iconType: "building2" | "landmark" | "mountain" | "trees" | "building" | "banknote";
  type: "Scheduled Commercial Bank" | "Small Finance Bank" | "NBFC" | "Co-operative Bank";
  regulatedBy: string;
  interestRate: number;
  seniorCitizenRate: number;
  maxTenure: string;
  minDeposit: number;
  maxDeposit: number;
  dicgcInsured: boolean;
  dicgcLimit: number;
  investmentMode: "Online" | "Offline" | "Both";
  investmentMethod: "Direct" | "Through Platform" | "Both";
  accountRequired: boolean;
  kycRequired: "Video KYC" | "In-Person" | "Aadhaar OTP" | "All Options";
  tenureOptions: { months: number; rate: number; seniorRate: number }[];
  payoutOptions: string[];
  prematureWithdrawal: boolean;
  prematureWithdrawalPenalty: string;
  partialWithdrawal: boolean;
  autoRenewal: boolean;
  loanAgainstFD: boolean;
  loanPercentage: number;
  taxSaverFD: boolean;
  taxSaverLockIn: string;
  features: string[];
  about: string;
  processingTime: string;
}

export const fdProviders: FDProvider[] = [
  {
    id: "fd-1",
    bankName: "Bajaj Finance Limited",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bajaj_Finserv_Logo.svg/200px-Bajaj_Finserv_Logo.svg.png",
    iconType: "building2",
    type: "NBFC",
    regulatedBy: "Reserve Bank of India",
    interestRate: 9.10,
    seniorCitizenRate: 9.35,
    maxTenure: "5 Years",
    minDeposit: 15000,
    maxDeposit: 30000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Both",
    accountRequired: false,
    kycRequired: "All Options",
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
    partialWithdrawal: false,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 75,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "Instant to 24 hours",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "No bank account required",
      "Flexible tenure 12-60 months",
      "Easy withdrawal after 7 days",
      "Up to 75% loan against FD",
      "Online investment via Video KYC",
    ],
    about: "Bajaj Finance Limited is one of India's leading NBFCs, rated AAA by CRISIL & ICRA. Direct investment available without opening a bank account. Offers one of the highest FD rates among NBFCs.",
  },
  {
    id: "fd-2",
    bankName: "Utkarsh Small Finance Bank",
    logo: "https://www.utkarsh.bank/images/logo.png",
    iconType: "landmark",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 8.10,
    seniorCitizenRate: 8.60,
    maxTenure: "5 Years",
    minDeposit: 10000,
    maxDeposit: 20000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Both",
    accountRequired: true,
    kycRequired: "All Options",
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
    partialWithdrawal: true,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 90,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "1-2 business days",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "RBI regulated Small Finance Bank",
      "Higher rates for senior citizens",
      "Video KYC available",
      "Up to 90% loan against FD",
      "Partial withdrawal allowed",
    ],
    about: "Utkarsh Small Finance Bank is an RBI regulated bank providing financial services to underserved sections. Offers competitive FD rates with full banking services.",
  },
  {
    id: "fd-3",
    bankName: "Shivalik Small Finance Bank",
    logo: "https://www.shivalikbank.com/images/logo.png",
    iconType: "mountain",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 6.10,
    seniorCitizenRate: 6.60,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 15000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Through Platform",
    accountRequired: true,
    kycRequired: "Aadhaar OTP",
    tenureOptions: [
      { months: 12, rate: 5.50, seniorRate: 6.00 },
      { months: 24, rate: 5.80, seniorRate: 6.30 },
      { months: 36, rate: 5.95, seniorRate: 6.45 },
      { months: 60, rate: 6.10, seniorRate: 6.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    partialWithdrawal: false,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 80,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "2-3 business days",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "Low minimum deposit ₹5,000",
      "Doorstep banking services",
      "Tax-saving FD available",
      "Aadhaar-based instant KYC",
    ],
    about: "Shivalik Small Finance Bank is committed to providing inclusive banking services across North India with competitive FD rates and personalized service.",
  },
  {
    id: "fd-4",
    bankName: "North East Small Finance Bank",
    logo: "https://www.nesfb.com/images/logo.png",
    iconType: "trees",
    type: "Small Finance Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 6.80,
    seniorCitizenRate: 7.30,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 10000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Through Platform",
    accountRequired: true,
    kycRequired: "Video KYC",
    tenureOptions: [
      { months: 12, rate: 6.00, seniorRate: 6.50 },
      { months: 24, rate: 6.40, seniorRate: 6.90 },
      { months: 36, rate: 6.60, seniorRate: 7.10 },
      { months: 60, rate: 6.80, seniorRate: 7.30 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "0.5% reduction from applicable rate",
    partialWithdrawal: true,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 85,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "2-3 business days",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "Focus on North East region",
      "Digital banking enabled",
      "Flexible payout options",
      "Video KYC for non-residents",
    ],
    about: "North East Small Finance Bank focuses on providing banking services to the North Eastern region of India with special schemes for local customers.",
  },
  {
    id: "fd-5",
    bankName: "Shriram Finance Ltd",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Shriram_Finance_Logo.svg/200px-Shriram_Finance_Logo.svg.png",
    iconType: "building",
    type: "NBFC",
    regulatedBy: "Reserve Bank of India",
    interestRate: 8.10,
    seniorCitizenRate: 8.60,
    maxTenure: "5 Years",
    minDeposit: 5000,
    maxDeposit: 50000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Both",
    accountRequired: false,
    kycRequired: "All Options",
    tenureOptions: [
      { months: 12, rate: 7.35, seniorRate: 7.85 },
      { months: 24, rate: 7.65, seniorRate: 8.15 },
      { months: 36, rate: 7.95, seniorRate: 8.45 },
      { months: 60, rate: 8.10, seniorRate: 8.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Half-yearly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    partialWithdrawal: false,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 70,
    taxSaverFD: false,
    taxSaverLockIn: "N/A",
    processingTime: "Instant to 48 hours",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "CRISIL AAA rated",
      "40+ years of trust",
      "Wide branch network",
      "No bank account required",
      "Doorstep document collection",
    ],
    about: "Shriram Finance is one of India's largest retail NBFCs with over 40 years of experience. AAA-rated by CRISIL, offering safe and high-yield FD options.",
  },
  {
    id: "fd-6",
    bankName: "HDFC Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
    iconType: "banknote",
    type: "Scheduled Commercial Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 7.25,
    seniorCitizenRate: 7.75,
    maxTenure: "10 Years",
    minDeposit: 5000,
    maxDeposit: 100000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Direct",
    accountRequired: true,
    kycRequired: "All Options",
    tenureOptions: [
      { months: 12, rate: 6.60, seniorRate: 7.10 },
      { months: 24, rate: 7.00, seniorRate: 7.50 },
      { months: 36, rate: 7.10, seniorRate: 7.60 },
      { months: 60, rate: 7.25, seniorRate: 7.75 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1% reduction from applicable rate",
    partialWithdrawal: true,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 90,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "Instant (for account holders)",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "India's largest private bank",
      "Instant FD via net banking",
      "Sweep-in facility available",
      "Auto-renewal option",
      "Up to 90% loan against FD",
    ],
    about: "HDFC Bank is India's largest private sector bank offering comprehensive banking and FD services. Direct investment through net banking for existing customers.",
  },
  {
    id: "fd-7",
    bankName: "State Bank of India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
    iconType: "landmark",
    type: "Scheduled Commercial Bank",
    regulatedBy: "Reserve Bank of India",
    interestRate: 7.10,
    seniorCitizenRate: 7.60,
    maxTenure: "10 Years",
    minDeposit: 1000,
    maxDeposit: 100000000,
    dicgcInsured: true,
    dicgcLimit: 500000,
    investmentMode: "Both",
    investmentMethod: "Direct",
    accountRequired: true,
    kycRequired: "All Options",
    tenureOptions: [
      { months: 12, rate: 6.50, seniorRate: 7.00 },
      { months: 24, rate: 6.80, seniorRate: 7.30 },
      { months: 36, rate: 6.90, seniorRate: 7.40 },
      { months: 60, rate: 7.10, seniorRate: 7.60 },
    ],
    payoutOptions: ["Monthly", "Quarterly", "Annually", "Cumulative"],
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "0.5% reduction from applicable rate",
    partialWithdrawal: true,
    autoRenewal: true,
    loanAgainstFD: true,
    loanPercentage: 90,
    taxSaverFD: true,
    taxSaverLockIn: "5 Years",
    processingTime: "Instant (for account holders)",
    features: [
      "DICGC Insured up to ₹5 Lakh",
      "India's largest PSU bank",
      "Lowest minimum deposit ₹1,000",
      "Government backing",
      "Widest branch network",
      "Special rates for staff & defence",
    ],
    about: "State Bank of India is India's largest PSU bank with government backing. Offers the widest network and trusted FD services with special rates for various categories.",
  },
];

export const fdCategories = [
  {
    id: "nbfc",
    name: "NBFC Fixed Deposits",
    description: "Higher interest rates from registered NBFCs",
    investmentMethod: "Direct investment, no bank account needed",
    minInvestment: "₹5,000 - ₹15,000",
    typicalRate: "8-9.5% p.a.",
    kycMode: "Video KYC / Aadhaar OTP",
  },
  {
    id: "sfb",
    name: "Small Finance Bank FDs",
    description: "RBI regulated banks with competitive rates",
    investmentMethod: "Account-based investment",
    minInvestment: "₹5,000 - ₹10,000",
    typicalRate: "6-8.5% p.a.",
    kycMode: "Video KYC / In-Person",
  },
  {
    id: "bank",
    name: "Scheduled Bank FDs",
    description: "Traditional bank FDs with high safety",
    investmentMethod: "Direct via bank account",
    minInvestment: "₹1,000 - ₹5,000",
    typicalRate: "6.5-7.5% p.a.",
    kycMode: "Existing KYC / Video KYC",
  },
  {
    id: "taxsaver",
    name: "Tax Saver FDs",
    description: "5-year lock-in with Section 80C benefit",
    investmentMethod: "Direct investment",
    minInvestment: "₹1,000",
    typicalRate: "6.5-8% p.a.",
    kycMode: "PAN mandatory",
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

export const fdRiskDisclaimer = `
**Important Information:**
- Fixed Deposits are subject to credit risk of the issuing institution.
- DICGC insurance covers up to ₹5 Lakh per depositor per bank (including principal and interest).
- NBFCs are covered under DICGC insurance.
- Interest rates are subject to change without notice.

**Investment Process:**
- **Direct Investment**: Some NBFCs allow direct FD booking without bank account.
- **Platform Investment**: Book FDs through FinEase with assisted KYC process.
- **Bank FDs**: Requires existing bank account with the respective bank.

**KYC Requirements:**
- PAN card (mandatory for deposits above ₹50,000)
- Aadhaar card for e-KYC
- Video KYC for remote verification
- Address proof

**Tax Implications:**
- Interest income is fully taxable as per income tax slab.
- TDS deducted at 10% if interest exceeds ₹40,000 (₹50,000 for seniors).
- Tax-saver FDs: Principal qualifies for Section 80C deduction up to ₹1.5 Lakh.
`;
