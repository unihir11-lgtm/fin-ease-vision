import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  id?: string;
  href?: string;
  features?: string[];
}

const ServiceSection = ({ 
  title, 
  description, 
  image, 
  imageAlt, 
  reverse = false, 
  id,
  href = "#",
  features = []
}: ServiceSectionProps) => {
  return (
    <section id={id} className={`py-16 md:py-20 ${reverse ? 'bg-muted/20' : 'bg-background'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
          {/* Image */}
          <div className="flex-1 flex justify-center relative">
            <div className={`absolute inset-0 ${reverse ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'} from-primary/5 to-transparent rounded-full blur-3xl`} />
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full max-w-xs md:max-w-sm object-contain relative z-10 drop-shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
              {title}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-secondary font-display">
              Invest in {title}
            </h3>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              {description}
            </p>
            
            {features.length > 0 && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            
            <div className="pt-2">
              <Link to={href}>
                <Button variant="finease" size="lg" className="gap-2">
                  Explore {title} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
