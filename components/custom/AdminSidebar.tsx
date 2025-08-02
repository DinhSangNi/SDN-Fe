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
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const postMenu: MenuItem[] = [
  {
    label: 'Post management',
    href: '/admin/post',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: 'Create post',
    href: '/admin/post/create',
    icon: <PlusCircle className="w-4 h-4" />,
  },
];

const userMenu: MenuItem[] = [
  {
    label: 'User management',
    href: '/admin/user',
    icon: <User className="w-4 h-4" />,
  },
  {
    label: 'Create user',
    href: '/admin/user/create',
    icon: <PlusCircle className="w-4 h-4" />,
  },
];

const labBookingMenu: MenuItem[] = [
  {
    label: 'Lab Booking management',
    href: '/admin/lab-booking',
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    label: 'Booking Dashboard',
    href: '/admin/booking-dashboard',
    icon: <LayoutDashboard className='w-4 h-4' />,
  },
];

const labMenu: MenuItem[] = [
  {
    label: 'Lab management',
    href: '/admin/lab',
    icon: <Building className="w-4 h-4" />,
  },
  {
    label: 'Create Lab',
    href: '/admin/lab/create',
    icon: <PlusCircle className="w-4 h-4" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(['post', 'user', 'lab-booking', 'lab']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (href: string) => pathname === href;

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
