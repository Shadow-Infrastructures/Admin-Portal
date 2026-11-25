import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout({ active, onNavigate, sidebarOpen, onMenuClick, onCloseSidebar, children }) {
  return (
    <div className="flex min-h-screen bg-brand-cream">
      <Sidebar
        active={active}
        onNavigate={onNavigate}
        open={sidebarOpen}
        onClose={onCloseSidebar}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header page={active} onMenuClick={onMenuClick} />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
