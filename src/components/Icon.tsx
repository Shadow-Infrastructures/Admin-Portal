import { ArrowLeftRight } from 'lucide-react';
import {
  LayoutDashboard, Home, Landmark, TrendingUp, Users, Building2,
  FileText, Settings, Wallet, ScrollText, ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  LayoutDashboard,
  Home,
  Landmark,
  TrendingUp,
  Users,
  Building2,
  FileText,
  Settings,
  Wallet,
  ScrollText,
  ShieldCheck,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? LayoutDashboard;
  return <Cmp className={className} />;
}
