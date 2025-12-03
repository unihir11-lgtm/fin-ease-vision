import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-32 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-8 lg:py-12">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-5 lg:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight font-['Raleway']">
              FinEase
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold leading-snug">
              Diversify Assets, Multiply<br className="hidden sm:block" />
              Opportunities, Grow Your Wealth
            </h2>
            
            <ul className="space-y-2.5 text-sm md:text-base text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                Simplify your investments across diverse asset classes.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                Multiply your financial opportunities effortlessly.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                Build wealth confidently with FinEase.
              </li>
            </ul>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img 
              src={heroIllustration} 
              alt="Investment illustration" 
              className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
