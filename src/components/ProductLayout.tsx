import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProductLayoutProps {
  children: React.ReactNode;
}

const ProductLayout = ({ children }: ProductLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default ProductLayout;
