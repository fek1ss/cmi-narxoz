import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpenText,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleAlert,
  CircleHelp,
  Compass,
  Database,
  FlaskConical,
  GraduationCap,
  Handshake,
  Leaf,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Menu,
  MessageSquareText,
  Microscope,
  PenLine,
  Plus,
  ScanSearch,
  ShieldCheck,
  Target,
  Users,
  X,
  type LucideProps,
} from "lucide-react";

const icons = {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpenText,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleAlert,
  CircleHelp,
  Compass,
  Database,
  FlaskConical,
  GraduationCap,
  Handshake,
  Leaf,
  Lightbulb,
  ListChecks,
  LoaderCircle,
  Menu,
  MessageSquareText,
  Microscope,
  PenLine,
  Plus,
  ScanSearch,
  ShieldCheck,
  Target,
  Users,
  X,
};

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

const Icon = ({ name, fallback = "CircleAlert", ...props }: IconProps) => {
  const IconComponent = icons[name as IconName];

  if (!IconComponent) {
    const FallbackIcon = icons[fallback as IconName];
    if (!FallbackIcon) {
      return <span className="text-xs text-gray-400">[icon]</span>;
    }
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;
