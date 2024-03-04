import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      // image: session.user.image,
    };
  }



  return (
    <SessionProvider session={session}>
      <div className="flex flex-col md:flex-row md:overflow-hidden h-screen w-screen">
        <div className="flex-none md:w-64">
          <SideNav session={session} />
        </div>
        <div className="pt-4 pb-4 w-full flex">{children}</div>
      </div>
    </SessionProvider>
  );
}
