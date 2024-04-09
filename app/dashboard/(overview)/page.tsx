import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { fetchApplicationsByUserId, getUser } from "@/app/lib/data";
import Dashboard from "@/app/ui/dashboard/dashboard";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  const user = await getUser(session?.user?.email!);

  const applications = await fetchApplicationsByUserId(user?.id!);

  return (
    <main className="w-full">
      <Suspense fallback={<CardsSkeleton />}>
        <Dashboard user={user} applications={applications} />
      </Suspense>
    </main>
  );
}
