import RegisterUser from "../ui/forms/register-user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// export default async function RegisterPage() {
//   const session = await auth();
//   if (session) {
//     redirect("/dashboard");
//   }
//   return <RegisterUser />;
// }

import SigninNavBar from "../ui/signin/signin-navbar";
import SigninFooter from "../ui/signin/signin-footer";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SigninNavBar />
      <RegisterUser />
      <SigninFooter />
    </div>
  );
}
