import { test, expect } from "@sand4rt/experimental-ct-web";
import { http, HttpResponse } from "msw";
import { CommandViewer } from "../../src/command-viewer";
import fs from "fs";
import {join, dirname} from "node:path";
import {fileURLToPath} from "node:url";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

test.describe("foo", async () => {

    // let component;

    test.beforeEach(async ({ mount }) => {
        // component = await mount(CommandViewer, {
        //     props: {
        //         src: "/command1.yml"
        //     }
        // });

        // page.on('pageerror', (error) => {
        //     console.error('pageerror fired:', error);
        // });
        //
        // page.on('console', (msg) => {
        //     if (msg.type() === 'error') {
        //         console.error('console error:', msg.text());
        //     }
        // });
    })

    test("should work", async ({ mount, router }) => {
        await router.use(http.get("/command1.yml", async () => {

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            return HttpResponse.text(fs.readFileSync(join(__dirname, 'command1.yml'), "utf-8"));
        }));

        const component = await mount(CommandViewer, {
            props: {
                src: "/command1.yml"
            }
        });

        await expect(component).toContainText("Parameters");
        await expect(component).toContainText("Exceptions");
    });

})
