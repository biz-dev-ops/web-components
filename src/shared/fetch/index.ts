import { parse as yamlParse } from "yaml";

export async function fetchString(src: string): Promise<string> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.text();
    }
    else {
        throw new FetchError(response);
    }
}

export async function fetchJson<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (response.ok) {
        return await response.json();
    }
    else {
        throw new FetchError(response);
    }
}

export async function fetchYaml<T>(src: string): Promise<T> {
    const response = await fetch(src);
    if (response.ok) {
        return yamlParse(await response.text());
    }
    else {
        throw new FetchError(response);
    }
}

export class FetchError extends Error {
    response: Response;

    constructor(response: Response) {
        const message = `Failed to fetch ${response.url}: ${response.statusText} (${response.status})`;
        super(message);

        this.name = 'FetchError';
        this.response = response;
    }
}
