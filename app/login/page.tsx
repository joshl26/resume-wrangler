import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-backgroundLight">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 ">
        <div className="flex h-20 w-full items-end rounded-lg bg-amber-400 p-3 md:h-20 ">
          <div className="w-full text-center font-bold text-[2.5rem]">
            Resume Wrangler
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
