import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { ScenarioComponent } from "../../../src/feature-viewer/scenario";
import { Scenario } from "../../../src/feature-viewer/models";

test.describe("feature-scenario", async () => {

  const sampleScenario: Scenario = {
    keyword: "Scenario",
    name: "Update User Profile",
    description: "As a user, I want to update my profile information",
    tags: ["@profile", "@update"],
    steps: [
      {
        keyword: "Given",
        text: "the user is on the profile page"
      },
      {
        keyword: "When",
        text: "the user updates their name to 'John Doe'"
      },
      {
        keyword: "Then",
        text: "the profile name should be updated to 'John Doe'"
      }
    ]
  };

  test("renders scenario with title, tags, description and steps", async ({ mount }) => {
    const component = await mount(ScenarioComponent, {
      props: {
        scenario: sampleScenario
      }
    });

    // Check title
    await expect(component).toContainText("Scenario: Update User Profile");

    // Check tags
    await expect(component).toContainText("@profile");
    await expect(component).toContainText("@update");

    // Check description
    await expect(component).toContainText("As a user, I want to update my profile information");

    // Check steps
    await expect(component).toContainText("Given");
    await expect(component).toContainText("the user is on the profile page");
    await expect(component).toContainText("When");
    await expect(component).toContainText("the user updates their name to 'John Doe'");
    await expect(component).toContainText("Then");
    await expect(component).toContainText("the profile name should be updated to 'John Doe'");
  });

  test("renders steps in correct order", async ({ mount }) => {
    const component = await mount(ScenarioComponent, {
      props: {
        scenario: sampleScenario
      }
    });

    const steps = component.locator("feature-step");
    await expect(steps).toHaveCount(3);

    const firstStep = steps.first();
    await expect(firstStep).toContainText("Given");
    await expect(firstStep).toContainText("the user is on the profile page");

    const secondStep = steps.nth(1);
    await expect(secondStep).toContainText("When");
    await expect(secondStep).toContainText("the user updates their name to 'John Doe'");

    const thirdStep = steps.last();
    await expect(thirdStep).toContainText("Then");
    await expect(thirdStep).toContainText("the profile name should be updated to 'John Doe'");
  });

  test("handles scenario without tags and description", async ({ mount }) => {
    const simpleScenario: Scenario = {
      keyword: "Scenario",
      name: "Simple Scenario",
      steps: [
        {
          keyword: "Given",
          text: "a simple step"
        }
      ]
    };

    const component = await mount(ScenarioComponent, {
      props: {
        scenario: simpleScenario
      }
    });

    await expect(component).toContainText("Scenario: Simple Scenario");
    await expect(component).toContainText("Given");
    await expect(component).toContainText("a simple step");

    // Verify tags and description are not rendered
    await expect(component.locator(".scenario__tags")).toHaveCount(0);
    await expect(component.locator(".scenario__description")).toHaveCount(0);
  });
});