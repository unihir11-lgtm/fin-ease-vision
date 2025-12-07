// IPO Mock Data with SEBI compliance information - Updated with real-world IPO data

export interface IPO {
  id: string;
  companyName: string;
  companyShortName: string;
  type: "Main Board" | "SME";
  status: "Open" | "Upcoming" | "Closed" | "Listed";
  iconType: "globe" | "briefcase" | "factory" | "rocket" | "bolt" | "truck" | "cpu" | "building2" | "landmark" | "heart" | "shield" | "package" | "zap" | "leaf" | "shopping-cart";
  priceRange: { min: number; max: number };
  lotSize: number;
  minInvestment: number;
  issueSize: string;
  bidDates: { start: string; end: string };
  allotmentDate: string;
  refundDate: string;
  listingDate: string;
  subscriptionRate: {
    qib: number;
    nii: number;
    retail: number;
    total: number;
    employee?: number;
  };
  gmp: number; // Grey Market Premium
  expectedListing?: number;
  listingGain?: number; // For closed/listed IPOs
  aboutCompany: string;
  foundedYear: string;
  managingDirector: string;
  parentOrganization: string;
  industry: string;
  headquarters: string;
  employees?: number;
  website?: string;
  financials: {
    year: string;
    revenue: number;
    assets: number;
    profit: number;
    netWorth?: number;
  }[];
  peerComparison: {
    company: string;
    epsBasic: number;
    epsDiluted: number;
    nav: number;
    pe: number;
    ronw: number;
  }[];
  rhpLink: string;
  drhpLink: string;
  registrar: string;
  leadManager: string;
  listingAt: string[];
  // Additional IPO Details
  issueType: "Book Built" | "Fixed Price";
  faceValue: number;
  freshIssue?: string;
  ofs?: string; // Offer for Sale
  preIssueHolding?: number;
  postIssueHolding?: number;
  objectives: string[];
  strengths: string[];
  risks: string[];
  promoterHolding?: {
    preIssue: number;
    postIssue: number;
  };
  reservations?: {
    qib: number;
    nii: number;
    retail: number;
    employee?: number;
    anchor?: number;
  };
}

