// Bond Mock Data with SEBI compliance information

export interface Bond {
  id: string;
  issuer: string;
  isin: string;
  logo: string;
  rating: string;
  ratingAgency: string;
  couponRate: number;
  currentYield: number;
  ytm: number;
  maturityDate: string;
  tenure: string;
  faceValue: number;
  minInvestment: number;
  payoutFrequency: "Monthly" | "Quarterly" | "Half-yearly" | "Annually";
  bondType: "Corporate" | "Government" | "Tax-Free" | "PSU";
  riskLevel: "Low" | "Medium" | "High";
  issueDate: string;
  nextCouponDate: string;
  description: string;
  features: string[];
  taxBenefits: string;
  callOption: boolean;
  putOption: boolean;
  secured: boolean;
  listed: boolean;
  listingExchange: string[];
}

export const bondsData: Bond[] = [
  {
    id: "bond-1",
    issuer: "MoneyBoxx March'27",
    isin: "INE0DXQ07017",
    logo: "💰",
    rating: "AA",
    ratingAgency: "CRISIL",
    couponRate: 8.5,
    currentYield: 12.80,
    ytm: 12.50,
    maturityDate: "2027-03-20",
    tenure: "3 Years",
    faceValue: 1000,
    minInvestment: 10000,
    payoutFrequency: "Quarterly",
    bondType: "Corporate",
    riskLevel: "Medium",
    issueDate: "2024-03-20",
    nextCouponDate: "2025-06-20",
    description: "MoneyBoxx Finance is a leading NBFC focused on small business loans. This bond offers attractive yields with quarterly interest payments.",
    features: [
      "Listed on BSE",
      "Quarterly interest payout",
      "CRISIL AA rated",
      "Secured against loan portfolio",
    ],
    taxBenefits: "Interest income taxable as per income tax slab. TDS applicable at 10%.",
    callOption: false,
    putOption: false,
    secured: true,
    listed: true,
    listingExchange: ["BSE"],
  },
  {
    id: "bond-2",
    issuer: "Indel Money Aug'26",
    isin: "INE0F3407018",
    logo: "🏦",
    rating: "AA",
    ratingAgency: "ICRA",
    couponRate: 7.5,
    currentYield: 12.80,
    ytm: 12.50,
    maturityDate: "2026-08-15",
    tenure: "2 Years",
    faceValue: 1000,
    minInvestment: 10000,
    payoutFrequency: "Quarterly",
    bondType: "Corporate",
    riskLevel: "Medium",
    issueDate: "2024-08-15",
    nextCouponDate: "2025-05-15",
    description: "Indel Money is a gold loan NBFC with a strong presence in South India. This bond provides steady returns backed by gold loan portfolio.",
    features: [
      "Listed on NSE",
      "Backed by gold loan portfolio",
      "ICRA AA rated",
      "Regular interest payouts",
    ],
    taxBenefits: "Interest income taxable as per income tax slab. TDS applicable at 10%.",
    callOption: true,
    putOption: false,
    secured: true,
    listed: true,
    listingExchange: ["NSE"],
  },
  {
    id: "bond-3",
    issuer: "Varthana Aug'27",
    isin: "INE0H5G07012",
    logo: "📚",
    rating: "AA",
    ratingAgency: "CARE",
    couponRate: 7.5,
    currentYield: 12.80,
    ytm: 12.50,
    maturityDate: "2027-08-25",
    tenure: "3 Years",
    faceValue: 1000,
    minInvestment: 10000,
    payoutFrequency: "Half-yearly",
    bondType: "Corporate",
    riskLevel: "Medium",
    issueDate: "2024-08-25",
    nextCouponDate: "2025-08-25",
    description: "Varthana Finance is focused on affordable private school financing. Impact investing opportunity with competitive returns.",
    features: [
      "Impact investment opportunity",
      "Education sector focus",
      "CARE AA rated",
      "Half-yearly interest payout",
    ],
    taxBenefits: "Interest income taxable as per income tax slab. TDS applicable at 10%.",
    callOption: false,
    putOption: true,
    secured: true,
    listed: true,
    listingExchange: ["BSE"],
  },
  {
    id: "bond-4",
    issuer: "REC Limited",
    isin: "INE020B07HM8",
    logo: "⚡",
    rating: "AAA",
    ratingAgency: "CRISIL",
    couponRate: 7.85,
    currentYield: 7.90,
    ytm: 7.85,
    maturityDate: "2029-06-15",
    tenure: "5 Years",
    faceValue: 10000,
    minInvestment: 10000,
    payoutFrequency: "Annually",
    bondType: "PSU",
    riskLevel: "Low",
    issueDate: "2024-06-15",
    nextCouponDate: "2025-06-15",
    description: "REC Limited is a Maharatna PSU under the Ministry of Power. Sovereign-backed bonds with highest safety rating.",
    features: [
      "Government of India owned",
      "AAA rated - Highest safety",
      "Listed on both NSE & BSE",
      "Tax-efficient for HNIs",
    ],
    taxBenefits: "Interest income taxable as per income tax slab. Capital gains tax benefits if held till maturity.",
    callOption: false,
    putOption: false,
    secured: false,
    listed: true,
    listingExchange: ["NSE", "BSE"],
  },
  {
    id: "bond-5",
    issuer: "NHAI",
    isin: "INE906B07GP7",
    logo: "🛣️",
    rating: "AAA",
    ratingAgency: "ICRA",
    couponRate: 7.35,
    currentYield: 7.40,
    ytm: 7.35,
    maturityDate: "2030-03-31",
    tenure: "6 Years",
    faceValue: 1000,
    minInvestment: 10000,
    payoutFrequency: "Annually",
    bondType: "Government",
    riskLevel: "Low",
    issueDate: "2024-03-31",
    nextCouponDate: "2025-03-31",
    description: "National Highways Authority of India bonds are backed by Government of India. Tax-free interest for investors.",
    features: [
      "Government guaranteed",
      "Tax-free interest (Section 10)",
      "AAA rated",
      "Long-term investment",
    ],
    taxBenefits: "Interest is tax-free under Section 10(15)(iv)(h) of Income Tax Act.",
    callOption: false,
    putOption: false,
    secured: false,
    listed: true,
    listingExchange: ["NSE", "BSE"],
  },
  {
    id: "bond-6",
    issuer: "IRFC",
    isin: "INE053F07AE8",
    logo: "🚂",
    rating: "AAA",
    ratingAgency: "CRISIL",
    couponRate: 7.65,
    currentYield: 7.70,
    ytm: 7.65,
    maturityDate: "2028-09-15",
    tenure: "4 Years",
    faceValue: 1000,
    minInvestment: 10000,
    payoutFrequency: "Half-yearly",
    bondType: "PSU",
    riskLevel: "Low",
    issueDate: "2024-09-15",
    nextCouponDate: "2025-03-15",
    description: "Indian Railway Finance Corporation is a Navratna PSU. Safe investment backed by Indian Railways revenue.",
    features: [
      "Government of India owned",
      "Navratna status",
      "Backed by Railways revenue",
      "Half-yearly interest payout",
    ],
    taxBenefits: "Interest income taxable as per income tax slab. TDS applicable at 10%.",
    callOption: false,
    putOption: false,
    secured: false,
    listed: true,
    listingExchange: ["NSE", "BSE"],
  },
];

export const bondRiskDisclaimer = `
**Risk Disclosure:**
- Bond investments are subject to credit risk and interest rate risk.
- Past performance does not guarantee future returns.
- Bond prices may fluctuate based on market conditions.
- Investors should read all scheme related documents carefully before investing.
- The ratings mentioned are current ratings and may change over time.

**SEBI Registration:**
- All bonds listed on this platform are SEBI compliant.
- Investment in bonds is regulated by SEBI (Issue and Listing of Non-Convertible Securities) Regulations, 2021.

**Tax Implications:**
- Interest income from bonds is generally taxable as per the investor's income tax slab.
- TDS is applicable at 10% if PAN is provided, else 20%.
- Capital gains taxation depends on holding period.
`;
