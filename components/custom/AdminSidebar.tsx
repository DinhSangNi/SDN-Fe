'use client';

import {
  Home,
  FileText,
  User,
  PlusCircle,
  Building,
  Calendar,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  Users,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  description?: string;
};

type MenuSection = {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  sectionKey: string;
  color?: string;
};

const postMenu: MenuItem[] = [
  {
    label: 'Post Management',
    href: '/admin/post',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Manage all blog posts and articles',
  },
  {
    label: 'Create Post',
    href: '/admin/post/create',
    icon: <PlusCircle className="w-4 h-4" />,
    description: 'Write and publish new content',
  },
];

const userMenu: MenuItem[] = [
  {
    label: 'User Management',
    href: '/admin/user',
    icon: <Users className="w-4 h-4" />,
    description: 'Manage user accounts and permissions',
  },
  {
    label: 'Create User',
    href: '/admin/user/create',
    icon: <PlusCircle className="w-4 h-4" />,
    description: 'Add new user accounts',
  },
];

const labBookingMenu: MenuItem[] = [
  {
    label: 'Lab Booking Management',
    href: '/admin/lab-booking',
    icon: <Calendar className="w-4 h-4" />,
    description: 'Manage lab reservations and schedules',
    badge: 'New',
  },
  {
    label: 'Booking Dashboard',
    href: '/admin/booking-dashboard',
    icon: <BarChart3 className="w-4 h-4" />,
    description: 'View booking analytics and reports',
  },
];

const labMenu: MenuItem[] = [
  {
    label: 'Lab Management',
    href: '/admin/lab',
    icon: <Building className="w-4 h-4" />,
    description: 'Manage laboratory facilities',
  },
  {
    label: 'Create Lab',
    href: '/admin/lab/create',
    icon: <PlusCircle className="w-4 h-4" />,
    description: 'Add new laboratory spaces',
  },
];

const menuSections: MenuSection[] = [
  {
    title: 'Lab Booking',
    icon: <Calendar className="w-5 h-5" />,
    items: labBookingMenu,
    sectionKey: 'lab-booking',
    color: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    title: 'Content',
    icon: <FileText className="w-5 h-5" />,
    items: postMenu,
    sectionKey: 'post',
    color: 'from-green-500/10 to-emerald-500/10',
  },
  {
    title: 'Users',
    icon: <User className="w-5 h-5" />,
    items: userMenu,
    sectionKey: 'user',
    color: 'from-purple-500/10 to-pink-500/10',
  },
  {
    title: 'Facilities',
    icon: <Building className="w-5 h-5" />,
    items: labMenu,
    sectionKey: 'lab',
    color: 'from-orange-500/10 to-red-500/10',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(['lab-booking', 'post', 'user', 'lab']);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (href: string) => pathname === href;

  const isParentActive = (items: MenuItem[]) =>
    items.some(item => pathname === item.href);

  const getActiveCount = () => {
    const totalItems = menuSections.reduce((acc, section) => acc + section.items.length, 0);
    return totalItems;
  };

  const renderMenuSection = (
    title: string,
    icon: React.ReactNode,
    items: MenuItem[],
    sectionKey: string
  ) => (
    <Collapsible
      open={openSections.includes(sectionKey)}
      onOpenChange={() => toggleSection(sectionKey)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-2 h-auto hover:bg-gray-100 rounded-md"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-semibold text-gray-700">{title}</span>
          </div>
          {openSections.includes(sectionKey) ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 mt-2">
        {items.map((item) => (
          <Link href={item.href} key={item.href}>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-2 ml-4 transition-all duration-200 ${isActive(item.href)
                ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-sm'
                : 'hover:bg-muted hover:translate-x-1'
                }`}
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <aside className="w-64 h-screen bg-card border-r border-border shadow-lg transition-all duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="text-2xl font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            Admin Panel
          </div>
          <p className="text-sm text-muted-foreground mt-1">Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            {renderMenuSection('Lab Booking', <Calendar className="w-5 h-5" />, labBookingMenu, 'lab-booking')}
            {renderMenuSection('Post', <FileText className="w-5 h-5" />, postMenu, 'post')}
            {renderMenuSection('User', <User className="w-5 h-5" />, userMenu, 'user')}
            {renderMenuSection('Lab', <Building className="w-5 h-5" />, labMenu, 'lab')}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground text-center">
            © 2025 Admin Dashboard
          </div>
        </div>
      </div>
    </aside>
  );
}
