'use client';

import { Home, FileText, User, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen p-6 border-r bg-white shadow-sm">
      <div className="text-2xl font-bold mb-6">Admin Panel</div>

      <nav className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">📚 Post</p>
          <div className="space-y-1">
            {postMenu.map((item) => (
              <Link href={item.href} key={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">👤 User</p>
          <div className="space-y-1">
            {userMenu.map((item) => (
              <Link href={item.href} key={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
