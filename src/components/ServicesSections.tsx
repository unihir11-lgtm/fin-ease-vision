import ServiceSection from "./ServiceSection";
import ipoIllustration from "@/assets/ipo-illustration.png";
import bondIllustration from "@/assets/bond-illustration.png";
import fdIllustration from "@/assets/fd-illustration.png";
import npsIllustration from "@/assets/nps-illustration.png";
import analyticsIllustration from "@/assets/analytics-illustration.png";

const services = [
  {
    title: "IPO",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey from day one.",
    image: ipoIllustration,
    imageAlt: "IPO illustration",
    reverse: false,
  },
  {
    title: "Bond",
    description: "Gain access to risk-based analytics and seamless execution, enabling you to invest in equities with confidence.",
    image: bondIllustration,
    imageAlt: "Bond illustration",
    reverse: true,
  },
  {
    title: "FD",
    description: "Investing in mutual funds helps grow your wealth over time. Choose from a wide range of funds and let your money work for you.",
    image: fdIllustration,
    imageAlt: "FD illustration",
    reverse: false,
  },
  {
    title: "NPS",
    description: "Discover the untapped potential of private equity and invest in unlisted shares with confidence.",
    image: npsIllustration,
    imageAlt: "NPS illustration",
    reverse: true,
  },
  {
    title: "Stock Analytics",
    description: "Get early access to companies going public. Invest in Initial Public Offerings and be part of the growth journey from day one.",
    image: analyticsIllustration,
    imageAlt: "Stock Analytics illustration",
    reverse: false,
  },
];

const ServicesSections = () => {
  return (
    <div>
      {services.map((service) => (
        <ServiceSection
          key={service.title}
          title={service.title}
          description={service.description}
          image={service.image}
          imageAlt={service.imageAlt}
          reverse={service.reverse}
        />
      ))}
    </div>
  );
};

export default ServicesSections;
