import Sidebar from '@/pages/private/Dashboard/components/Sidebar';

import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import { Suspense } from 'react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="grow">
        <DashboardHeader />
        <main className="flex flex-wrap gap-2 overflow-y-scroll p-4">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
