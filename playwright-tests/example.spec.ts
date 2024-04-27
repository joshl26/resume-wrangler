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

  // test.describe("job boards", () => {
  //   // 2
  //   test("should not have any automatically detectable accessibility issues", async ({
  //     page,
  //   }: {
  //     page: any;
  //   }) => {
  //     await page.goto("/job-boards"); // 3

  //     const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

  //     expect(accessibilityScanResults.violations).toEqual([]); // 5
  //   });

  //   test("has title", async ({ page }) => {
  //     await page.goto("/Job Boards");

  //     // Expect a title "to contain" a substring.
  //     await expect(page).toHaveTitle(/Blog/);
  //   });
  // });

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

  // test("should not have any automatically detectable WCAG A or AA violations", async ({
  //   page,
  // }: {
  //   page: any;
  // }) => {
  //   await page.goto("/");

  //   const accessibilityScanResults = await new AxeBuilder({ page })
  //     .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  //     .analyze();

  //   // //Attached the violations to the test report
  //   // await testInfo.attach("accessibility-scan-results", {
  //   //   body: JSON.stringify(accessibilityScanResults.violations, null, 2),
  //   //   contentType: "application/json",
  //   // });

  //   // //Console log the violations
  //   // let violation = accessibilityScanResults.violations;
  //   // violation.forEach(function (entry) {
  //   //   console.log(entry.impact + " " + entry.description);
  //   // });

  //   expect(accessibilityScanResults.violations).toEqual([]);
  // });
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
