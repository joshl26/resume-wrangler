import LoginForm from "@/app/ui/forms/login";
import BackButton from "../ui/back-button";
import Link from "next/link";
import SigninNavBar from "../ui/signin/signin-navbar";
import SigninFooter from "../ui/signin/signin-footer";
import PurpleBlob from "../ui/landing/purple-blob";
import AzureBlob from "../ui/landing/azure-blob";
import Landing from "../landing/page";

export const metadata = {
  title: "Login",
  description: "Returning users login page",
};

export default function LoginPage() {
  return (
    <Landing>
      {" "}
      <div className="relative overflow-x-hidden h-screen">
        <PurpleBlob className={"w-[750px] h-[750px] -left-[500px]"} />
        <AzureBlob className={"w-[750px] h-[750px] -right-[450px]"} />
        {/* <SigninNavBar /> */}
        <section className="flex items-center justify-center h-screen ">
          <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 ">
            <LoginForm />
            <div className="flex flex-row m-auto">
              <p className="py-2 font-bold">
                New user?{" "}
                <Link
                  className="font-medium text-rose-800 hover:text-azure-radiance-500"
                  href="/register"
                >
                  Sign Up
                </Link>{" "}
              </p>
            </div>
            <BackButton className="text-center" href={"/"}>
              Back
            </BackButton>
          </div>
        </section>
        {/* <SigninFooter /> */}
      </div>
    </Landing>
  );
}
