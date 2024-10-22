export const genericService = (endpoint) => { return {
    validar: (entidade) => {
        let _validar = (entidade) => {
            let incompletos = 0;
            Object.values(entidade).forEach(field => {
                if (field != null && field.required != undefined && !field.required) return;
                if (field != null) {
                    if (typeof(field) === "object") incompletos += _validar(field);
                    switch (typeof(field.value)) {
                        case "string": { incompletos += field.value.length === 0; break; }
                        case "bigint", "number": { incompletos += isNaN(field.value); break; }
                    }
                } else {
                    incompletos += 1;
                }
            });
            return incompletos;
        };
        return _validar(entidade);
    },

    buscar: async (id) => {
        let result = await fetch(`${endpoint}/${id}`);
        let content = await result.json();
        return !result.ok ? Promise.reject(content) : content;
    },

    listar: async (query) => {
        let result = await fetch(`${endpoint}${query !== null ? `?${Object.keys(query).filter(key => query[key].map === undefined).filter(key => query[key].length > 0).map(key => `${key}=${query[key]}`).join("&")}` : ""}`, { method: "GET" });
        let content = await result.json();
        return !result.ok ? Promise.reject(content) : content;
    },

    salvar: async (entidade) => {
        let result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entidade)
        });
        return !result.ok ? Promise.reject(await result.json()) : result;
    },

    deletar: async (id) => {
        let result = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
        return !result.ok ? Promise.reject(await result.json()) : result;
    },

    atualizar: async (id, entidade) => {
        let result = await fetch(`${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entidade)
        });
        return !result.ok ? Promise.reject(await result.json()) : result;
    }
}};
