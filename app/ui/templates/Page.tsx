import "./Page.css";

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => (
  <div
    style={{
      fontSize: "0",
      width: "8.5in",
      height: "11.2in",
      backgroundColor: "white",
      padding: "32px",
      margin: "-6px 0px 0px -6px",
      border: "red 1px solid",
    }}
  >
    {children}
  </div>
);

export default Page;
