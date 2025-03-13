export async function processStringsRecursively(obj: any, callback: (str: string, key: string | number | undefined, parent: any) => Promise<void>): Promise<void> {
    if (typeof obj === "object" && obj !== null) {
        if (Array.isArray(obj)) {
            for (let index = 0; index < obj.length; index++) {
                const item = obj[index];
                if (typeof item === "string") {
                    await callback(item, index, obj);
                }
                else {
                    await processStringsRecursively(item, callback);
                }
            }
        }
        else {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (typeof value === "string") {
                        await callback(value, key, obj);
                    }
                    else {
                        await processStringsRecursively(value, callback);
                    }
                }
            }
        }
    }
}