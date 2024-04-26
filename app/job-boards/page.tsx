import Landing from "../landing/page";
import JobBoards from "../ui/job-boards/JobBoards";

export const metadata = {
  title: "Job Boards",
  description: "Search through several job boards for postings",
};

export default function Page() {
  return (
    <Landing>
      <JobBoards />
    </Landing>
  );
}
