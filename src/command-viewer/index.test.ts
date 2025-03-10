import { test, expect } from "@sand4rt/experimental-ct-web";
import { http, HttpResponse } from "msw";
import { CommandViewer } from ".";
import fs from "fs";
import path from "path";

test("should work", async ({ mount, router }) => {
    await router.use(http.get("/command1.yml", async () => {
        return HttpResponse.text(fs.readFileSync(path.join(__dirname, "_test-data", "command1.yml"), "utf-8"));
    }));

    const component = await mount(CommandViewer, {
        props: {
            src: "/command1.yml"
        }
    });

    await expect(component).toContainText("Parameters");
});