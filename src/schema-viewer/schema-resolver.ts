import { fetchAndValidateSchema } from "../shared/fetch";
import path from "node:path";

const refs: Map<string, SchemaResolver> = new Map();
let activeResolver: SchemaResolver | undefined;

export function getResolver(url: string): SchemaResolver {
    const ref = parseRef(url);
    if (refs.has(ref.url!)) {
        activeResolver = refs.get(ref.url!)!;
        return activeResolver;
    }
    activeResolver = new SchemaResolver(ref.url!);
    refs.set(ref.url!, activeResolver);
    return activeResolver;
}

export function getActiveResolver(): SchemaResolver | undefined {
    return activeResolver;
}

export function parseRef(ref: string): Ref {
    ref = ref.trim();
    if (ref.startsWith("#")) {
        return {
            url: null,
            parts: ref.substring(1).split("/")
        };
    }

    if (ref.startsWith(".")) {
        ref = path.resolve(ref);
    }

    if (!ref.includes("#")) {
        return {
            url: ref,
            parts: []
        };
    }

    const p = ref.split("#");
    return {
        url: p[0],
        parts: p[1].split("/").filter(p => p.length > 0)
    };
}


class SchemaResolver {
    private schema: any | undefined;

    constructor(readonly url: string) { }

    async resolve(path?: string | string[]): Promise<any> {
        if (!this.schema) {
            this.schema = await fetchAndValidateSchema(this.url);
        }

        let schema = _getInternalSchema(this.schema, path);
        return schema;
        // if (!("$ref" in schema)) {
        //     return schema;
        // }

        // const ref = parseRef(schema.$ref);
        // const resolver = getResolver(ref.url!);
        // schema = await resolver.resolve(ref.parts);
        // return schema;
    }

    async getId() : Promise<string | undefined> {
        if (!this.schema) {
            this.schema = await fetchAndValidateSchema(this.url);
        }
        return this.schema?.$id;
    }
}

function _getInternalSchema(schema: any, path?: string | string[]): any {
    if (!path) {
        return schema;
    }

    if (!Array.isArray(path)) {
        path = path.trim();
        if (path.startsWith("#")) {
            path = path.substring(1);
        }
        path = path.split("/");
    }

    for (const part of path.filter(p => p.length > 0)) {
        if (!(part in schema)) {
            throw new Error(`${part} of path ${path.join(".")} not found in schema ${schema.$id}`);
        }
        schema = schema[part];
    }
    return schema;
}

export type Ref = {
    url: string | null;
    parts: string[];
}