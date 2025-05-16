import { expect, test } from "@sand4rt/experimental-ct-web";
import { SchemaNavigation } from "../../../src/schema-viewer/components/schema-navigation/index";
import { FragmentIndexSelected } from "../../../src/schema-viewer/types";

test.describe("schema-resolver", async () => {

    test("renders navigation path", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address" }
                ]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.locator(".list--path")).toBeVisible();
        await expect(component.locator("li")).toHaveCount(2);
    });

    test("renders hidden fragments", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Properties", key: "properties", hidden: true },
                    { name: "Address", key: "address" }
                ]
            }
        });

        await expect(component.locator("li")).toHaveCount(2);
    });

    test("renders disabled fragments", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address", disabled: true }
                ]
            }
        });

        await expect(component.locator("bdo-button")).toHaveCount(1);
        await expect(component.locator("li:last-child bdo-button")).not.toBeVisible();
    });

    test("emits FragmentIndexSelected event on click", async ({ mount }) => {
        const events: any[] = [];
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address" },
                    { name: "Postal", key: "postal" }
                ]
            },
            on: {
                FragmentIndexSelected: (event: CustomEvent<FragmentIndexSelected>) => {
                    events.push(event);
                }
            }
        });

        const buttons = component.locator("bdo-button");
        await expect(buttons).toHaveCount(2);

        await buttons.nth(0).click();
        expect(events).toHaveLength(1);
        let event = events[0];
        expect(event.index).toBe(0);

        await buttons.nth(1).click();
        expect(events).toHaveLength(2);
        event = events[1];
        expect(event.index).toBe(1);
    });
});