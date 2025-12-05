import { 
  Wallet, Building, BookOpen, Zap, Map, Train, 
  Building2, Landmark, Mountain, Trees, Banknote,
  LucideIcon
} from "lucide-react";

type BondIconType = "wallet" | "building" | "book" | "zap" | "map" | "train";
type FDIconType = "building2" | "landmark" | "mountain" | "trees" | "building" | "banknote";

interface ProviderIconProps {
  iconType: BondIconType | FDIconType;
  className?: string;
  size?: number;
}

const iconMap: Record<BondIconType | FDIconType, LucideIcon> = {
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
};

export const ProviderIcon = ({ iconType, className = "", size = 24 }: ProviderIconProps) => {
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
    NBFC: { bg: "bg-amber-100", text: "text-amber-600" },
    "Small Finance Bank": { bg: "bg-teal-100", text: "text-teal-600" },
    "Scheduled Commercial Bank": { bg: "bg-indigo-100", text: "text-indigo-600" },
  };
  return colorMap[type] || { bg: "bg-primary/10", text: "text-primary" };
};
