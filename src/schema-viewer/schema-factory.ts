import { html, TemplateResult } from "lit";
import { fetchAndValidateSchema } from "../shared/fetch";
import path from "node:path";

export default class SchemaFactory {
    private schema: any | undefined;
    private ref: { url: string | null; parts: string[]; };

    constructor(ref: string) {
        this.ref = getRefObject(ref);
        if(!this.ref.url) {
            throw new Error("Invalid ref, must be a url: " + ref);
        }
    }

    async *build(): AsyncGenerator<TemplateResult> {
        if(!this.schema) {
            this.schema = await fetchAndValidateSchema(this.ref.url!);
        }

        const schema = getInternalSchema(this.schema, this.ref.parts);
        yield* this._build(null, schema);
    }

    private async *_build(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        yield* this._buildObject(key, schema);
        yield* this._buildArray(key, schema);
        yield* this._buildString(key, schema);
        yield* this._buildNumber(key, schema);
        yield* this._buildBoolean(key, schema);
        yield* this._buildAllOf(key, schema);
        yield* this._buildOneOf(key, schema);
        yield* this._buildRef(key, schema);
    }

    private async *_buildObject(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "object") {
            return;
        }

        yield html`<h3>${schema.title || key}: ${schema.type}</h3>`;

        if (!schema.properties) {
            return;
        }

        const keys = Object.keys(schema.properties);
        for (const key of keys) {
            yield* this._build(key, schema.properties[key]);
        }
    }

    private async *_buildArray(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "array") {
            return;
        }

        yield html`<h3>${schema.title || key}: ${schema.type}</h3>`;

        if (!schema.items) {
            return;
        }

        yield* this._build(key, schema.items);
    }

    private async *_buildString(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "string") {
            return;
        }

        yield html`<h3>${schema.title || key}: ${schema.type}</h3>`;
    }

    private async *_buildNumber(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "number") {
            return;
        }

        yield html`<h3>${schema.title || key}: ${schema.type}</h3>`;
    }

    private async *_buildBoolean(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "boolean") {
            return
        }

        yield html`<h3>${schema.title || key}: ${schema.type}</h3>`;
    }

    private async *_buildAllOf(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(!("allOf" in schema)) {
            return;
        }
        yield html`<h3>${key}: allOf</h3>`;
    }

    private async *_buildOneOf(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(!("oneOf" in schema)) {
            return;
        }
        yield html`<h3>${key}: oneOf</h3>`;

        const oneOf = schema.oneOf;
        for (const item of oneOf) {
            yield* this._build("oneOf", item);
        }
    }

    private async *_buildRef(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(!("$ref" in schema)) {
            return;
        }

        yield html`<h3>${key}: $ref</h3>`;

        const ref = schema.$ref.trim();
        if(ref.startsWith("#")) {
            const internalSchema = getInternalSchema(this.schema, ref);
            yield* this._build(key, internalSchema);
            return;
        }

        const url = path.join(path.dirname(this.schema.$id), ref);
        const factory = new SchemaFactory(url);
        yield* factory.build();
    }
}

function getRefObject(ref: string): { url: string | null, parts: string[] } {
    ref = ref.trim();
    if(ref.startsWith("#")) {
        return {
            url: null,
            parts: ref.substring(1).split("/")
        };
    }

    if(ref.startsWith(".")) {
        ref = path.resolve(ref);
    }

    if(!ref.includes("#")) {
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

function getInternalSchema(schema: any, path?: string | string[]): any {
    if(!path) {
        return schema;
    }

    if(!Array.isArray(path)) {
        path = path.trim();
        if(path.startsWith("#")) {
            path = path.substring(1);
        }
        path = path.split("/").filter(p => p.length > 0);
    }

    for(const part of path) {
        if(!(part in schema)) {
            throw new Error(`${part} of path ${path.join(".")} not found in schema ${schema.$id}`);
        }
        schema = schema[part];
    }
    return schema;
}