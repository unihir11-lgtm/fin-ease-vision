import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/finease-logo.png";

const Footer = () => {
  const services = [
    { name: "IPO", href: "/ipo" },
    { name: "Bond", href: "/bonds" },
    { name: "FD", href: "/fds" },
    { name: "NPS", href: "/dashboard/nps" },
    { name: "Calculators", href: "/calculators" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer id="contact" className="w-full bg-secondary text-white font-sans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight font-display">FinEase</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Your trusted digital wealth platform for IPOs, Bonds, Fixed Deposits, and NPS investments.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-white/70 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    {service.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <p className="text-sm text-white/70 leading-relaxed">
                  36, Third floor, Palm spring complex,<br />
                  Ellisbridge, Ahmedabad-380006, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:fineaseresearchpvtltd@gmail.com" className="text-sm text-white/70 hover:text-white transition-colors">
                  fineaseresearchpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:079-2666588" className="text-sm text-white/70 hover:text-white transition-colors">
                  079-2666588
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Quick Contact
            </h4>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none resize-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button 
                type="submit"
                className="w-full h-11 rounded-lg bg-primary px-5 py-2.5 text-white font-bold text-sm tracking-wide hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full py-4 bg-accent flex items-center justify-center px-4">
        <p className="text-sm text-white/90 font-medium">
          © 2025 FinEase Research Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;