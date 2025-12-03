import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const services = ["IPO", "Bond", "FD", "NPS", "Screener"];

  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
  ];

  return (
    <footer id="contact" className="w-full bg-[#0a344a] text-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand & Contact Info */}
          <div className="space-y-5">
            <h2 className="text-[30px] font-extrabold leading-10">Finease</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-white flex-shrink-0" />
                <p className="text-base text-[#eaeaea] leading-[150%]">
                  36, Third floor, Palm spring<br />
                  complex, Ellisbridge, Ahmedabad-380006, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-white flex-shrink-0" />
                <a href="mailto:fineaseresearchpvtltd@gmail.com" className="text-base text-[#eaeaea] lowercase hover:text-white transition-colors">
                  fineaseresearchpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-white flex-shrink-0" />
                <a href="tel:079-2666588" className="text-base text-[#eaeaea] hover:text-white transition-colors">
                  079-2666588
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#23698e] flex items-center justify-center hover:bg-[#2d7ba3] transition-colors"
                  aria-label={social.name}
                >
                  <div className="w-5 h-5 rounded-full bg-white/30" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-bold text-white mb-3.5 text-base leading-[22px] font-['Raleway']">
              Our Services
            </h4>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-base text-[#eaeaea] font-medium leading-[150%] hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:w-[405px]">
            <h4 className="font-bold text-white mb-3.5 text-base leading-[22px] font-['Raleway']">
              Quick Contact
            </h4>
            <form className="space-y-2.5">
              <div className="rounded-md bg-[#23698e] px-4 py-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent text-base text-[#eaeaea] placeholder:text-[#eaeaea] outline-none leading-[150%] font-medium"
                />
              </div>
              <div className="rounded-md bg-[#23698e] px-4 py-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-base text-[#eaeaea] placeholder:text-[#eaeaea] outline-none leading-[150%] font-medium"
                />
              </div>
              <div className="rounded-md bg-[#23698e] px-4 py-2">
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full bg-transparent text-base text-[#eaeaea] placeholder:text-[#eaeaea] outline-none resize-none leading-[150%] font-medium"
                />
              </div>
              <button 
                type="submit"
                className="h-10 rounded-md bg-[#1dab91] px-3 py-2 text-white font-bold text-base leading-[25px] tracking-[1px] capitalize hover:bg-[#19987f] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full h-[54px] bg-[#057170] flex items-center justify-center px-5 py-3">
        <p className="text-lg text-[#eaeaea] font-semibold leading-[150%]">
          Copyright © 2024 FinEase
        </p>
      </div>
    </footer>
  );
};

export default Footer;
