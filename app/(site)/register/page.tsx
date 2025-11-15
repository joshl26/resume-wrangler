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
    <main className="register-page pt-40">
      <div className="register-container">
        <PurpleBlob className="blob-purple" />
        <AzureBlob className="blob-azure" />

        <section className="register-content">
          <div className="register-form-wrapper">
            <h1 className="text-[2rem] font-bold text-center">
              New User Sign Up
            </h1>

            <RegisterUser />

            <div className="register-signup-link mt-4">
              <p className="register-signup-text">
                Returning user?{" "}
                <Link
                  className="register-signup-anchor text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                  href="/register"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <BackButton className="register-back-button" href="/">
              Back
            </BackButton>
          </div>
        </section>
      </div>
    </main>
  );
}
