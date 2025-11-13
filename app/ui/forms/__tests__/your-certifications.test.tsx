/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YourCertifications from "../your-certifications";
import * as actions from "@/app/lib/actions";
import type { UserCertifications, Resume, User } from "@/app/lib/definitions";

jest.mock("@/app/lib/actions", () => ({
  updateCertificationSectionTitle: jest.fn(),
  createCertification: jest.fn(),
  createResumeLine: jest.fn(),
  deleteResumeLine: jest.fn(),
  updateUserCertfication: jest.fn(),
  updateCertificationsSection: jest.fn(),
}));

// Mock the SubmitButton component (renders a plain button so role queries work)
jest.mock("@/app/ui/submit-button", () => ({
  SubmitButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe("YourCertifications", () => {
  const user = userEvent.setup();

  // Minimal mocks — we'll cast to the real types when rendering
  const mockUser = { id: "user1", name: "Test User" };
  const mockResume = {
    id: "resume1",
    custom_section_two_name: "Certifications",
  };
  const mockUserCertifications = [
    { id: "cert1", name: "AWS Certification", location: "Online" },
    { id: "cert2", name: "PMP", location: "Boston" },
  ];
  const mockCertificationResumeLines = [
    { id: "line1", name: "Selected Cert 1", location: "Location 1" },
  ];
  const mockSetShowCustomSectionTwo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // helper to render with casts to your real types
  function renderComponent(
    overrides: {
      userCertifications?: any;
      resume?: any;
      user?: any;
      showCustomSectionTwo?: string;
      certificationResumeLines?: any;
    } = {},
  ) {
    const uc = (overrides.userCertifications ??
      mockUserCertifications) as unknown as UserCertifications;
    const r = (overrides.resume ?? mockResume) as unknown as Resume;
    const u = (overrides.user ?? mockUser) as unknown as User;
    const show = overrides.showCustomSectionTwo ?? "true";
    const lines =
      overrides.certificationResumeLines ?? mockCertificationResumeLines;

    return render(
      <YourCertifications
        userCertifications={uc}
        resume={r}
        user={u}
        showCustomSectionTwo={show}
        setShowCustomSectionTwo={mockSetShowCustomSectionTwo}
        certificationResumeLines={lines}
      />,
    );
  }

  it("renders section title correctly", () => {
    renderComponent();

    const titles = screen.getAllByText(/Your\s+Certifications/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  it("shows section content when showCustomSectionTwo is true", () => {
    renderComponent();

    expect(screen.getByLabelText("Section Title")).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Add New\\s+${mockResume.custom_section_two_name}`, "i"),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Your\s+Certifications/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Selected Certifications/i)).toBeInTheDocument();
  });

  it("hides section content when showCustomSectionTwo is false", () => {
    renderComponent({ showCustomSectionTwo: "false" });

    expect(screen.queryByLabelText("Section Title")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        new RegExp(`Add New\\s+${mockResume.custom_section_two_name}`, "i"),
      ),
    ).not.toBeInTheDocument();
  });

  it("updates section title and shows save button", async () => {
    (
      actions.updateCertificationSectionTitle as jest.Mock
    ).mockResolvedValueOnce({});

    renderComponent();

    const titleInput = screen.getByLabelText("Section Title");
    await user.clear(titleInput);
    await user.type(titleInput, "New Title");

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("adds new certification and shows add button when location typed", async () => {
    renderComponent();

    const allNameInputs = screen.getAllByPlaceholderText(
      "Title, Activity, name, etc..",
    );
    const addNameInput = allNameInputs.find(
      (el) => (el as HTMLInputElement).value === "",
    );
    if (!addNameInput)
      throw new Error("Add-new certification name input not found");

    const allLocationInputs = screen.getAllByPlaceholderText("Location");
    const addLocationInput = allLocationInputs.find(
      (el) => (el as HTMLInputElement).value === "",
    );
    if (!addLocationInput)
      throw new Error("Add-new certification location input not found");

    await user.type(addNameInput, "New Certification");
    await user.type(addLocationInput, "New Location"); // triggers newCertificationOnChangeHandler

    expect(
      screen.getByRole("button", { name: /add new entry/i }),
    ).toBeInTheDocument();
  });

  it("shows save button when editing existing certification", async () => {
    renderComponent();

    const selectedNameInputs = screen.getAllByDisplayValue("Selected Cert 1");
    const selectedNameInput = selectedNameInputs[0];
    if (!selectedNameInput)
      throw new Error("Selected certification name input not found");

    await user.clear(selectedNameInput);
    await user.type(selectedNameInput, "Updated Certification");

    expect(
      screen.getByRole("button", { name: /save change/i }),
    ).toBeInTheDocument();
  });

  it("toggles section visibility checkbox", async () => {
    (actions.updateCertificationsSection as jest.Mock).mockResolvedValueOnce(
      {},
    );

    renderComponent();

    const checkbox = screen.getByTitle("Show Certifications Section");
    await user.click(checkbox);

    expect(mockSetShowCustomSectionTwo).toHaveBeenCalledWith("false");
  });

  it("calls updateCertificationSectionTitle action on form submit", async () => {
    (
      actions.updateCertificationSectionTitle as jest.Mock
    ).mockResolvedValueOnce({});

    renderComponent();

    const titleInput = screen.getByLabelText("Section Title");
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");

    const saveButton = screen.getByRole("button", { name: /save change/i });
    await user.click(saveButton);

    await waitFor(() =>
      expect(actions.updateCertificationSectionTitle).toHaveBeenCalled(),
    );
  });

  it("calls createCertification action on form submit", async () => {
    (actions.createCertification as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    // find the add-new input (empty value) and the matching empty location input
    const allNameInputs = screen.getAllByPlaceholderText(
      "Title, Activity, name, etc..",
    );
    const addNameInput = allNameInputs.find(
      (el) => (el as HTMLInputElement).value === "",
    );
    if (!addNameInput)
      throw new Error("Add-new certification name input not found");

    const allLocationInputs = screen.getAllByPlaceholderText("Location");
    const addLocationInput = allLocationInputs.find(
      (el) => (el as HTMLInputElement).value === "",
    );
    if (!addLocationInput)
      throw new Error("Add-new certification location input not found");

    await user.type(addNameInput, "New Certification");
    await user.type(addLocationInput, "New Location");

    const addNewButton = screen.getByRole("button", { name: /add new entry/i });
    await user.click(addNewButton);

    await waitFor(() => expect(actions.createCertification).toHaveBeenCalled());
  });

  it("calls createResumeLine action when adding certification to resume", async () => {
    (actions.createResumeLine as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    const awsItem = screen.getByText("AWS Certification").closest("li");
    if (!awsItem) throw new Error("AWS list item not found");

    const { getByRole: getByRoleInAws } = within(awsItem);
    const addButton = getByRoleInAws("button", { name: /add/i });
    await user.click(addButton);

    await waitFor(() => expect(actions.createResumeLine).toHaveBeenCalled());
  });

  it("calls deleteResumeLine action when removing certification from resume", async () => {
    (actions.deleteResumeLine as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    const selectedItem = screen.getByText("Selected Cert 1").closest("li");
    if (!selectedItem)
      throw new Error("Selected certification list item not found");

    const { getByRole: getByRoleInSelected } = within(selectedItem);
    const removeButton = getByRoleInSelected("button", { name: /remove/i });
    await user.click(removeButton);

    await waitFor(() => expect(actions.deleteResumeLine).toHaveBeenCalled());
  });

  it("calls updateUserCertfication action on form submit", async () => {
    (actions.updateUserCertfication as jest.Mock).mockResolvedValueOnce({});

    renderComponent();

    const selectedNameInputs = screen.getAllByDisplayValue("Selected Cert 1");
    const selectedNameInput = selectedNameInputs[0];
    if (!selectedNameInput)
      throw new Error("Selected certification name input not found");

    await user.clear(selectedNameInput);
    await user.type(selectedNameInput, "Updated Certification");

    const saveButton = screen.getByRole("button", { name: /save change/i });
    await user.click(saveButton);

    await waitFor(() =>
      expect(actions.updateUserCertfication).toHaveBeenCalled(),
    );
  });

  it("calls updateCertificationsSection action on checkbox change", async () => {
    (actions.updateCertificationsSection as jest.Mock).mockResolvedValueOnce(
      {},
    );

    renderComponent();

    const checkbox = screen.getByTitle("Show Certifications Section");
    await user.click(checkbox);

    const saveButton = screen.getByRole("button", { name: /save change/i });
    await user.click(saveButton);

    await waitFor(() =>
      expect(actions.updateCertificationsSection).toHaveBeenCalled(),
    );
  });

  it("displays user certifications list", () => {
    renderComponent();

    expect(screen.getByText("AWS Certification")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("PMP")).toBeInTheDocument();
    expect(screen.getByText("Boston")).toBeInTheDocument();
  });

  it("displays selected certifications list", () => {
    renderComponent();

    expect(screen.getByText("Selected Cert 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Location 1")).toBeInTheDocument();
  });

  it("handles empty certifications lists", () => {
    renderComponent({ userCertifications: [], certificationResumeLines: [] });

    expect(screen.queryByText("AWS Certification")).not.toBeInTheDocument();
    expect(screen.queryByText("Selected Cert 1")).not.toBeInTheDocument();
  });
});
