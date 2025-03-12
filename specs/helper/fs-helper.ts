import { parse as yamlParse } from "yaml";
import fs from "node:fs";

export async function readYamlAsJsonString(file: URL) : Promise<string> {
    return JSON.stringify(readYamlAndParseAsObject(file));
}

export async function readYamlAndParseAsObject(file: URL) : Promise<Object> {
    const content = fs
        .readFileSync(file, "utf-8");

    return yamlParse(content);
}

export async function readYamlAndParseAs<T>(file: URL) : Promise<T> {
    const content = fs
        .readFileSync(file, "utf-8");

    return yamlParse(content) as T;
}