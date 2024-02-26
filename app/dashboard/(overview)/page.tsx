import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <Suspense fallback={<CardsSkeleton />}>
          {/* <CardWrapper /> */}
        </Suspense>
      </div>
    </main>
  );
}
