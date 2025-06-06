import { test, expect } from "@sand4rt/experimental-ct-web";
import { FeatureViewerComponent } from "../../src/feature-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { Feature } from "../../src/feature-viewer/models";

test.describe("feature-viewer", async () => {

  test.beforeEach(async ({ router }) => {
    await useRoutes(router, [
      new FileRoute("/1.feature", new URL("1.feature", import.meta.url)),
      new FileRoute("/2.feature", new URL("2.feature", import.meta.url))
    ]);
  });

  test("can load feature file", async ({ mount }) => {
    const component = await mount(FeatureViewerComponent, {
      props: {
        src: "1.feature"
      }
    });

    // Check feature title
    await expect(component).toContainText("Feature: User Profile Management");

    // Check background
    await expect(component).toContainText("Background: User is logged in");
    await expect(component).toContainText("Given a user with username \"testuser\" and password \"securepass\"");
    await expect(component).toContainText("And the user is logged in");

    // Check scenarios
    await expect(component).toContainText("Scenario: Update user profile information");
    await expect(component).toContainText("Scenario Outline: Update contact information for <contact_type> (2)");
    await expect(component).toContainText("Scenario: Update contact information for email");
    await expect(component).toContainText("Scenario: Update contact information for phone");
    await expect(component).toContainText("Scenario: Verify address details");
    await expect(component).toContainText("Scenario: Change password");
  });

  test("can load sample feature file", async ({ mount }) => {
    const component = await mount(FeatureViewerComponent, {
      props: {
        src: "2.feature"
      }
    });

    // Check feature title and description
    await expect(component).toContainText("Feature: Manage User Profile");
    await expect(component).toContainText("As a user");
    await expect(component).toContainText("I want to manage my profile information");
    await expect(component).toContainText("So that I can keep my account up to date");

    // Check background
    await expect(component).toContainText("Background:");
    await expect(component).toContainText("Given I am logged in");
    await expect(component).toContainText("And I am on the profile page");

    // Check scenarios and tags
    await expect(component).toContainText("@smoke");
    await expect(component).toContainText("@regression");
    await expect(component).toContainText("Scenario Outline: Update profile with different data for <name> and <email> (2)");
    await expect(component).toContainText("Scenario: Update profile with different data for Jane Doe and jane.doe@example.com");
    await expect(component).toContainText("Scenario: Update profile with different data for Bob Smith and bob.smith@example.com");
    await expect(component).toContainText("Scenario: Upload profile picture");
  });

  test("can change src between feature files", async ({ mount }) => {
    const component = await mount(FeatureViewerComponent, {
      props: {
        src: "1.feature"
      }
    });

    // Check initial content
    await expect(component).toContainText("Feature: User Profile Management");
    await expect(component).toContainText("Background: User is logged in");
    await expect(component).toContainText("Scenario Outline: Update contact information for <contact_type> (2)");
    await expect(component).not.toContainText("As a user");

    // Change to sample feature
    await component.update({
      props: {
        src: "2.feature"
      }
    });

    // Check new content
    await expect(component).toContainText("Feature: User Profile Management");
    await expect(component).toContainText("As a user");
    await expect(component).toContainText("@smoke");
    await expect(component).toContainText("Scenario Outline: Update profile with different data for <name> and <email> (2)");
    await expect(component).not.toContainText("Background: User is logged in");
  });

  test("handles invalid feature file", async ({ mount }) => {
    const component = await mount(FeatureViewerComponent, {
      props: {
        src: "nonexistent.feature"
      }
    });

    await expect(component).toContainText("Failed to load feature file");
  });

  test("handles empty src", async ({ mount }) => {
    const component = await mount(FeatureViewerComponent, {
      props: {
        src: ""
      }
    });

    // Component should render nothing when src is empty
    await expect(component.locator(".feature")).toHaveCount(0);
  });

  test("can load feature object directly", async ({ mount }) => {
    const feature: Feature = {
      keyword: "Feature",
      name: "Test Feature",
      description: "Test Description",
      language: "en",
      tags: ["@test"],
      scenarios: [
        {
          keyword: "Scenario",
          name: "Test Scenario",
          steps: [
            {
              keyword: "Given",
              text: "test step"
            }
          ]
        }
      ]
    };

    const component = await mount(FeatureViewerComponent, {
      props: {
        feature: feature
      }
    });

    await expect(component).toContainText("Feature: Test Feature");
    await expect(component).toContainText("Test Description");
    await expect(component).toContainText("@test");
    await expect(component).toContainText("Scenario: Test Scenario");
    await expect(component).toContainText("Given");
    await expect(component).toContainText("test step");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
