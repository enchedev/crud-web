export function promoverObjeto(value, schema) {
    let object = structuredClone(value);
    Object.keys(schema).forEach(key => {
        if (schema[key] == null) return;
        if (typeof(schema[key].value) === "undefined") {
            object[key] = promoverObjeto(object[key], schema[key]);
        } else {
            if (schema[key] != undefined) {
                object[key] = { ...schema[key], value: object[key] };
            }
        }
    });
    return object;
}

export function decairObjeto(value) {
    let object = structuredClone(value);
    Object.keys(object).forEach(key => {
        if (object[key] == null) return;
        if (typeof(object[key]) === "object" && typeof(object[key].value) === "undefined") {
            object[key] = decairObjeto(object[key]);
        } else {
            if (typeof(object[key]) === "object") {
                object[key] = object[key].value;
            }
        }
    });
    return object;
}

export function atualizarObjeto(object, key, value, parent, recurse = false) {
    if (!(key.includes(".") || recurse)) return { ...object, [key]: value };
    let keys = key.split(".");
    if (keys.length > 1) {
        if (typeof(object[keys[0]]) === "object") {
            object = { ...object, [keys[0]]: atualizarObjeto(object, keys.slice(1).join("."), value, object[keys[0]], true ) };
        } else {
            return { ...parent, [keys[0]]: atualizarObjeto(object, keys.slice(1).join("."), value, true ) };
        }
    } else {
        return { ...parent, [key]: value };
    }
    return object;
}

