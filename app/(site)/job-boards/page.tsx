import JobBoards from "@/app/ui/job-boards/JobBoards";

export const metadata = {
  title: "Job Boards",
  description: "Search through several job boards for postings",
};

export default function Page() {
  return (
    <main>
      <JobBoards />
    </main>
  );
}
