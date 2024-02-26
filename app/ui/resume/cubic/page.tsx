import Page from "../../../page";

const Cubic = ({
  headingFont,
  bodyFont,
}: {
  bodyFont: string;
  headingFont: string;
}) => {
  return (
    <>
      <Page>
        <h1 className={headingFont}>{`Sample Heading Font: ${headingFont}`}</h1>
        <p className={bodyFont}>{`Sample Heading Font: ${bodyFont}`}</p>

        <p className="test">
          As you can see you can scroll without issues and select text.
        </p>
        <div
          style={{ width: "100px", height: "100px", backgroundColor: "red" }}
        ></div>
        <a href="http://www.google.ca">
          <p>Test Link</p>
        </a>
      </Page>
      <Page>
        <h1>Page 2</h1>
        <p>As you can see you can scroll without issues and select text.</p>
      </Page>
    </>
  );
};

export default Cubic;
