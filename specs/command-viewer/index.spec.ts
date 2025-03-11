import { test, expect } from "@sand4rt/experimental-ct-web";
import { CommandViewer } from "../../src/command-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import path from "path";

test("should work", async ({ mount, router }) => {
    await useRoutes(router, new FileRoute("/command1.yml", path.join(import.meta.dirname, "command1.yml")));

    const component = await mount(CommandViewer, {
        props: {
            src: "/command1.yml"
        }
    });

    await expect(component).toContainText("Parameters");
    await expect(component).toContainText("Exceptions");
});