import { html, TemplateResult } from "lit";

export default class SchemaFactory {

    async *build(schema: any): AsyncGenerator<TemplateResult> {
        return this._build(null, schema);
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

        yield html`<h3>${schema.type}: ${schema.title || key}</h3>`;

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

        yield html`<h3>${schema.type}: ${schema.title || key}</h3>`;

        if (!schema.items) {
            return;
        }

        yield* this._build(key, schema.items);
    }

    private async *_buildString(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "string") {
            return;
        }

        yield html`<h3>${schema.type}: ${schema.title || key}</h3>`;
    }

    private async *_buildNumber(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "number") {
            return;
        }

        yield html`<h3>${schema.type}: ${schema.title || key}</h3>`;
    }

    private async *_buildBoolean(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(schema.type !== "boolean") {
            return
        }

        yield html`<h3>${schema.type}: ${schema.title || key}</h3>`;
    }

    private async *_buildAllOf(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(key?.toLowerCase() !== "allOf") {
            return;
        }
        yield html`<h3>${key}</h3>`;
    }

    private async *_buildOneOf(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(key?.toLowerCase() !== "oneOf") {
            return;
        }
        yield html`<h3>${key}</h3>`;
    }

    private async *_buildRef(key: string | null, schema: any): AsyncGenerator<TemplateResult> {
        if(key?.toLowerCase() !== "$ref") {
            return;
        }
        yield html`<h3>${key}</h3>`;
    }
}