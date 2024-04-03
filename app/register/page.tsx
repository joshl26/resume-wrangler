import RegisterUser from "../ui/forms/register-user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return <RegisterUser />;
}
