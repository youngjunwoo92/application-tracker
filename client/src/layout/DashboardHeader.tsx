import ThemeSwitcher from '@/components/ThemeSwitcher';
import { size } from '@/theme/styles';

export default function DashboardHeader() {
  return (
    <header
      className={`dark:border-divider-dark w-full shadow-md shadow-sidebar-shade dark:border-b-2 dark:shadow-none ${size.header.formatted} flex justify-between bg-sidebar-bg`}
    >
      <div
        className={`flex ${size.maxSectionWidth.formatted} mx-auto items-center justify-between p-2`}
      >
        <nav className="ml-auto">
          <ul className="flex items-center gap-2">
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
