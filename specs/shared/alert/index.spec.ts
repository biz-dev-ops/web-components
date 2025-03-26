import { test, expect } from "@sand4rt/experimental-ct-web"
import { BdoAlert } from "../../../src/shared/alert"

test.describe("bdo-alert", () => {

  test("renders info alert with correct icon", async ({ mount }) => {
    const component = await mount(BdoAlert, {
      props: {
        type: "info"
      },
      slots: {
        default: "Info message"
      }
    })

    await expect(component).toBeVisible()
    await expect(component.locator(".alert--info")).toBeVisible()
    await expect(component.locator("bdo-icon[icon='mat-info']")).toBeVisible()
    await expect(component.locator(".alert__message")).toBeVisible()
    expect(component.locator(".alert__message slot")).toBeDefined();
  })

  test("renders warning alert with correct icon", async ({ mount }) => {
    const component = await mount(BdoAlert, {
      props: {
        type: "warning"
      },
      slots: {
        default: "Warning message"
      }
    })

    await expect(component).toBeVisible()
    await expect(component.locator(".alert--warning")).toBeVisible()
    await expect(component.locator("bdo-icon[icon='mat-warning']")).toBeVisible()
    expect(component.locator(".alert__message slot")).toBeDefined();
  })

  test("renders error alert with correct icon", async ({ mount }) => {
    const component = await mount(BdoAlert, {
      props: {
        type: "error"
      },
      slots: {
        default: "Error message"
      }
    })

    await expect(component).toBeVisible()
    await expect(component.locator(".alert--error")).toBeVisible()
    await expect(component.locator("bdo-icon[icon='mat-error']")).toBeVisible()
    expect(component.locator(".alert__message slot")).toBeDefined();
  })

  test("defaults to info type when no type is provided", async ({ mount }) => {
    const component = await mount(BdoAlert, {
      slots: {
        default: "Default message"
      }
    })

    await expect(component.locator(".alert--info")).toBeVisible()
    await expect(component.locator("bdo-icon[icon='mat-info']")).toBeVisible()
  })
})