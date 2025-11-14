// app/layout.tsx
import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth"; // server-side helper that calls getServerSession
import Providers from "@/app/(dashboard)/dashboard/providers"; // client wrapper

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Do NOT mutate session.user (may require `id` per your types).
  // Pass the original session through to Providers/SideNav.
  // If you ever need a smaller "public" session for client code, create a new object
  // (do not overwrite `session.user`) and ensure types align with your component props.

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
