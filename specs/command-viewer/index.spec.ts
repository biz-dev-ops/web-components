import { test, expect } from "@sand4rt/experimental-ct-web";
import { http, HttpResponse } from "msw";
import { CommandViewer } from "../../src/command-viewer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("should work", async ({ mount, router }) => {
    await router.use(http.get("/command1.yml", async () => {
        return HttpResponse.text(fs.readFileSync(path.join(__dirname, "command1.yml"), "utf-8"));
    }));

    const component = await mount(CommandViewer, {
        props: {
            src: "/command1.yml"
        }
    });

    await expect(component).toContainText("Parameters");
    await expect(component).toContainText("Exceptions");
});