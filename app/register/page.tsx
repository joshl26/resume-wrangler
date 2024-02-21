import getServerSession from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
// import { authConfig } from "@/auth.config";
import { auth } from "@/auth";

export default async function RegisterPage() {
  //   const session = await getServerSession(authConfig);
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <Form />;
}
