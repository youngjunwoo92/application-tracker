import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
  isActive: boolean;
};

export default function SidebarItem({ item, isActive }: Props) {
  const { path, title, icon } = item;

  return (
    <li
      className={`flex items-center rounded-md p-3 font-semibold transition-colors ${
        isActive
          ? 'bg-sidebar-active text-text-primary'
          : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      <Link
        to={path}
        className="flex aspect-square h-full w-full items-center justify-center sm:aspect-auto sm:justify-start sm:gap-4"
      >
        <span className="sm:text-md text-2xl">{icon}</span>
        <span className="invisible w-0 sm:visible sm:w-32">{title}</span>
      </Link>
    </li>
  );
}
