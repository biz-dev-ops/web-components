import { test, expect } from "@sand4rt/experimental-ct-web";
import { UMLViewer } from "../../src/uml-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";

test.describe("uml-viewer", async () => {
    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/simple.puml", new URL("simple.puml", import.meta.url)),
            new FileRoute("/complex.puml", new URL("complex.puml", import.meta.url))
        ]);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(UMLViewer, {
            props: {
                src: "simple.puml"
            }
        });

        await expect(component.locator("svg")).toBeVisible();
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(UMLViewer, {
            props: {
                src: "simple.puml"
            }
        });

        await expect(component).not.toContainText("Failed to fetch");

        await component.update({
            props: {
                src: "complex.puml"
            }
        });

        await expect(component.locator("svg")).toBeVisible();
    });

    test("shows error on invalid src", async ({ mount }) => {
        const component = await mount(UMLViewer, {
            props: {
                src: "nonexistent.puml"
            }
        });

        await expect(component.locator(".error")).toBeVisible();
        await expect(component.locator(".error")).toContainText("Failed to fetch");
    });

    test("can render direct puml input", async ({ mount }) => {
        const puml = `@startuml
        A -> B: Hello
        @enduml`;

        const component = await mount(UMLViewer, {
            props: {
                "puml": puml
            }
        });

        await expect(component.locator("svg")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});