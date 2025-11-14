// app/auth/login/page.tsx
import LoginForm from "@/app/ui/forms/login";
import BackButton from "@/app/ui/back-button";
import Link from "next/link";
import PurpleBlob from "@/app/ui/landing/purple-blob";
import AzureBlob from "@/app/ui/landing/azure-blob";

export const metadata = {
  title: "Login",
  description: "Returning users login page",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-container">
        <PurpleBlob className="blob-purple" />
        <AzureBlob className="blob-azure" />
        <section className="login-content">
          <div className="login-form-wrapper">
            <LoginForm />
            <div className="login-signup-link">
              <p className="login-signup-text">
                New user?{" "}
                <Link
                  className="login-signup-anchor text-rose-800 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                  href="/register"
                >
                  Sign Up
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
