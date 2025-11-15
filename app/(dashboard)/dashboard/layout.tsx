// app/(dashboard)/layout.tsx
import { Suspense } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";
import Providers from "@/app/(dashboard)/dashboard/providers";

// Loading skeleton for SideNav
function SideNavSkeleton() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-slate-100 dark:bg-slate-900 animate-pulse">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-200 dark:bg-slate-800 p-4" />
      <div className="flex grow flex-col justify-between space-y-2">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-md bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
        <div className="h-12 rounded-md bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

// Loading skeleton for main content
function ContentSkeleton() {
  return (
    <div className="flex-1 p-6 md:p-12 animate-pulse">
      <div className="mb-4 h-8 w-64 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-4">
        <div className="h-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Optionally redirect if no session
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <Providers session={session}>
      <div className="flex h-screen w-screen flex-col overflow-hidden md:flex-row">
        {/* Sidebar - Fixed width on desktop, collapsible on mobile */}
        <aside className="flex-none md:w-64 lg:w-72">
          <Suspense fallback={<SideNavSkeleton />}>
            <SideNav session={session} />
          </Suspense>
        </aside>

        {/* Main content area - Scrollable */}
        <main className="flex-1 overflow-y-auto pt-5">
          <div className="mx-auto max-w-7xl">
            <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
          </div>
        </main>
      </div>
    </Providers>
  );
}
