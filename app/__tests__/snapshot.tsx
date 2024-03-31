import { render } from "@testing-library/react";
import Test from "../testpage/page";

it("renders homepage unchanged", () => {
  const { container } = render(<Test />);
  expect(container).toMatchSnapshot();
});
