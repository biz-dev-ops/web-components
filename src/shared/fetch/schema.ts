export class SchemaResolver {

    constructor(private schema: Record<string, any>, private references: Record<string, any>) {
        if(!this.schema.$id) {
            throw new Error(`Schema must have an $id to support relative references.`);
        }

        Object.keys(this.references).forEach(key => {
            const schema = this.references[key];
            if(!schema.$id) {
                throw new Error(`Schema reference '${key}' must have an $id to support relative references.`);
            }
        });
    }

    /**
     * Returns the references for the schema.
     *
     * @returns The references for the schema.
     */
    getReferences(): Record<string, any> {
        return this.references;
    }

    /**
     * Resolves the schema for a given path.
     *
     * @param path - The path to the schema.
     * @returns The resolved schema.
     */
    resolveSchema(path: string | string[] = ""): any {
        const resolved = this._resolveSchema(this.schema, path);
        return resolved.property;
    }

    /**
     * Resolves the source URL for a schema.
     *
     * @param path - The path to the schema.
     * @returns The source URL for the schema.
     */
    resolveSrc(path: string | string[] = ""): string {
        const resolved = this._resolveSchema(this.schema, path);
        return resolved.$id;
    }

    /**
     * Resolves the schema for a given path.
     *
     * @param schema - The schema to resolve.
     * @param path - The path to the schema.
     * @returns The resolved schema and the $id.
     */
    private _resolveSchema(schema: Record<string, any>, path: string | string[]) : { $id: string, property: any } {
        let $id = schema.$id;

        if (typeof path === "string") {
            if(path.startsWith("#")) {
                path = path.substring(1);
            }
            path = path.split("/");
        }

        path = path.filter(p => p.length > 0);

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
                    property = this._resolveSchema(schema, path!).property;
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

    /**
     * Resolves the reference for a given reference.
     *
     * @param ref - The reference to resolve.
     * @returns The resolved reference.
     */
    private _resolveRef(ref: string) : { url: string | null, path: string | null } {
        if(!ref.includes("#")) {
            return { url: ref, path: null };
        }
        else {
            const refParts = ref.split("#");
            const url = refParts[0].trim().length > 0 ? refParts[0] : null;
            const path = refParts[1].trim().length > 0 ? refParts[1] : null;
            return { url, path };
        }
    }

    /**
     * Resolves the definition for a given URL.
     *
     * @param url - The URL to resolve the definition for.
     * @param $id - The ID of the relative schema.
     * @returns The resolved definition.
     */
    private _resolveDefinition(url: string, $id: string) {
        const dummyDomain = "dummy.com";
        const absoluteUrl = new URL(url, new URL($id, `https://${dummyDomain}`));
        if(absoluteUrl.origin === `https://${dummyDomain}`) {
            const key = absoluteUrl.pathname;
            return this.references[key];
        }
        else {
            const key = absoluteUrl.toString();
            return this.references[key];
        }
    }
}