import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Integrations"],
    Company: ["About", "Careers", "Press", "Contact"],
    Resources: ["Blog", "Help Center", "Guides", "API Docs"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-secondary text-xl font-bold">FinEase</span>
            </a>
            <p className="text-foreground/60 text-sm mb-6 max-w-xs">
              Simplifying financial management for individuals and businesses worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-foreground/60 hover:text-secondary hover:border-border transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-secondary mb-4 text-sm">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/60 hover:text-secondary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            © 2024 FinEase. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-foreground/40 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/40 hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
