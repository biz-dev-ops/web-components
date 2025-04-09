import { bundle } from "@apidevtools/json-schema-ref-parser";
import YAML from "yaml";
import Ajv from "ajv/dist/2020";
const ajv = new Ajv({ strict: true });

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

export async function fetchAndValidateSchema(src: string): Promise<any> {
    const schema = await fetchSchema(src);
    if (!schema) {
        return undefined;
    }

    const validate = ajv.compile(schema);
    const valid = validate(schema);
    if (!valid) {
        throw new FetchError(src!, `
Invalid schema:

${validate.errors?.map(e => `* ${e.message}`).join("\n")}

`, validate.errors);
    }

    return schema;
}

export async function fetchSchema(src: string): Promise<any> {
    if (src.includes(".json")) {
        return await fetchJsonAsAny(src);
    }

    if (src.includes(".yml") || src.includes(".yaml")) {
        return await fetchYamlAsAny(src);
    }

    throw new FetchError(src, "Unsupported file type", undefined);


}

export class FetchError extends Error {
    exception: any;

    constructor(src: string, message: string, exception: any) {
        super(`Failed to fetch ${src}\n\n ${message}`);

        this.name = 'FetchError';
        this.exception = exception;
    }
}
