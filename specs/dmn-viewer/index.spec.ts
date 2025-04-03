import { test, expect } from "@sand4rt/experimental-ct-web";
import { DMNViewer } from "../../src/dmn-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";

test.describe("dmn-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/dmn1.dmn", new URL("dmn1.dmn", import.meta.url)),
            new FileRoute("/dmn2.dmn", new URL("dmn2.dmn", import.meta.url))
        ]);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(DMNViewer, {
            props: {
                src: "dmn1.dmn"
            }
        });

        await expect(component.locator(".djs-container svg")).toBeVisible();
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(DMNViewer, {
            props: {
                src: "dmn1.dmn"
            }
        });

        await expect(component).toContainText("DRD_1");
        await expect(component).not.toContainText("DRD_2");

        await component.update({
            props: {
                src: "dmn2.dmn"
            }
        });

        await expect(component).toContainText("DRD_2");
        await expect(component).not.toContainText("DRD_1");
    });

    test("shows error for invalid src", async ({ mount }) => {
        const component = await mount(DMNViewer, {
            props: {
                src: "invalid file"
            }
        });

        await expect(component.locator("[type='error']")).toBeVisible();
    });

    test("decission model navigation buttons are working", async ({ mount }) => {
        const component = await mount(DMNViewer, {
            props: {
                src: "dmn1.dmn"
            }
        });

        expect(component.locator(".dmn-drd-container")).toBeVisible();
        expect(component.locator(".dmn-decision-table-container")).not.toBeVisible();

        await component.getByTitle("Open decision table").click();

        expect(component.locator(".dmn-drd-container")).not.toBeVisible();
        expect(component.locator(".dmn-decision-table-container")).toBeVisible();


        await component.getByRole("button", { name: "View DRD" }).click();

        expect(component.locator(".dmn-drd-container")).toBeVisible();
        expect(component.locator(".dmn-decision-table-container")).not.toBeVisible();
    });

    test("business knowledge model navigation buttons are working", async ({ mount }) => {
        const component = await mount(DMNViewer, {
            props: {
                src: "dmn1.dmn"
            }
        });

        expect(component.locator(".dmn-drd-container")).toBeVisible();
        expect(component.locator(".dmn-boxed-expression-container")).not.toBeVisible();

        await component.getByTitle("Open literal expression").click();

        expect(component.locator(".dmn-drd-container")).not.toBeVisible();
        expect(component.locator(".dmn-boxed-expression-container")).toBeVisible();


        await component.getByRole("button", { name: "View DRD" }).click();

        expect(component.locator(".dmn-drd-container")).toBeVisible();
        expect(component.locator(".dmn-boxed-expression-container")).not.toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});