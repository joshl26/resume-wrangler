// app/layout.tsx (or the layout file you showed)
import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";          // server-side helper that calls getServerSession
import  Providers  from "@/app/dashboard/providers"; // client wrapper
import WindowSize from "../hooks/WindowSize";

export default async function Layout({ children }: { children: React.ReactNode; }) {
  const session = await auth();

  // Optionally sanitize session.user
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <Providers session={session}>
      <div className="flex flex-col md:flex-row md:overflow-hidden h-screen w-screen">
        <div className="flex-none md:w-64">
          <SideNav session={session} />
        </div>
        <div className="w-full h-full flex py-3">{children}</div>
      </div>
    </Providers>
  );
}