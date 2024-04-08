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
import AzureBlob from "../ui/landing/azure-blob";

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="h-screen">
      <SigninNavBar />
      <RegisterUser />
      <SigninFooter />
    </div>
  );
}
