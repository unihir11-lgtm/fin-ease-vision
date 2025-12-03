import aboutIllustration from "@/assets/about-illustration.png";

const AboutFinease = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary font-['Raleway']">
              About Finease
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                FinEase simplifies wealth creation with a multi-asset investment platform offering opportunities in Equity, Mutual Fund, Bond, IPO, FD, Digital Gold, NPS, and Unlisted Shares.
              </p>
              <p>
                We simplify investing by providing accessible, transparent analytics and financial information, empowering you to confidently navigate your financial journey and achieve lasting success.
              </p>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <img 
              src={aboutIllustration} 
              alt="About Finease illustration" 
              className="w-full max-w-md object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinease;
