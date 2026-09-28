import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Cloud,
  FileText,
  Globe,
  LayoutGrid,
  LineChart,
  Lock,
  MapPin,
  Shield,
  Smartphone,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

/** Icon lookup for service and feature keys. Falls back to LayoutGrid. */

const ICONS: Record<string, LucideIcon> = {
  "tpa-services": LayoutGrid,
  "second-opinion": Stethoscope,
  "cost-containment": LineChart,
  software: Cloud,
  claims: ClipboardList,
  plans: FileText,
  team: Users,
  tailor: Globe,
  access: Stethoscope,
  review: FileText,
  cost: LineChart,
  risk: Shield,
  role: Users,
  membership: Wallet,
  network: MapPin,
  app: Smartphone,
  privacy: Lock,
};

export function featureIconForKey(key: string): LucideIcon {
  return ICONS[key] ?? LayoutGrid;
}
