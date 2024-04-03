import { lusitana } from "@/app/ui/fonts";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-10`}
    >
      <p className="text-[35px] font-bold text-black ">Resume Wrangler</p>
    </div>
  );
}
