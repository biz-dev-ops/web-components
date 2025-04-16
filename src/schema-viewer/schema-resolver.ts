import { fetchAndValidateSchema } from "../shared/fetch";

const refs: Map<string, SchemaResolver> = new Map();

export function getResolver(url: string): SchemaResolver {
    const ref = parseRef(url);
    if (refs.has(ref.url!)) {
        return refs.get(ref.url!)!;
    }
    const resolver = new SchemaResolver(ref.url!);
    refs.set(ref.url!, resolver);
    return resolver;
}

export function parseRef($ref: string, $id?: string): Ref {
    $ref = $ref.trim();
    if ($ref.startsWith("#")) {
        return {
            url: $id ?? null,
            parts: $ref.substring(1).split("/").filter(p => p.length > 0)
        };
    }

    if ($ref.startsWith(".")) {
        if (!$id) {
            throw new Error(`Relative reference ${$ref} requires an id`);
        }
        const dummyUrl = "http://dummy.com";
        const base = new URL($id, dummyUrl);
        const resolvedUrl = new URL($ref, base);
        if (dummyUrl.endsWith(resolvedUrl.hostname)) {
            $ref = $id?.startsWith("/") ? resolvedUrl.pathname : resolvedUrl.pathname.substring(1);
        }
        else {
            $ref = resolvedUrl.toString();
        }
    }

    if (!$ref.includes("#")) {
        return {
            url: $ref,
            parts: []
        };
    }

    const p = $ref.split("#");
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

        return _getInternalSchema(this.schema, path);
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