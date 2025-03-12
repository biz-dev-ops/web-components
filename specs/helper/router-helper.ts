import { RouterFixture } from "@playwright/experimental-ct-core";
import { http, HttpResponse } from "msw";
import fs from "node:fs";

export async function useRoutes(router: RouterFixture, routes: Route | Route[]) {
    if(!Array.isArray(routes)) {
        routes = [routes];
    }

    routes.forEach(async route =>  await route.set(router));
}

export interface Route {
    set(router: RouterFixture): Promise<void>
}

export class FileRoute implements Route {
    path: string;
    file: URL;

    constructor(path: string, file: URL) {
        this.path = path;
        this.file = file;

    }
    async set(router: RouterFixture): Promise<void> {
        await router.use(http.get(this.path, async () => {
            return HttpResponse.text(fs.readFileSync(this.file, "utf-8"));
        }));
    }
}