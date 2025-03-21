import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { BackgroundComponent } from "../../../src/feature-viewer/background";
import { Background } from "../../../src/feature-viewer/models";

test.describe("feature-background", async () => {
  const sampleBackground: Background = {
    keyword: "Background",
    name: "User Profile Setup",
    steps: [
      {
        keyword: "Given",
        text: "the user is logged in"
      },
      {
        keyword: "And",
        text: "the user is on the profile page"
      }
    ]
  };

  test("renders background with title and steps", async ({ mount }) => {
    const component = await mount(BackgroundComponent, {
      props: {
        background: sampleBackground
      }
    });

    // Check title
    await expect(component).toContainText("Background: User Profile Setup");

    // Check steps
    await expect(component).toContainText("Given");
    await expect(component).toContainText("the user is logged in");
    await expect(component).toContainText("And");
    await expect(component).toContainText("the user is on the profile page");
  });

  test("renders steps in correct order", async ({ mount }) => {
    const component = await mount(BackgroundComponent, {
      props: {
        background: sampleBackground
      }
    });

    const steps = component.locator("feature-step");
    await expect(steps).toHaveCount(2);

    const firstStep = steps.first();
    await expect(firstStep).toContainText("Given");
    await expect(firstStep).toContainText("the user is logged in");

    const secondStep = steps.last();
    await expect(secondStep).toContainText("And");
    await expect(secondStep).toContainText("the user is on the profile page");
  });
});