import { RouterFixture } from "@playwright/experimental-ct-core";
import { http, HttpResponse } from "msw";
import fs from "node:fs";

export async function useRoutes(router: RouterFixture, routes: Route | Route[]) {
    if(!Array.isArray(routes)) {
        routes = [routes];
    }

    for (const route of routes) {
        await route.useOn(router);
    }
}

export interface Route {
    useOn(router: RouterFixture): Promise<void>
}

export class FileRoute implements Route {
    path: string;
    file: URL;

    constructor(path: string, file: URL) {
        this.path = path;
        this.file = file;

    }
    async useOn(router: RouterFixture): Promise<void> {
        await router.use(http.get(this.path, async () => {
            return HttpResponse.text(fs.readFileSync(this.file, "utf-8"));
        }));
    }
}

export class StringContentRoute implements Route {
    path: string;
    content: string;

    constructor(path: string, content: string) {
        this.path = path;
        this.content = content;

    }
    async useOn(router: RouterFixture): Promise<void> {
        await router.use(http.get(this.path, async () => {
            return HttpResponse.text(this.content);
        }));
    }
}