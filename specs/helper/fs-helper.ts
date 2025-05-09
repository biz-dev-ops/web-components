import { parse as yamlParse } from "yaml";
import fs from "node:fs";

export async function read(file: URL) : Promise<string> {
    return fs.promises.readFile(file, { encoding: "utf-8"});
}

export async function readYamlAsJsonString(file: URL) : Promise<string> {
    const content = await readYamlAndParseAsObject(file);
    return JSON.stringify(content);
}

export async function readYamlAndParseAsObject(file: URL) : Promise<Object> {
    const content = await read(file);
    return yamlParse(content);
}

export async function readYamlAndParseAs<T>(file: URL) : Promise<T> {
    const content = await readYamlAndParseAsObject(file);
    return content as T;
}