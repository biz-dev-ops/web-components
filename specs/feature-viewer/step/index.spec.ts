import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { StepComponent } from "../../../src/feature-viewer/step";
import { Step } from "../../../src/feature-viewer/models";

test.describe("feature-step", async () => {
  const sampleStep: Step = {
    keyword: "Given",
    text: "the user is on the profile page"
  };

  const sampleStepWithTable: Step = {
    keyword: "Given",
    text: "the user profile contains the following address:",
    table: {
      header: ["field", "value"],
      rows: [
        ["street", "123 Main St"],
        ["city", "Anytown"],
        ["state", "CA"],
        ["zip", "90210"]
      ]
    }
  };

  test("renders basic step", async ({ mount }) => {
    const component = await mount(StepComponent, {
      props: {
        step: sampleStep
      }
    });

    await expect(component).toContainText("Given");
    await expect(component).toContainText("the user is on the profile page");
  });

  test("renders step with table", async ({ mount }) => {
    const component = await mount(StepComponent, {
      props: {
        step: sampleStepWithTable
      }
    });

    // Check step text
    await expect(component).toContainText("Given");
    await expect(component).toContainText("the user profile contains the following address:");

    // Check table header
    await expect(component).toContainText("field");
    await expect(component).toContainText("value");

    // Check table content
    await expect(component).toContainText("street");
    await expect(component).toContainText("123 Main St");
    await expect(component).toContainText("city");
    await expect(component).toContainText("Anytown");
    await expect(component).toContainText("state");
    await expect(component).toContainText("CA");
    await expect(component).toContainText("zip");
    await expect(component).toContainText("90210");
  });
});