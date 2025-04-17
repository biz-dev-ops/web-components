import { bundle } from "@apidevtools/json-schema-ref-parser";
import YAML from "yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import path from "node:path";
import { ref } from "node:process";

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
            message += `\n\n${error?.errors?.map(e => `* ${e?.message}`).join("\n")}`;
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

export class Schema {

    constructor(schema: any, private references: Map<string, any>) {
        this.references.set("root", schema);
    }

    resolveSchema(path: string | string[]): any {
        const resolved = this._resolveSchema(this.references.get("root"), path);
        return resolved.property;
    }

    resolveSrc(path: string | string[]): string {
        const resolved = this._resolveSchema(this.references.get("root"), path);
        return resolved.$id;
    }

    private _resolveSchema(schema: any, path: string | string[]) : { $id: string, property: any } {
        let $id = schema.$id;

        if (typeof path === "string") {
            if(path.startsWith("#")) {
                path = path.substring(1);
            }
            path = path.split("/");
        }

        path = path.filter(p => p.length > 0 && p !== "root");

        let property = schema;
        for (const part of path) {
            if (!(part in property)) {
                throw new Error(`${part} of path ${path.join(".")} not found in schema ${$id}`);
            }
            property = property[part];

            if("$ref" in property) {
                const ref = property["$ref"];

                const { url, path } = this._resolveRef(ref);
                if(!url) {
                    property = this._resolveSchema(schema, path).property;
                }
                else {
                    schema = this._resolveDefinition(url, $id);
                    $id = schema.$id;
                    property = schema;
                    if(path) {
                        property = this._resolveSchema(schema, path).property;
                    }
                }
            }
        }
        return { $id, property };
    }

    private _resolveRef(ref: string) : { url: string | null, path: string } {
        if(ref.startsWith("#")) {
            return { url: null, path: ref };
        }
        else {
            const refParts = ref.split("#");
            const url = refParts[0];
            const path = refParts[1];
            return { url, path };
        }
    }

    private _resolveDefinition(url: string, $id: string) {
        const dummyDomain = "dummy.com";
        const absoluteUrl = new URL(url, new URL($id, `https://${dummyDomain}`));
        if(absoluteUrl.origin === `https://${dummyDomain}`) {
            return this.references.get(absoluteUrl.pathname);
        }
        else {
            return this.references.get(absoluteUrl.toString());
        }
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