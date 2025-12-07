import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Send, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/finease-logo.png";

const Footer = () => {
  const services = [
    { name: "IPO", href: "/ipo" },
    { name: "Bonds", href: "/bonds" },
    { name: "Fixed Deposits", href: "/fds" },
    { name: "NPS", href: "/nps" },
    { name: "Calculators", href: "/calculators" },
  ];

  const company = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ];

  const legal = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Risk Disclosure", href: "#" },
    { name: "Grievance Redressal", href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer id="contact" className="w-full bg-secondary text-white font-sans overflow-hidden">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">Stay Updated</h3>
              <p className="text-white/70">Get the latest investment opportunities and market insights</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl w-full lg:w-80"
              />
              <Button className="bg-white text-secondary hover:bg-white/90 h-12 px-6 rounded-xl font-bold">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="FinEase" className="h-10 brightness-0 invert" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Your trusted digital wealth platform for IPOs, Bonds, Fixed Deposits, and NPS investments. 
              Start your investment journey with us today.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  36, Third floor, Palm spring complex,<br />
                  Ellisbridge, Ahmedabad-380006, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:fineaseresearchpvtltd@gmail.com" className="text-sm text-white/70 hover:text-white transition-colors">
                  fineaseresearchpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a href="tel:079-2666588" className="text-sm text-white/70 hover:text-white transition-colors">
                  079-2666588
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-white/70 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider font-display">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 font-medium hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regulatory Info */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p className="text-center md:text-left">
              FinEase Research Pvt. Ltd. is a SEBI registered investment advisor. Investments are subject to market risks. 
              Please read all scheme related documents carefully before investing.
            </p>
            <div className="flex items-center gap-4">
              <span>SEBI Reg. No: INH000000XXX</span>
              <span className="hidden md:inline">|</span>
              <span>CIN: U67190GJ2020PTCXXXXXX</span>
            </div>
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