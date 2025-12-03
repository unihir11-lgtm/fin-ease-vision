import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const services = ["IPO", "Bond", "FD", "NPS", "Screener"];

  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Instagram", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border/50 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand & Contact Info */}
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-secondary text-xl font-bold">FinEase</span>
            </a>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground/60 leading-relaxed">
                  36, Third floor, Palm spring<br />
                  complex, Ellisbridge, Ahmedabad-380006, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:fineaseresearchpvtltd@gmail.com" className="text-sm text-foreground/60 hover:text-secondary transition-colors">
                  fineaseresearchpvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:079-2666588" className="text-sm text-foreground/60 hover:text-secondary transition-colors">
                  079-2666588
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-border transition-colors"
                  aria-label={social.name}
                >
                  <div className="w-4 h-4 rounded-full bg-foreground/40" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-bold text-secondary mb-6 text-base">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-secondary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div>
            <h4 className="font-bold text-secondary mb-6 text-base">
              Quick Contact
            </h4>
            <form className="space-y-4">
              <div className="px-4 py-3 rounded-xl bg-background border border-border/50">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-foreground/40 outline-none"
                />
              </div>
              <div className="px-4 py-3 rounded-xl bg-background border border-border/50">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-foreground/40 outline-none"
                />
              </div>
              <div className="px-4 py-3 rounded-xl bg-background border border-border/50">
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-foreground/40 outline-none resize-none"
                />
              </div>
              <Button variant="default" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-foreground/40">
            Copyright © 2024 FinEase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
