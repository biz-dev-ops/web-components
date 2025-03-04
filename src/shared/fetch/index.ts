import { bundle } from "@apidevtools/json-schema-ref-parser";

export async function fetchText(src: string): Promise<string> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.text();
    }
    else {
        throw new FetchError(src, response.statusText, response);
    }
}

export async function fetchJsonAs<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.json();
    }
    else {
        throw new FetchError(src, response.statusText, response);
    }
}

export async function fetchYamlAndBundleAs<T>(src: string): Promise<T> {
    try {
        return await bundle(src) as T;
    }
    catch(error:any) {
        throw new FetchError(src, error.message, error);
    }
}

export class FetchError extends Error {
    exception: any;

    constructor(src: string, message: string, exception: any) {
        super(`Failed to fetch ${src}: ${message}`);

        this.name = 'FetchError';
        this.exception = exception;
    }
}
