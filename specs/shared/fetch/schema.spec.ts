import { test, expect } from "@sand4rt/experimental-ct-web";
import { Schema } from "../../../src/shared/fetch/schema";

test.describe("Schema", () => {
    test("can resolve root schema", () => {
        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                name: { type: "string" }
            }
        };

        const schema = new Schema(rootSchema, new Map());
        const resolved = schema.resolveSchema();

        expect(resolved).toEqual(rootSchema);
    });

    test("can resolve nested properties", () => {
        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                person: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        age: { type: "integer" }
                    }
                }
            }
        };

        const schema = new Schema(rootSchema, new Map());
        const resolved = schema.resolveSchema(["properties", "person", "properties", "name"]);

        expect(resolved).toEqual({ type: "string" });
    });

    test("can resolve string path", () => {
        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                person: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        age: { type: "integer" }
                    }
                }
            }
        };

        const schema = new Schema(rootSchema, new Map());
        const resolved = schema.resolveSchema("#/properties/person/properties/name");

        expect(resolved).toEqual({ type: "string" });
    });

    test("can resolve references within the same schema", () => {
        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                person: {
                    $ref: "#/definitions/person"
                }
            },
            definitions: {
                person: {
                    type: "object",
                    properties: {
                        name: { type: "string" }
                    }
                }
            }
        };

        const schema = new Schema(rootSchema, new Map());
        const resolved = schema.resolveSchema(["properties", "person"]);

        expect(resolved).toEqual({
            type: "object",
            properties: {
                name: { type: "string" }
            }
        });
    });

    test("can resolve external relative references", () => {
        const addressSchema = {
            $id: "/address.schema.yaml",
            title: "Address Schema",
            type: "object",
            properties: {
                street: { type: "string" }
            }
        };

        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("/address.schema.yaml", addressSchema);

        const schema = new Schema(rootSchema, references);
        const resolved = schema.resolveSchema(["properties", "address"]);

        expect(resolved).toEqual(addressSchema);
    });

    test("can resolve external references", () => {
        const addressSchema = {
            $id: "https://example.com/address.schema.yaml",
            title: "Address Schema",
            type: "object",
            properties: {
                street: { type: "string" }
            }
        };

        const rootSchema = {
            $id: "https://example.com/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("https://example.com/address.schema.yaml", addressSchema);

        const schema = new Schema(rootSchema, references);
        const resolved = schema.resolveSchema(["properties", "address"]);

        expect(resolved).toEqual(addressSchema);
    });

    test("can resolve nested references", () => {
        const addressSchema = {
            $id: "/address.schema.yaml",
            title: "Address Schema",
            type: "object",
            properties: {
                street: { type: "string" }
            }
        };

        const personSchema = {
            $id: "/person.schema.yaml",
            title: "Person Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                person: {
                    $ref: "person.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("/address.schema.yaml", addressSchema);
        references.set("/person.schema.yaml", personSchema);

        const schema = new Schema(rootSchema, references);
        const resolved = schema.resolveSchema(["properties", "person", "properties", "address"]);

        expect(resolved).toEqual(addressSchema);
    });

    test("can resolve source URL for schema", () => {
        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object"
        };

        const schema = new Schema(rootSchema, new Map());
        const src = schema.resolveSrc();

        expect(src).toBe("/root.schema.yaml");
    });

    test("can resolve relative source URL for referenced schema", () => {
        const addressSchema = {
            $id: "/address.schema.yaml",
            title: "Address Schema",
            type: "object"
        };

        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("/address.schema.yaml", addressSchema);

        const schema = new Schema(rootSchema, references);
        const src = schema.resolveSrc(["properties", "address"]);

        expect(src).toBe("/address.schema.yaml");
    });

    test("can resolve source URL for referenced schema", () => {
        const addressSchema = {
            $id: "https://example.com/address.schema.yaml",
            title: "Address Schema",
            type: "object"
        };

        const rootSchema = {
            $id: "https://example.com/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("https://example.com/address.schema.yaml", addressSchema);

        const schema = new Schema(rootSchema, references);
        const src = schema.resolveSrc(["properties", "address"]);

        expect(src).toBe("https://example.com/address.schema.yaml");
    });

    test("throws error for when schema has no $id", () => {
        const rootSchema = {
            title: "Root Schema",
            type: "object",
            properties: {
                name: { type: "string" }
            }
        };

        expect(() => new Schema(rootSchema, new Map())).toThrow();
    });

    test("throws error for when referenced schema has no $id", () => {
        const addressSchema = {
            title: "Address Schema",
            type: "object"
        };

        const rootSchema = {
            $id: "/root.schema.yaml",
            title: "Root Schema",
            type: "object",
            properties: {
                address: {
                    $ref: "/address.schema.yaml"
                }
            }
        };

        const references = new Map();
        references.set("/address.schema.yaml", addressSchema);

        expect(() => new Schema(rootSchema, references)).toThrow();
    });
});