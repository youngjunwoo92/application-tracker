import { Link, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { useMemo } from 'react';

import { LuHome } from 'react-icons/lu';
import { SlNote } from 'react-icons/sl';
import { LuFileQuestion } from 'react-icons/lu';

import Logo from '../../../../assets/logo/brand/logoIcon.svg?react';

const navItems = [
  { title: 'Home', path: '/dashboard', icon: <LuHome /> },
  { title: 'Applications', path: '/dashboard/applications', icon: <SlNote /> },
  {
    title: 'Interviews',
    path: '/dashboard/interviews',
    icon: <LuFileQuestion />,
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = useMemo(() => {
    return (path: string): boolean => {
      return pathname === path;
    };
  }, [pathname]);

  return (
    <aside className="dark:border-divider-dark h-full bg-sidebar-bg p-2 dark:border-r-2">
      <nav className="flex h-full flex-col">
        <div className="p-4">
          <Link
            to="/dashboard"
            className="gap-2 text-center text-2xl font-bold"
          >
            <Logo className="sm:hidden" width={40} height={40} />
            <span className=" hidden text-3xl text-text-primary transition-all sm:block">
              <span className="text-primary">i</span>applied
            </span>
          </Link>
        </div>
        <ul className="mt-4 flex flex-1 flex-col gap-2 px-3">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              item={navItem}
              isActive={isActive(navItem.path)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
