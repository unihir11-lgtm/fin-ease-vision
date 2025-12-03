import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const services = ["IPO", "Bond", "FD", "NPS", "Screener"];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer id="contact" className="w-full bg-[#0a344a] text-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand & Contact Info */}
          <div className="space-y-5">
            <h2 className="text-2xl md:text-[28px] font-extrabold leading-tight font-['Raleway']">Finease</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/80 leading-relaxed">
                  36, Third floor, Palm spring<br />
                  complex, Ellisbridge, Ahmedabad-380006, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a href="mailto:fineaseresearchpvtltd@gmail.com" className="text-sm text-white/80 lowercase hover:text-white transition-colors">
                  fineaseresearchpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/80 flex-shrink-0" />
                <a href="tel:079-2666588" className="text-sm text-white/80 hover:text-white transition-colors">
                  079-2666588
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-[#23698e] flex items-center justify-center hover:bg-[#2d7ba3] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base font-['Raleway']">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href={`#${service.toLowerCase()}`}
                    className="text-sm text-white/80 font-medium hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base font-['Raleway']">
              Quick Contact
            </h4>
            <form className="space-y-2.5">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md bg-[#23698e] px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md bg-[#23698e] px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full rounded-md bg-[#23698e] px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none resize-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                className="h-9 rounded-md bg-primary px-5 py-2 text-white font-bold text-sm tracking-wide capitalize hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full h-12 bg-[#057170] flex items-center justify-center px-5">
        <p className="text-sm md:text-base text-white/90 font-medium">
          Copyright © 2024 FinEase
        </p>
      </div>
    </footer>
  );
};

export default Footer;
