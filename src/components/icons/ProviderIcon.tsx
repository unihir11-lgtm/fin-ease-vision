import { 
  Wallet, Building, BookOpen, Zap, Map, Train, 
  Building2, Landmark, Mountain, Trees, Banknote,
  Globe, Briefcase, Factory, Rocket, Bolt, Truck, Cpu,
  LucideIcon
} from "lucide-react";
import { useState } from "react";

type BondIconType = "wallet" | "building" | "book" | "zap" | "map" | "train";
type FDIconType = "building2" | "landmark" | "mountain" | "trees" | "building" | "banknote";
type IPOIconType = "globe" | "briefcase" | "factory" | "rocket" | "bolt" | "truck" | "cpu" | "building2" | "landmark";

interface ProviderIconProps {
  iconType: BondIconType | FDIconType | IPOIconType;
  logo?: string;
  name?: string;
  className?: string;
  size?: number;
}

const iconMap: Record<BondIconType | FDIconType | IPOIconType, LucideIcon> = {
  wallet: Wallet,
  building: Building,
  book: BookOpen,
  zap: Zap,
  map: Map,
  train: Train,
  building2: Building2,
  landmark: Landmark,
  mountain: Mountain,
  trees: Trees,
  banknote: Banknote,
  globe: Globe,
  briefcase: Briefcase,
  factory: Factory,
  rocket: Rocket,
  bolt: Bolt,
  truck: Truck,
  cpu: Cpu,
};

export const ProviderIcon = ({ iconType, logo, name, className = "", size = 24 }: ProviderIconProps) => {
  const [imgError, setImgError] = useState(false);
  
  // Try to show logo first if available and not errored
  if (logo && !imgError) {
    return (
      <img 
        src={logo} 
        alt={name || "Provider logo"}
        className={`object-contain rounded ${className}`}
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
      />
    );
  }
  
  // Fallback to icon
  const Icon = iconMap[iconType] || Building2;
  return <Icon className={className} size={size} />;
};

// Color variants for icons based on type
export const getIconColors = (type: string) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    Corporate: { bg: "bg-blue-100", text: "text-blue-600" },
    Government: { bg: "bg-emerald-100", text: "text-emerald-600" },
    PSU: { bg: "bg-purple-100", text: "text-purple-600" },
    "Tax-Free": { bg: "bg-green-100", text: "text-green-600" },
    "Sovereign Gold": { bg: "bg-yellow-100", text: "text-yellow-700" },
    "RBI Savings": { bg: "bg-orange-100", text: "text-orange-600" },
    NBFC: { bg: "bg-amber-100", text: "text-amber-600" },
    "Small Finance Bank": { bg: "bg-teal-100", text: "text-teal-600" },
    "Scheduled Commercial Bank": { bg: "bg-indigo-100", text: "text-indigo-600" },
  };
  return colorMap[type] || { bg: "bg-primary/10", text: "text-primary" };
};

// Investment method badge colors
export const getInvestmentMethodColor = (method: string) => {
  switch (method?.toLowerCase()) {
    case "lot based":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "direct":
      return "bg-green-100 text-green-700 border-green-200";
    case "both":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

// Market type badge colors
export const getMarketTypeColor = (market: string) => {
  switch (market?.toLowerCase()) {
    case "exchange traded":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "otc":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "both":
      return "bg-teal-100 text-teal-700 border-teal-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