export const ipoData: IPO[] = [
  // Currently Open IPOs
  {
    id: "ipo-icici-pru-amc",
    companyName: "ICICI Prudential Asset Management Company Limited",
    companyShortName: "ICICI Prudential AMC",
    type: "Main Board",
    status: "Open",
    iconType: "landmark",
    priceRange: { min: 2061, max: 2165 },
    lotSize: 6,
    minInvestment: 12990,
    issueSize: "₹10,602.65 Cr",
    bidDates: { start: "2025-12-12", end: "2025-12-16" },
    allotmentDate: "2025-12-17",
    refundDate: "2025-12-18",
    listingDate: "2025-12-19",
    subscriptionRate: {
      qib: 45.32,
      nii: 125.80,
      retail: 85.60,
      total: 78.50,
    },
    gmp: 185,
    expectedListing: 2350,
    aboutCompany: "ICICI Prudential Asset Management Company is one of India's largest and most trusted asset management companies. A joint venture between ICICI Bank and Prudential plc, the company manages over ₹7 lakh crore in assets under management across mutual funds, portfolio management services, and alternative investment funds.",
    foundedYear: "1993",
    managingDirector: "Mr. Nimesh Shah",
    parentOrganization: "ICICI Bank & Prudential plc",
    industry: "Asset Management",
    headquarters: "Mumbai, Maharashtra",
    employees: 1850,
    website: "https://www.icicipruamc.com",
    financials: [
      { year: "FY2022", revenue: 2150, assets: 4500, profit: 1420, netWorth: 3200 },
      { year: "FY2023", revenue: 2580, assets: 5200, profit: 1680, netWorth: 3850 },
      { year: "FY2024", revenue: 3120, assets: 6100, profit: 2050, netWorth: 4500 },
    ],
    peerComparison: [
      { company: "HDFC AMC", epsBasic: 68.50, epsDiluted: 68.20, nav: 245.80, pe: 32.5, ronw: 28.5 },
      { company: "Nippon Life India AMC", epsBasic: 18.20, epsDiluted: 18.10, nav: 85.40, pe: 28.8, ronw: 21.3 },
      { company: "Aditya Birla Sun Life AMC", epsBasic: 12.80, epsDiluted: 12.70, nav: 142.50, pe: 24.2, ronw: 18.6 },
    ],
    rhpLink: "https://www.sebi.gov.in/rhp/icici-pru-amc",
    drhpLink: "https://www.sebi.gov.in/drhp/icici-pru-amc",
    registrar: "KFin Technologies Limited",
    leadManager: "ICICI Securities, Kotak Mahindra Capital, Morgan Stanley India",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 10,
    freshIssue: "₹3,500 Cr",
    ofs: "₹7,102.65 Cr",
    preIssueHolding: 100,
    postIssueHolding: 75,
    objectives: [
      "To carry out the Offer for Sale by selling shareholders",
      "Achieve benefits of listing equity shares on stock exchanges",
      "Enhance brand visibility and credibility"
    ],
    strengths: [
      "Market leader with ₹7+ lakh crore AUM",
      "Strong parentage - ICICI Bank & Prudential plc",
      "Diversified product portfolio across asset classes",
      "Pan-India distribution network with 200+ branches",
      "Consistent track record of fund performance"
    ],
    risks: [
      "Dependent on capital market performance",
      "High competition from other AMCs and PMS providers",
      "Regulatory changes by SEBI could impact operations",
      "Key personnel dependency"
    ],
    promoterHolding: { preIssue: 100, postIssue: 75 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  {
    id: "ipo-wakefit",
    companyName: "Wakefit Innovations Private Limited",
    companyShortName: "Wakefit Innovations",
    type: "Main Board",
    status: "Open",
    iconType: "package",
    priceRange: { min: 185, max: 195 },
    lotSize: 76,
    minInvestment: 14820,
    issueSize: "₹1,288.89 Cr",
    bidDates: { start: "2025-12-08", end: "2025-12-10" },
    allotmentDate: "2025-12-11",
    refundDate: "2025-12-12",
    listingDate: "2025-12-13",
    subscriptionRate: {
      qib: 68.45,
      nii: 185.20,
      retail: 142.80,
      total: 125.60,
    },
    gmp: 42,
    expectedListing: 237,
    aboutCompany: "Wakefit Innovations is India's leading D2C sleep and home solutions company. Founded in 2016, the company offers mattresses, pillows, bed frames, sofas, and home furniture through its online platform and offline stores. Known for its orthopedic mattresses and innovative sleep technology.",
    foundedYear: "2016",
    managingDirector: "Mr. Ankit Garg & Mr. Chaitanya Ramalingegowda",
    parentOrganization: "Wakefit Innovations Pvt Ltd",
    industry: "D2C / Home Furnishing",
    headquarters: "Bengaluru, Karnataka",
    employees: 2500,
    website: "https://www.wakefit.co",
    financials: [
      { year: "FY2022", revenue: 420, assets: 180, profit: -85, netWorth: 120 },
      { year: "FY2023", revenue: 680, assets: 280, profit: -45, netWorth: 180 },
      { year: "FY2024", revenue: 1050, assets: 450, profit: 25, netWorth: 320 },
    ],
    peerComparison: [
      { company: "Sheela Foam (Sleepwell)", epsBasic: 18.50, epsDiluted: 18.40, nav: 185.20, pe: 45.2, ronw: 12.8 },
      { company: "Duroflex", epsBasic: 8.20, epsDiluted: 8.15, nav: 92.40, pe: 38.5, ronw: 15.2 },
    ],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "Axis Capital, JM Financial, IIFL Securities",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 2,
    freshIssue: "₹800 Cr",
    ofs: "₹488.89 Cr",
    objectives: [
      "Expansion of retail store network",
      "Investment in technology and R&D",
      "Brand building and marketing initiatives",
      "General corporate purposes"
    ],
    strengths: [
      "Leading D2C brand in sleep solutions",
      "Asset-light business model",
      "Strong digital presence and customer loyalty",
      "Profitable in FY2024"
    ],
    risks: [
      "History of losses until recently",
      "Intense competition from organized and unorganized players",
      "Dependent on consumer discretionary spending"
    ],
    promoterHolding: { preIssue: 52, postIssue: 38 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  {
    id: "ipo-nephrocare",
    companyName: "Nephrocare Health Services Limited",
    companyShortName: "Nephrocare Health",
    type: "Main Board",
    status: "Open",
    iconType: "heart",
    priceRange: { min: 438, max: 460 },
    lotSize: 32,
    minInvestment: 14720,
    issueSize: "₹871.05 Cr",
    bidDates: { start: "2025-12-10", end: "2025-12-12" },
    allotmentDate: "2025-12-13",
    refundDate: "2025-12-16",
    listingDate: "2025-12-17",
    subscriptionRate: {
      qib: 52.80,
      nii: 98.50,
      retail: 68.20,
      total: 72.40,
    },
    gmp: 65,
    expectedListing: 525,
    aboutCompany: "Nephrocare Health Services is one of India's largest dialysis service providers. The company operates a chain of dialysis centers across India, offering affordable and quality dialysis treatment to patients with chronic kidney disease.",
    foundedYear: "2010",
    managingDirector: "Dr. Vikram Vora",
    parentOrganization: "Nephrocare Health Services Ltd",
    industry: "Healthcare / Dialysis Services",
    headquarters: "Mumbai, Maharashtra",
    employees: 3200,
    financials: [
      { year: "FY2022", revenue: 285, assets: 420, profit: 45, netWorth: 180 },
      { year: "FY2023", revenue: 385, assets: 580, profit: 68, netWorth: 248 },
      { year: "FY2024", revenue: 520, assets: 780, profit: 95, netWorth: 345 },
    ],
    peerComparison: [
      { company: "NephroPlus", epsBasic: 12.50, epsDiluted: 12.40, nav: 85.20, pe: 42.5, ronw: 18.2 },
      { company: "Fresenius Medical Care", epsBasic: 45.80, epsDiluted: 45.60, nav: 285.40, pe: 28.8, ronw: 16.5 },
    ],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "ICICI Securities, Motilal Oswal",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 10,
    freshIssue: "₹500 Cr",
    ofs: "₹371.05 Cr",
    objectives: [
      "Expansion of dialysis center network",
      "Investment in medical equipment",
      "Working capital requirements"
    ],
    strengths: [
      "Growing demand for dialysis services in India",
      "Established network of centers",
      "Experienced medical team"
    ],
    risks: [
      "Regulatory changes in healthcare sector",
      "Competition from hospitals and other providers",
      "Reimbursement from insurance companies"
    ],
    promoterHolding: { preIssue: 68, postIssue: 52 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  // Upcoming IPOs
  {
    id: "ipo-meesho",
    companyName: "Meesho Inc (Fashnear Technologies Pvt Ltd)",
    companyShortName: "Meesho",
    type: "Main Board",
    status: "Upcoming",
    iconType: "shopping-cart",
    priceRange: { min: 105, max: 111 },
    lotSize: 135,
    minInvestment: 14985,
    issueSize: "₹5,421.20 Cr",
    bidDates: { start: "2025-12-18", end: "2025-12-20" },
    allotmentDate: "2025-12-23",
    refundDate: "2025-12-24",
    listingDate: "2025-12-26",
    subscriptionRate: { qib: 0, nii: 0, retail: 0, total: 0 },
    gmp: 28,
    aboutCompany: "Meesho is India's largest social commerce platform enabling individuals and small businesses to start their online stores. The company connects over 15 million resellers with manufacturers across categories like fashion, home, and electronics. Backed by SoftBank, Meta, and Prosus.",
    foundedYear: "2015",
    managingDirector: "Mr. Vidit Aatrey & Mr. Sanjeev Barnwal",
    parentOrganization: "Fashnear Technologies Pvt Ltd",
    industry: "E-commerce / Social Commerce",
    headquarters: "Bengaluru, Karnataka",
    employees: 2800,
    website: "https://www.meesho.com",
    financials: [
      { year: "FY2022", revenue: 520, assets: 1200, profit: -520, netWorth: 850 },
      { year: "FY2023", revenue: 1850, assets: 2100, profit: -380, netWorth: 1420 },
      { year: "FY2024", revenue: 3200, assets: 2850, profit: -120, netWorth: 2100 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "KFin Technologies Ltd",
    leadManager: "Morgan Stanley, Goldman Sachs, BofA Securities",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 1,
    freshIssue: "₹2,500 Cr",
    ofs: "₹2,921.20 Cr",
    objectives: [
      "Investment in technology and AI capabilities",
      "Expansion of logistics network",
      "Marketing and brand building",
      "General corporate purposes"
    ],
    strengths: [
      "India's #1 social commerce platform",
      "15+ million active resellers",
      "Strong investor backing",
      "Zero-commission model"
    ],
    risks: [
      "History of losses",
      "Intense competition from Flipkart, Amazon",
      "Dependent on reseller ecosystem"
    ],
    promoterHolding: { preIssue: 42, postIssue: 32 },
    reservations: { qib: 75, nii: 15, retail: 10 }
  },
  {
    id: "ipo-groww",
    companyName: "Groww (Billionbrains Garage Ventures Pvt Ltd)",
    companyShortName: "Groww",
    type: "Main Board",
    status: "Upcoming",
    iconType: "rocket",
    priceRange: { min: 95, max: 100 },
    lotSize: 150,
    minInvestment: 15000,
    issueSize: "₹6,632.30 Cr",
    bidDates: { start: "2025-12-22", end: "2025-12-26" },
    allotmentDate: "2025-12-27",
    refundDate: "2025-12-30",
    listingDate: "2025-12-31",
    subscriptionRate: { qib: 0, nii: 0, retail: 0, total: 0 },
    gmp: 18,
    aboutCompany: "Groww is India's leading investment platform with over 10 crore registered users. The platform offers stocks, mutual funds, F&O, IPOs, and digital gold. Known for its simple user interface and zero brokerage on delivery trades.",
    foundedYear: "2017",
    managingDirector: "Mr. Lalit Keshre",
    parentOrganization: "Billionbrains Garage Ventures",
    industry: "Fintech / Stock Broking",
    headquarters: "Bengaluru, Karnataka",
    employees: 1500,
    website: "https://groww.in",
    financials: [
      { year: "FY2022", revenue: 185, assets: 580, profit: -85, netWorth: 420 },
      { year: "FY2023", revenue: 580, assets: 1200, profit: -45, netWorth: 850 },
      { year: "FY2024", revenue: 1420, assets: 2100, profit: 180, netWorth: 1650 },
    ],
    peerComparison: [
      { company: "Zerodha", epsBasic: 85.20, epsDiluted: 85.00, nav: 520.40, pe: 18.5, ronw: 45.2 },
      { company: "Angel One", epsBasic: 45.80, epsDiluted: 45.50, nav: 285.20, pe: 22.8, ronw: 28.5 },
    ],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "Kotak Mahindra Capital, Citigroup, Jefferies",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 1,
    freshIssue: "₹2,000 Cr",
    ofs: "₹4,632.30 Cr",
    objectives: [
      "Technology infrastructure investment",
      "Regulatory capital requirements",
      "Acquisitions and strategic investments",
      "General corporate purposes"
    ],
    strengths: [
      "10+ crore registered users",
      "Category leader in Gen-Z demographic",
      "Profitable in FY2024",
      "Strong mobile-first approach"
    ],
    risks: [
      "Intense competition from Zerodha, Angel One",
      "Regulatory changes by SEBI",
      "Market downturn risk"
    ],
    promoterHolding: { preIssue: 48, postIssue: 35 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  {
    id: "ipo-lenskart",
    companyName: "Lenskart Solutions Private Limited",
    companyShortName: "Lenskart",
    type: "Main Board",
    status: "Upcoming",
    iconType: "globe",
    priceRange: { min: 382, max: 402 },
    lotSize: 37,
    minInvestment: 14874,
    issueSize: "₹7,278.02 Cr",
    bidDates: { start: "2025-12-28", end: "2026-01-02" },
    allotmentDate: "2026-01-03",
    refundDate: "2026-01-06",
    listingDate: "2026-01-08",
    subscriptionRate: { qib: 0, nii: 0, retail: 0, total: 0 },
    gmp: 85,
    aboutCompany: "Lenskart is India's largest eyewear retailer with 2000+ stores across India, Singapore, Dubai, and more. The company offers prescription eyeglasses, sunglasses, and contact lenses through omnichannel presence. Known for innovative 3D try-on technology.",
    foundedYear: "2010",
    managingDirector: "Mr. Peyush Bansal",
    parentOrganization: "Lenskart Solutions Pvt Ltd",
    industry: "Retail / Eyewear",
    headquarters: "Faridabad, Haryana",
    employees: 12000,
    website: "https://www.lenskart.com",
    financials: [
      { year: "FY2022", revenue: 1850, assets: 2500, profit: -120, netWorth: 1800 },
      { year: "FY2023", revenue: 3200, assets: 3800, profit: 85, netWorth: 2850 },
      { year: "FY2024", revenue: 4800, assets: 5200, profit: 280, netWorth: 3500 },
    ],
    peerComparison: [
      { company: "Titan Eyeplus", epsBasic: 28.50, epsDiluted: 28.40, nav: 185.20, pe: 65.2, ronw: 18.5 },
    ],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "KFin Technologies Ltd",
    leadManager: "Kotak Mahindra, Morgan Stanley, BofA Securities",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 1,
    freshIssue: "₹3,000 Cr",
    ofs: "₹4,278.02 Cr",
    objectives: [
      "Retail store expansion in India and international markets",
      "Investment in manufacturing facilities",
      "Technology and R&D investment",
      "General corporate purposes"
    ],
    strengths: [
      "Market leader with 2000+ stores",
      "Omnichannel presence",
      "Strong brand recall",
      "Vertically integrated manufacturing"
    ],
    risks: [
      "Store expansion execution risk",
      "International expansion challenges",
      "Competition from online and offline players"
    ],
    promoterHolding: { preIssue: 35, postIssue: 25 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  // Closed/Listed IPOs with performance
  {
    id: "ipo-pine-labs",
    companyName: "Pine Labs Private Limited",
    companyShortName: "Pine Labs",
    type: "Main Board",
    status: "Listed",
    iconType: "cpu",
    priceRange: { min: 210, max: 221 },
    lotSize: 67,
    minInvestment: 14807,
    issueSize: "₹3,899.91 Cr",
    bidDates: { start: "2025-11-07", end: "2025-11-11" },
    allotmentDate: "2025-11-12",
    refundDate: "2025-11-13",
    listingDate: "2025-11-14",
    subscriptionRate: {
      qib: 125.80,
      nii: 285.40,
      retail: 185.20,
      total: 178.50,
    },
    gmp: 0,
    listingGain: 28.5,
    expectedListing: 284,
    aboutCompany: "Pine Labs is India's leading merchant commerce platform offering PoS terminals, payment solutions, and lending services to over 5 lakh merchants across India and Southeast Asia.",
    foundedYear: "1998",
    managingDirector: "Mr. B. Amrish Rau",
    parentOrganization: "Pine Labs Pvt Ltd",
    industry: "Fintech / Payments",
    headquarters: "Noida, Uttar Pradesh",
    employees: 2200,
    financials: [
      { year: "FY2022", revenue: 520, assets: 1800, profit: -180, netWorth: 1200 },
      { year: "FY2023", revenue: 850, assets: 2400, profit: -85, netWorth: 1650 },
      { year: "FY2024", revenue: 1280, assets: 3200, profit: 45, netWorth: 2100 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "JP Morgan, Goldman Sachs, Axis Capital",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 1,
    objectives: [],
    strengths: ["Market leader in PoS terminals", "Strong merchant network", "Diversified revenue streams"],
    risks: ["Competition from UPI", "Regulatory changes"],
    promoterHolding: { preIssue: 45, postIssue: 32 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  {
    id: "ipo-physics-wallah",
    companyName: "PhysicsWallah Private Limited",
    companyShortName: "PhysicsWallah",
    type: "Main Board",
    status: "Listed",
    iconType: "briefcase",
    priceRange: { min: 103, max: 109 },
    lotSize: 137,
    minInvestment: 14933,
    issueSize: "₹3,820 Cr",
    bidDates: { start: "2025-11-11", end: "2025-11-13" },
    allotmentDate: "2025-11-14",
    refundDate: "2025-11-15",
    listingDate: "2025-11-18",
    subscriptionRate: {
      qib: 98.50,
      nii: 245.80,
      retail: 320.50,
      total: 195.60,
    },
    gmp: 0,
    listingGain: 45.2,
    expectedListing: 158,
    aboutCompany: "PhysicsWallah is India's leading edtech unicorn offering affordable test preparation for JEE, NEET, and other competitive exams. Founded by Alakh Pandey, the company has 10+ million students on its platform.",
    foundedYear: "2020",
    managingDirector: "Mr. Alakh Pandey",
    parentOrganization: "PhysicsWallah Pvt Ltd",
    industry: "Edtech",
    headquarters: "Noida, Uttar Pradesh",
    employees: 8500,
    financials: [
      { year: "FY2022", revenue: 85, assets: 280, profit: -120, netWorth: 180 },
      { year: "FY2023", revenue: 580, assets: 850, profit: -85, netWorth: 520 },
      { year: "FY2024", revenue: 1420, assets: 1800, profit: 120, netWorth: 1200 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "KFin Technologies Ltd",
    leadManager: "Axis Capital, IIFL Securities",
    listingAt: ["NSE", "BSE"],
    issueType: "Book Built",
    faceValue: 1,
    objectives: [],
    strengths: ["Strong brand recall", "10M+ student base", "Affordable pricing model"],
    risks: ["Competition from BYJU'S, Unacademy", "Regulatory changes in edtech"],
    promoterHolding: { preIssue: 58, postIssue: 42 },
    reservations: { qib: 50, nii: 15, retail: 35 }
  },
  // SME IPOs
  {
    id: "ipo-pajson-agro",
    companyName: "Pajson Agro India Limited",
    companyShortName: "Pajson Agro",
    type: "SME",
    status: "Open",
    iconType: "leaf",
    priceRange: { min: 112, max: 118 },
    lotSize: 1200,
    minInvestment: 141600,
    issueSize: "₹74.45 Cr",
    bidDates: { start: "2025-12-11", end: "2025-12-15" },
    allotmentDate: "2025-12-16",
    refundDate: "2025-12-17",
    listingDate: "2025-12-18",
    subscriptionRate: {
      qib: 85.20,
      nii: 245.80,
      retail: 185.40,
      total: 168.50,
    },
    gmp: 45,
    aboutCompany: "Pajson Agro India is engaged in trading and distribution of agricultural products including seeds, fertilizers, and pesticides across Maharashtra and surrounding states.",
    foundedYear: "2012",
    managingDirector: "Mr. Suresh Patil",
    parentOrganization: "Pajson Agro India Ltd",
    industry: "Agriculture / Trading",
    headquarters: "Pune, Maharashtra",
    financials: [
      { year: "FY2022", revenue: 28, assets: 12, profit: 2.8, netWorth: 8 },
      { year: "FY2023", revenue: 42, assets: 18, profit: 4.5, netWorth: 12 },
      { year: "FY2024", revenue: 58, assets: 28, profit: 6.8, netWorth: 18 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Bigshare Services Pvt Ltd",
    leadManager: "Shreni Shares Ltd",
    listingAt: ["NSE SME"],
    issueType: "Fixed Price",
    faceValue: 10,
    objectives: ["Working capital requirements", "General corporate purposes"],
    strengths: ["Established distribution network", "Growing agricultural sector"],
    risks: ["Seasonal business", "Commodity price fluctuations"],
    promoterHolding: { preIssue: 100, postIssue: 72 },
    reservations: { qib: 0, nii: 50, retail: 50 }
  },
  {
    id: "ipo-ashwini-container",
    companyName: "Ashwini Container Movers Limited",
    companyShortName: "Ashwini Container",
    type: "SME",
    status: "Open",
    iconType: "truck",
    priceRange: { min: 135, max: 142 },
    lotSize: 1000,
    minInvestment: 142000,
    issueSize: "₹71.00 Cr",
    bidDates: { start: "2025-12-12", end: "2025-12-16" },
    allotmentDate: "2025-12-17",
    refundDate: "2025-12-18",
    listingDate: "2025-12-19",
    subscriptionRate: {
      qib: 42.50,
      nii: 125.80,
      retail: 95.40,
      total: 85.20,
    },
    gmp: 35,
    aboutCompany: "Ashwini Container Movers provides container transportation and logistics services across major ports in India including JNPT, Mundra, and Chennai.",
    foundedYear: "2008",
    managingDirector: "Mr. Ashwin Patel",
    parentOrganization: "Ashwini Container Movers Ltd",
    industry: "Logistics / Transportation",
    headquarters: "Mumbai, Maharashtra",
    financials: [
      { year: "FY2022", revenue: 35, assets: 22, profit: 3.2, netWorth: 15 },
      { year: "FY2023", revenue: 48, assets: 32, profit: 4.8, netWorth: 20 },
      { year: "FY2024", revenue: 65, assets: 45, profit: 7.2, netWorth: 28 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "Hem Securities Ltd",
    listingAt: ["BSE SME"],
    issueType: "Fixed Price",
    faceValue: 10,
    objectives: ["Fleet expansion", "Working capital requirements"],
    strengths: ["Growing logistics sector", "Established client relationships"],
    risks: ["Fuel price volatility", "Economic slowdown risk"],
    promoterHolding: { preIssue: 100, postIssue: 68 },
    reservations: { qib: 0, nii: 50, retail: 50 }
  }
];

export interface IPOApplication {
  id: string;
  ipoName: string;
  type: "Retail" | "HNI" | "sHNI" | "bHNI";
  applicationNo: string;
  exchangeRef: string;
  applicationId: string;
  dpId: string;
  qty: number;
  upi: string;
  exchangeCode: string;
  status: "pending" | "allotted" | "unallocated" | "refunded" | "mandate_pending";
  appliedDate: string;
  amount: number;
  lotSize: number;
  priceApplied: number;
}

export const userIPOApplications: IPOApplication[] = [
  {
    id: "app-1",
    ipoName: "ICICI Prudential AMC",
    type: "Retail",
    applicationNo: "20252216516516511",
    exchangeRef: "IN202532443",
    applicationId: "245785",
    dpId: "IN302679",
    qty: 6,
    upi: "9099246254@oksbi",
    exchangeCode: "BSE",
    status: "mandate_pending",
    appliedDate: "2025-12-12",
    amount: 12990,
    lotSize: 1,
    priceApplied: 2165
  },
  {
    id: "app-2",
    ipoName: "Wakefit Innovations",
    type: "Retail",
    applicationNo: "20252216516516512",
    exchangeRef: "IN202532444",
    applicationId: "245786",
    dpId: "IN302679",
    qty: 76,
    upi: "9099246254@oksbi",
    exchangeCode: "NSE",
    status: "pending",
    appliedDate: "2025-12-09",
    amount: 14820,
    lotSize: 1,
    priceApplied: 195
  },
  {
    id: "app-3",
    ipoName: "PhysicsWallah",
    type: "Retail",
    applicationNo: "20252116516516513",
    exchangeRef: "IN202532445",
    applicationId: "245787",
    dpId: "IN302679",
    qty: 137,
    upi: "9099246254@oksbi",
    exchangeCode: "NSE",
    status: "allotted",
    appliedDate: "2025-11-11",
    amount: 14933,
    lotSize: 1,
    priceApplied: 109
  },
  {
    id: "app-4",
    ipoName: "Pine Labs",
    type: "Retail",
    applicationNo: "20252116516516514",
    exchangeRef: "IN202532446",
    applicationId: "245788",
    dpId: "IN302679",
    qty: 67,
    upi: "9099246254@oksbi",
    exchangeCode: "BSE",
    status: "unallocated",
    appliedDate: "2025-11-08",
    amount: 14807,
    lotSize: 1,
    priceApplied: 221
  },
];

export const ipoMarketLots = [
  { category: "Retail Minimum", lotSize: 1, shares: 1000, amount: 142000 },
  { category: "Retail Maximum", lotSize: 1, shares: 1000, amount: 142000 },
  { category: "S-HNI Minimum", lotSize: 2, shares: 2000, amount: 284000 },
  { category: "B-HNI Minimum", lotSize: 10, shares: 10000, amount: 1420000 },
];

// IPO Performance History for recently listed IPOs
export interface IPOPerformance {
  id: string;
  companyName: string;
  issuePrice: number;
  listingPrice: number;
  currentPrice: number;
  listingGain: number;
  currentReturn: number;
  listingDate: string;
}

export const ipoPerformanceHistory: IPOPerformance[] = [
  { id: "perf-1", companyName: "PhysicsWallah", issuePrice: 109, listingPrice: 158, currentPrice: 172, listingGain: 45.0, currentReturn: 57.8, listingDate: "2025-11-18" },
  { id: "perf-2", companyName: "Pine Labs", issuePrice: 221, listingPrice: 284, currentPrice: 295, listingGain: 28.5, currentReturn: 33.5, listingDate: "2025-11-14" },
  { id: "perf-3", companyName: "Capillary Technologies", issuePrice: 577, listingPrice: 685, currentPrice: 712, listingGain: 18.7, currentReturn: 23.4, listingDate: "2025-11-22" },
  { id: "perf-4", companyName: "Fujiyama Power", issuePrice: 228, listingPrice: 198, currentPrice: 215, listingGain: -13.2, currentReturn: -5.7, listingDate: "2025-11-21" },
  { id: "perf-5", companyName: "Tenneco Clean Air", issuePrice: 397, listingPrice: 425, currentPrice: 458, listingGain: 7.1, currentReturn: 15.4, listingDate: "2025-11-18" },
];

// GMP History Data
export interface GMPHistory {
  date: string;
  gmp: number;
}

export const getGMPHistory = (ipoId: string): GMPHistory[] => {
  // Simulated GMP history for demo
  const baseGMP = ipoData.find(ipo => ipo.id === ipoId)?.gmp || 20;
  const days = 7;
  const history: GMPHistory[] = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variance = Math.floor(Math.random() * 20) - 10;
    history.push({
      date: date.toISOString().split('T')[0],
      gmp: Math.max(0, baseGMP + variance)
    });
  }
  
  return history;
};
