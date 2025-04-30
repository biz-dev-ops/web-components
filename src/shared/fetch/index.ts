import { bundle } from "@apidevtools/json-schema-ref-parser";
import YAML from "yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Schema } from "./schema";

export async function fetchText(src: string): Promise<string> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.text();
    }
    else {
        throw new FetchError(src, response.statusText, response);
    }
}

export async function fetchJsonAsAny(src: string): Promise<any> {
    return await fetchJsonAs<any>(src);
}

export async function fetchJsonAs<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.json() as T;
    }
    else {
        throw new FetchError(src, response.statusText, response);
    }
}

export async function fetchYamlAsAny(src: string): Promise<any> {
    return await fetchYamlAs<any>(src);
}

export async function fetchYamlAs<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (response.ok) {
        const yaml = await response.text();
        return YAML.parse(yaml) as T;
    }
    else {
        throw new FetchError(src, response.statusText, response);
    }
}

export async function fetchYamlAndBundleAs<T>(src: string): Promise<T> {
    try {
        return await bundle(src) as T;
    }
    catch (error: any) {
        throw new FetchError(src, error.message, error);
    }
}

export async function fetchAndValidateSchema(src: string): Promise<Schema> {
    try {
        src = getAbsoluteUrl(src);
        const references = new Map<string, any>();
        const schema = await fetchSchema(src);

        const ajv = new Ajv({ strict: true, loadSchema: async (uri) => {
            if(references.has(uri)) {
                return references.get(uri);
            }
            const schema = await fetchSchema(uri);
            references.set(uri, schema);
            return schema;
        }});
        addFormats(ajv);
        await ajv.compileAsync(schema);
        return new Schema(schema, references);
    }
    catch (error: any) {
        let message = `Schema validation error: ${error}`;
        if (error.errors) {
            message += `\n\n${error?.errors?.map((e: { message: any; }) => `* ${e?.message}`).join("\n")}`;
        }
        throw new FetchError(src, message, error);
    }
}

export async function fetchSchema(src: string): Promise<any> {
    let schema: any | undefined;
    if (src.includes(".json")) {
        schema = await fetchJsonAsAny(src);
    }

    if (src.includes(".yml") || src.includes(".yaml")) {
        schema = await fetchYamlAsAny(src);
    }

    if (!schema) {
        throw new FetchError(src, "Unsupported file type", undefined);
    }

    if (!schema["$id"]) {
        schema["$id"] = src;
    }
    return schema;
}

export class FetchError extends Error {
    exception: any;

    constructor(src: string, message: string, exception: any) {
        super(`Failed to fetch ${src}\n\n ${message}`);

        this.name = 'FetchError';
        this.exception = exception;
    }
}

/*
TODO:
This is a temporary function to get the absolute URL of a relative URL.
It is used to get the absolute URL of a relative URL when the schema is loaded from a file.
A filesystem abstraction is needed to support the following cases:
- Browser
- VS Code
- IntelliJ IDEA
- etc.
*/
function getAbsoluteUrl(relativeUrl: string) {
    const absoluteUrl = new URL(relativeUrl, window.location.href);
    if(absoluteUrl.origin === window.location.origin) {
        return absoluteUrl.pathname;
    }
    return relativeUrl;
}