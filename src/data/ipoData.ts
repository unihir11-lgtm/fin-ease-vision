// IPO Mock Data with SEBI compliance information

export interface IPO {
  id: string;
  companyName: string;
  companyShortName: string;
  type: "Main Board" | "SME";
  status: "Open" | "Upcoming" | "Closed";
  iconType: "globe" | "briefcase" | "factory" | "rocket" | "bolt" | "truck" | "cpu" | "building2" | "landmark";
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
  };
  aboutCompany: string;
  foundedYear: string;
  managingDirector: string;
  parentOrganization: string;
  financials: {
    year: string;
    revenue: number;
    assets: number;
    profit: number;
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
}

export const ipoData: IPO[] = [
  {
    id: "ipo-1",
    companyName: "Virtual Galaxy Infotech Limited",
    companyShortName: "Virtual Galaxy Infotech",
    type: "SME",
    status: "Open",
    iconType: "globe",
    priceRange: { min: 135, max: 142 },
    lotSize: 1000,
    minInvestment: 135000,
    issueSize: "93.29 Cr",
    bidDates: { start: "2025-05-09", end: "2025-05-14" },
    allotmentDate: "2025-05-15",
    refundDate: "2025-05-16",
    listingDate: "2025-05-19",
    subscriptionRate: {
      qib: 37.31,
      nii: 197.30,
      retail: 74.08,
      total: 83.89,
    },
    aboutCompany: "Virtual Galaxy Infotech Limited, founded in September 1997, is one of the growing IT services and consulting companies. The company is mostly involved in providing SaaS products and a wide range of services such as banking software, IT solutions, ERP implementation, and custom software development. BFSI, ERP, and E-Governance sectors are the clients they mainly serve with their services. Virtual Galaxy has established its presence by offering advanced technology solutions to over 5000 bank branches and businesses.",
    foundedYear: "1997",
    managingDirector: "Mr Sachin Purushottam Pande",
    parentOrganization: "Virtual Galaxy Infotech Ltd",
    financials: [
      { year: "2022", revenue: 13, assets: 0, profit: 0 },
      { year: "2023", revenue: 15.80, assets: 0, profit: 0 },
      { year: "2024", revenue: 19.54, assets: 0, profit: 0 },
    ],
    peerComparison: [
      { company: "Virtual Galaxy Infotech Limited", epsBasic: 9.88, epsDiluted: 9.88, nav: 24.81, pe: 0, ronw: 39.82 },
      { company: "Veefin Solutions Ltd", epsBasic: 2.74, epsDiluted: 2.61, nav: 52.7, pe: 216.22, ronw: 6.95 },
      { company: "Network People Services Technologies Limited", epsBasic: 13.78, epsDiluted: 13.76, nav: 29.67, pe: 201.86, ronw: 62.04 },
      { company: "Trust Fintech Limited", epsBasic: 7.13, epsDiluted: 7.13, nav: 25.71, pe: 25.53, ronw: 34.58 },
    ],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "Beeline Capital Advisors Pvt Ltd",
    listingAt: ["BSE SME"],
  },
  {
    id: "ipo-2",
    companyName: "Infonative Solutions Limited",
    companyShortName: "Infonative Solutions",
    type: "SME",
    status: "Open",
    iconType: "briefcase",
    priceRange: { min: 70, max: 80 },
    lotSize: 1600,
    minInvestment: 115000,
    issueSize: "45.00 Cr",
    bidDates: { start: "2025-04-03", end: "2025-04-05" },
    allotmentDate: "2025-04-08",
    refundDate: "2025-04-09",
    listingDate: "2025-04-10",
    subscriptionRate: {
      qib: 45.20,
      nii: 120.50,
      retail: 85.30,
      total: 78.50,
    },
    aboutCompany: "Infonative Solutions Limited is a technology company specializing in enterprise software solutions and digital transformation services.",
    foundedYear: "2010",
    managingDirector: "Mr Rajesh Kumar",
    parentOrganization: "Infonative Solutions Ltd",
    financials: [
      { year: "2022", revenue: 8.5, assets: 0, profit: 0 },
      { year: "2023", revenue: 12.30, assets: 0, profit: 0 },
      { year: "2024", revenue: 15.80, assets: 0, profit: 0 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Bigshare Services Pvt Ltd",
    leadManager: "Aryaman Financial Services Ltd",
    listingAt: ["NSE SME"],
  },
  {
    id: "ipo-3",
    companyName: "Spinaroo Commercial Limited",
    companyShortName: "Spinaroo Commercial",
    type: "SME",
    status: "Open",
    iconType: "building2",
    priceRange: { min: 70, max: 80 },
    lotSize: 1600,
    minInvestment: 117000,
    issueSize: "38.50 Cr",
    bidDates: { start: "2025-04-09", end: "2025-04-12" },
    allotmentDate: "2025-04-15",
    refundDate: "2025-04-16",
    listingDate: "2025-04-18",
    subscriptionRate: {
      qib: 52.10,
      nii: 145.80,
      retail: 92.40,
      total: 85.60,
    },
    aboutCompany: "Spinaroo Commercial Limited operates in the trading and distribution sector with a focus on industrial products.",
    foundedYear: "2008",
    managingDirector: "Mr Amit Sharma",
    parentOrganization: "Spinaroo Group",
    financials: [
      { year: "2022", revenue: 22.5, assets: 0, profit: 0 },
      { year: "2023", revenue: 28.30, assets: 0, profit: 0 },
      { year: "2024", revenue: 35.20, assets: 0, profit: 0 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "SMC Capitals Ltd",
    listingAt: ["BSE SME"],
  },
  {
    id: "ipo-4",
    companyName: "Retaggio Industries Limited",
    companyShortName: "Retaggio Industries",
    type: "SME",
    status: "Upcoming",
    iconType: "factory",
    priceRange: { min: 70, max: 80 },
    lotSize: 1600,
    minInvestment: 114000,
    issueSize: "52.00 Cr",
    bidDates: { start: "2025-05-01", end: "2025-05-03" },
    allotmentDate: "2025-05-06",
    refundDate: "2025-05-07",
    listingDate: "2025-05-09",
    subscriptionRate: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
    },
    aboutCompany: "Retaggio Industries Limited is a manufacturing company focused on industrial components and machinery.",
    foundedYear: "2005",
    managingDirector: "Mr Vikram Singh",
    parentOrganization: "Retaggio Group",
    financials: [
      { year: "2022", revenue: 45.2, assets: 0, profit: 0 },
      { year: "2023", revenue: 52.80, assets: 0, profit: 0 },
      { year: "2024", revenue: 68.40, assets: 0, profit: 0 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "KFin Technologies Ltd",
    leadManager: "Centrum Capital Ltd",
    listingAt: ["NSE SME"],
  },
  {
    id: "ipo-5",
    companyName: "TechVision Enterprises Ltd",
    companyShortName: "TechVision Enterprises",
    type: "Main Board",
    status: "Upcoming",
    iconType: "rocket",
    priceRange: { min: 450, max: 485 },
    lotSize: 30,
    minInvestment: 14550,
    issueSize: "1250 Cr",
    bidDates: { start: "2025-05-20", end: "2025-05-23" },
    allotmentDate: "2025-05-26",
    refundDate: "2025-05-27",
    listingDate: "2025-05-29",
    subscriptionRate: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
    },
    aboutCompany: "TechVision Enterprises is a leading technology company providing AI and cloud solutions to enterprises globally.",
    foundedYear: "2012",
    managingDirector: "Dr. Ananya Patel",
    parentOrganization: "TechVision Holdings",
    financials: [
      { year: "2022", revenue: 520, assets: 0, profit: 0 },
      { year: "2023", revenue: 780, assets: 0, profit: 0 },
      { year: "2024", revenue: 1050, assets: 0, profit: 0 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "ICICI Securities Ltd",
    listingAt: ["NSE", "BSE"],
  },
  {
    id: "ipo-6",
    companyName: "Ather Energy IPO",
    companyShortName: "Ather Energy",
    type: "Main Board",
    status: "Closed",
    iconType: "bolt",
    priceRange: { min: 304, max: 321 },
    lotSize: 46,
    minInvestment: 14766,
    issueSize: "2850 Cr",
    bidDates: { start: "2025-04-01", end: "2025-04-04" },
    allotmentDate: "2025-04-07",
    refundDate: "2025-04-08",
    listingDate: "2025-04-10",
    subscriptionRate: {
      qib: 185.50,
      nii: 312.80,
      retail: 245.60,
      total: 238.90,
    },
    aboutCompany: "Ather Energy is India's leading electric two-wheeler company known for premium electric scooters.",
    foundedYear: "2013",
    managingDirector: "Tarun Mehta",
    parentOrganization: "Ather Energy Pvt Ltd",
    financials: [
      { year: "2022", revenue: 410, assets: 0, profit: 0 },
      { year: "2023", revenue: 1580, assets: 0, profit: 0 },
      { year: "2024", revenue: 2100, assets: 0, profit: 0 },
    ],
    peerComparison: [],
    rhpLink: "#",
    drhpLink: "#",
    registrar: "KFin Technologies Ltd",
    leadManager: "Axis Capital",
    listingAt: ["NSE", "BSE"],
  },
];

export interface IPOApplication {
  id: string;
  ipoName: string;
  type: "Retail" | "HNI";
  applicationNo: string;
  exchangeRef: string;
  applicationId: string;
  dpId: string;
  qty: number;
  upi: string;
  exchangeCode: string;
  status: "pending" | "allotted" | "unallocated" | "refunded";
  appliedDate: string;
  amount: number;
}

export const userIPOApplications: IPOApplication[] = [
  {
    id: "app-1",
    ipoName: "BELRISE",
    type: "Retail",
    applicationNo: "20232216516516511",
    exchangeRef: "IN202232443",
    applicationId: "245785",
    dpId: "2545",
    qty: 52,
    upi: "9999@oksbi",
    exchangeCode: "BSE",
    status: "pending",
    appliedDate: "2025-01-10",
    amount: 142000,
  },
  {
    id: "app-2",
    ipoName: "Ather Energy IPO",
    type: "Retail",
    applicationNo: "245785",
    exchangeRef: "IN202232443",
    applicationId: "245785",
    dpId: "2545",
    qty: 52,
    upi: "9999@oksbi",
    exchangeCode: "FZD1234",
    status: "unallocated",
    appliedDate: "2025-04-02",
    amount: 14766,
  },
];

export const ipoMarketLots = [
  { category: "Retail Minimum", lotSize: 1, shares: 1000, amount: 142000 },
  { category: "Retail Maximum", lotSize: 1, shares: 1000, amount: 142000 },
  { category: "S-HNI Minimum", lotSize: 2, shares: 2000, amount: 284000 },
];
