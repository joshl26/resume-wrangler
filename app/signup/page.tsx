import AcmeLogo from "@/app/ui/acme-logo";
import SignupForm from "@/app/ui/signup-form";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-slate-400 p-3 md:h-20 ">
          <div className="w-full text-white text-center">
            <AcmeLogo />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
