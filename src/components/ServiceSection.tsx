import { Button } from "@/components/ui/button";

interface ServiceSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const ServiceSection = ({ title, description, image, imageAlt, reverse = false }: ServiceSectionProps) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}>
          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-secondary font-['Raleway']">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
