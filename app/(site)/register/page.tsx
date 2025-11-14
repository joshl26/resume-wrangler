import RegisterUser from "@/app/ui/forms/register-user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata = {
  title: "Signup",
  description: "New user signup page",
};

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main>
      <RegisterUser />
    </main>
  );
}
