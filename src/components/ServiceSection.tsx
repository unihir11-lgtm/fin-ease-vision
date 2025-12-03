import { Button } from "@/components/ui/button";

interface ServiceSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  id?: string;
}

const ServiceSection = ({ title, description, image, imageAlt, reverse = false, id }: ServiceSectionProps) => {
  return (
    <section id={id} className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-12`}>
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full max-w-[280px] md:max-w-xs object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3 md:space-y-4 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-secondary font-['Raleway']">
              {title}
            </h3>
            <p className="text-sm md:text-base text-muted leading-relaxed max-w-md mx-auto lg:mx-0">
              {description}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 h-10">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
