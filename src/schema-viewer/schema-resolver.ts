import { fetchAndValidateSchema } from "../shared/fetch";
import path from "node:path";

export default class SchemaResolver {
    private schema: any | undefined;
    private resolvers: Map<string, SchemaResolver> = new Map();

    constructor(readonly url: string) { }

    async resolve(path?: string | string[]): Promise<any> {
        if (!this.schema) {
            this.schema = await fetchAndValidateSchema(this.url);
        }

        let schema = _getInternalSchema(this.schema, path);
        if (!("$ref" in schema)) {
            return schema;
        }

        const ref = SchemaResolver.parseRef(schema.$ref);
        const resolver = this._getResolver(ref.url!);
        schema = await resolver.resolve(ref.parts);
        return schema;
    }

    static parseRef(ref: string): Ref {
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

    private _getResolver(url: string): SchemaResolver {
        if (this.resolvers.has(url)) {
            return this.resolvers.get(url)!;
        }
        else {
            const resolver = new SchemaResolver(url);
            this.resolvers.set(url, resolver);
            return resolver;
        }
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