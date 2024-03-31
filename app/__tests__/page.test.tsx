import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Test from "../testpage/page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Test />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
