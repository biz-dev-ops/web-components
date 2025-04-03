import { test, expect } from "@sand4rt/experimental-ct-web";
import { BdoDriver } from "../../../src/shared/driver";
import { MockDrivenComponent } from "./MockDrivenComponent";

customElements.define('mock-driven', MockDrivenComponent);

test.describe("bdo-driver", () => {

  test("should render with custom drivers", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        drivers: [
          `<button slot="drivers" data-action="custom-action">Custom Action</button>`
        ],
        default: [
          `<mock-driven></mock-driven>`
        ]
      }
    });

    await expect(component).toBeVisible();
    await expect(component.locator("bdo-alert")).not.toBeVisible();
    await expect(component.getByText("Custom Action")).toBeVisible();
    await expect(component.getByText("Fullscreen")).not.toBeVisible();
    await expect(component.getByText("Zoom in")).not.toBeVisible();
    await expect(component.getByText("Zoom out")).not.toBeVisible();
    await expect(component.getByText("Zoom reset")).not.toBeVisible();
  });

  test("should render with default drivers when use-default-drivers is true", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        default: [
          `<mock-driven></mock-driven>`
        ]
      },
      props: {
        useDefaultDrivers: true
      }
    });

    await expect(component).toBeVisible();
    await expect(component.locator("bdo-alert")).not.toBeVisible();
    await expect(component.getByText("Fullscreen")).toBeVisible();
    await expect(component.getByText("Zoom in")).toBeVisible();
    await expect(component.getByText("Zoom out")).toBeVisible();
    await expect(component.getByText("Zoom reset")).toBeVisible();
  });

  test("should throw error when no driven component is provided", async ({ mount }) => {
    const component = await mount(BdoDriver);

    await expect(component).toBeVisible();
    await expect(component.locator("bdo-alert")).toBeVisible();
  });

  test("should throw error when no drivers are provided", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        default: [
          `<mock-driven></mock-driven>`
        ]
      }
    });

    await expect(component).toBeVisible();
    await expect(component.locator("bdo-alert")).toBeVisible();
  });

  test("should call handleDriverAction on driven component when driver is clicked", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        drivers: [
          `<button slot="drivers" data-action="test-action">Test Action</button>`
        ],
        default: [
          `<mock-driven></mock-driven>`
        ]
      }
    });

    // Click the driver button
    await component.getByText("Test Action").click();

    // Get the driven component and check if it received the action
    const drivenElement = await component.locator('mock-driven').elementHandle();
    const driven = drivenElement as unknown as MockDrivenComponent;

    // We need to wait a bit for the action to be processed
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if the action was received
    expect(driven.getLastAction()).toBe("test-action");
  });
});