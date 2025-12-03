import ServiceSection from "./ServiceSection";
import ipoIllustration from "@/assets/ipo-illustration.png";
import bondIllustration from "@/assets/bond-illustration.png";
import fdIllustration from "@/assets/fd-illustration.png";
import npsIllustration from "@/assets/nps-illustration.png";
import analyticsIllustration from "@/assets/analytics-illustration.png";

const services = [
  {
    id: "ipo",
    title: "IPO",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey from day one with comprehensive research and analysis.",
    image: ipoIllustration,
    imageAlt: "IPO illustration",
    reverse: false,
    href: "/ipo",
    features: ["Early access to new listings", "Detailed company analysis", "Easy application process"],
  },
  {
    id: "bond",
    title: "Bonds",
    description: "Secure your portfolio with high-quality bonds. Access AAA-rated government and corporate bonds with attractive yields and predictable returns.",
    image: bondIllustration,
    imageAlt: "Bond illustration",
    reverse: true,
    href: "/bonds",
    features: ["AAA-rated securities", "Fixed income returns", "Portfolio diversification"],
  },
  {
    id: "fd",
    title: "Fixed Deposits",
    description: "Park your savings in DICGC-insured fixed deposits from trusted banks and NBFCs. Earn up to 9.10% interest with complete capital safety.",
    image: fdIllustration,
    imageAlt: "FD illustration",
    reverse: false,
    href: "/fds",
    features: ["Up to 9.10% interest", "DICGC insured", "Flexible tenures"],
  },
  {
    id: "nps",
    title: "NPS",
    description: "Secure your retirement with National Pension System. Enjoy tax benefits under Section 80C and 80CCD while building a substantial retirement corpus.",
    image: npsIllustration,
    imageAlt: "NPS illustration",
    reverse: true,
    href: "/dashboard/nps",
    features: ["Tax benefits up to ₹2 lakh", "Flexible contributions", "Professional fund management"],
  },
  {
    id: "screener",
    title: "Stock Analytics",
    description: "Make informed investment decisions with our comprehensive stock analytics tools. Access detailed financial data, charts, and expert insights.",
    image: analyticsIllustration,
    imageAlt: "Stock Analytics illustration",
    reverse: false,
    href: "/calculators",
    features: ["Real-time data", "Technical analysis", "Expert insights"],
  },
];

const ServicesSections = () => {
  return (
    <div>
      {services.map((service) => (
        <ServiceSection
          key={service.title}
          id={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
          imageAlt={service.imageAlt}
          reverse={service.reverse}
          href={service.href}
          features={service.features}
        />
      ))}
    </div>
  );
};

export default ServicesSections;
