import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright"; // 1

test.describe("accessibility tests", () => {
  test.describe("homepage", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Résumé Wrangler/);
    });
  });

  test.describe("blog", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/blog"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/blog");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Blog/);
    });
  });

  test.describe("job boards", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/job-boards"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/job-boards");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Job Boards/);
    });
  });

  test.describe("login", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/login"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/login");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Login/);
    });
  });

  test.describe("register", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/register"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/register");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Signup/);
    });
  });
  test.describe("resume templates", () => {
    // 2
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }: {
      page: any;
    }) => {
      await page.goto("/resume-templates"); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });

    test("has title", async ({ page }) => {
      await page.goto("/resume-templates");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Resume Templates/);
    });
  });
});
