import { ArrowLeftRight } from 'lucide-react';
import {
  LayoutDashboard, Home, Landmark, TrendingUp, Users, Building2,
  FileText, Settings, Wallet, ScrollText, ShieldCheck,
} from 'lucide-react';

const map = {
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

export function Icon({ name, className }) {
  const Cmp = map[name] ?? LayoutDashboard;
  return <Cmp className={className} />;
}
