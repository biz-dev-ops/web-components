import { parse as yamlParse } from "yaml";
import fs from "node:fs";

export async function readAsJsonString(file: URL) : Promise<string> {
    const content = fs
        .readFileSync(file, "utf-8");

    return JSON.stringify(yamlParse(content));
}