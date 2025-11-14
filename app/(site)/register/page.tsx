import RegisterUser from "@/app/ui/forms/register-user";
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";
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
    <main className="login-page">
      <div className="login-container">
        <PurpleBlob className="blob-purple" />
        <AzureBlob className="blob-azure" />

        <section className="login-content">
          <div className="login-form-wrapper">
            <h1 className="text-[2rem] font-bold text-center">
              New User Sign Up
            </h1>

            <RegisterUser />

            <div className="login-signup-link mt-4">
              <p className="login-signup-text">
                Returning user?{" "}
                <Link
                  className="login-signup-anchor text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                  href="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <BackButton className="login-back-button" href="/">
              Back
            </BackButton>
          </div>
        </section>
      </div>
    </main>
  );
}
