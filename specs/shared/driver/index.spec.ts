import { test, expect } from "@sand4rt/experimental-ct-web";
import { BdoDriver } from "../../../src/shared/driver";

test.describe("bdo-driver", () => {

  test("should render", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        default: [
          `<div>Driven</div>`
        ], 
        driver: [
          `<button slot="driver">Action A</button>`,
          `<button slot="driver">Action B</button>`,
          `<button slot="driver">Action C</button>`
        ]
      }
    });

    await expect(component).toBeVisible();
    await expect(component.getByText("Driven")).toBeVisible();
    await expect(component.getByText("Action A")).toBeVisible();
    await expect(component.getByText("Action B")).toBeVisible();
    await expect(component.getByText("Action C")).toBeVisible();
  });

  test("should hide driver with action which is not handled by driven components", async ({ mount }) => {
    const component = await mount(BdoDriver, {
      slots: {
        default: [
          `<div>Driven</div>`
        ],
        driver: [
          `<button slot="driver" data-action="action-a">Action A</button>`,
          `<button slot="driver" data-action="action-b">Action B</button>`,
          `<button slot="driver" data-action="action-c">Action C</button>`
        ]
      }
    });

    await expect(component).toBeVisible();
    await expect(component.getByText("Driven")).toBeVisible();
    await expect(component.getByText("Action A")).not.toBeVisible();
    await expect(component.getByText("Action B")).not.toBeVisible();
    await expect(component.getByText("Action C")).not.toBeVisible();
  });
});