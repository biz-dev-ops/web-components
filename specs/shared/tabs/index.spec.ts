import { test, expect } from "@sand4rt/experimental-ct-web";
import { BdoTabs } from "../../../src/shared/tabs";

test.describe("bdo-tabs", () => {

  test("should render tabs with default properties", async ({ mount }) => {
    const component = await mount(BdoTabs, {
        slots: {
            default: [
                `<bdo-tab title="Tab 1"><p>Content 1</p></bdo-tab>`,
                `<bdo-tab title="Tab 2"><p>Content 2</p></bdo-tab>`
            ]
        },
        props: {
            label: "Example tabs"
        }
    });

    await expect(component).toBeVisible();
    await expect(component.getByText("Tab 1")).toBeVisible();
    await expect(component.getByText("Tab 2")).toBeVisible();
  });

  test("should switch tabs when clicked", async ({ mount }) => {
    const component = await mount(BdoTabs, {
        slots: {
            default: [
                `<bdo-tab title="Tab 1"><p>Content 1</p></bdo-tab>`,
                `<bdo-tab title="Tab 2"><p>Content 2</p></bdo-tab>`
            ]
        }
    });

    // First tab should be active by default
    await expect(component.getByText("Content 1")).toBeVisible();
    await expect(component.getByText("Content 2")).not.toBeVisible();

    // Click second tab
    await component.getByText("Tab 2").click();
    await expect(component.getByText("Content 1")).not.toBeVisible();
    await expect(component.getByText("Content 2")).toBeVisible();
  });

  test("should handle no tabs", async ({ mount }) => {
    const component = await mount(BdoTabs);

    await expect(component).not.toBeVisible();
  });

  test("should apply active class to selected tab", async ({ mount }) => {
    const component = await mount(BdoTabs, {
        slots: {
            default: [
                `<bdo-tab title="Tab 1"><p>Content 1</p></bdo-tab>`,
                `<bdo-tab title="Tab 2"><p>Content 2</p></bdo-tab>`
            ]
        }
    });

    await expect(component.getByText("Tab 1")).toHaveClass(/selected/);
    await component.getByText("Tab 2").click();
    await expect(component.getByText("Tab 2")).toHaveClass(/selected/);
    await expect(component.getByText("Tab 1")).not.toHaveClass(/selected/);
  });
});