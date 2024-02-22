import Form from "./form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <Form />;
}
