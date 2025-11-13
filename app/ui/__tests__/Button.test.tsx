/**
 * @jest-environment jsdom
 *
 * app/ui/__tests__/button.test.tsx
 *
 * Tests for the Button component
 *
 * - Verifies button renders with correct text/content
 * - Checks that default classes are applied
 * - Ensures additional classes passed via className prop are merged
 * - Validates that props like type, disabled, etc. are forwarded
 * - Confirms onClick handler is called when clicked
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("renders children inside the button", () => {
    const buttonText = "Click Me";
    render(<Button>{buttonText}</Button>);

    expect(
      screen.getByRole("button", { name: buttonText }),
    ).toBeInTheDocument();
  });

  it("applies default classes and merges additional classes", () => {
    const extraClass = "bg-blue-500";

    render(<Button className={extraClass}>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    // Check default classes (partial match to avoid brittleness)
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("rounded-lg");
    expect(button).toHaveClass("px-4");
    // Check merged additional class
    expect(button).toHaveClass("bg-blue-500");
  });

  it("forwards type and other HTML attributes", () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("defaults to type='button' if no type is provided", () => {
    render(<Button>Default Type</Button>);

    const button = screen.getByRole("button", { name: "Default Type" });
    expect(button).toHaveAttribute("type", "button");
  });
});
