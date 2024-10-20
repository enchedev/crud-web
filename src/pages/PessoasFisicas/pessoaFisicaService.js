import { campoObrigatorio } from "../../utils/validacoes";

const ENDPOINT = "http://localhost:8000/v1/pessoas-fisicas"

export const pessoasFisicasService = {
    criar: () => {
        return {
            nome: campoObrigatorio(""),
            cpf: campoObrigatorio(""),
            nascimento: campoObrigatorio(null),
            endereco: {
                rua: campoObrigatorio(""),
                numero: campoObrigatorio(null),
                bairro: campoObrigatorio(""),
                cidade: campoObrigatorio(""),
                estado: campoObrigatorio(""),
                cep: campoObrigatorio("")
            }
        };
    },

    validar: (pessoaFisica) => {
        let incompletos = 0;
        Object.values(pessoaFisica).forEach(field => {
            if (field != null && field.required != undefined && !field.required) return;
            if (field != null) {
                if (typeof(field) === "object") incompletos += pessoasFisicasService.validar(field);
                switch (typeof(field.value)) {
                    case "string": { incompletos += field.value.length === 0; break; }
                    case "bigint", "number": { incompletos += isNaN(field.value); break; }
                }
            } else {
                incompletos += 1;
            }
        });
        return incompletos;
    },

    buscar: async (id) => {
        let result = await fetch(`${ENDPOINT}/${id}`);
        let content = await result.json();
        return !result.ok ? Promise.reject(content) : content;
    },

    listar: async (query) => {
        let result = await fetch(`${ENDPOINT}${query !== null ? `?${Object.keys(query).filter(key => query[key].length > 0).map(key => `${key}=${query[key]}`).join("&")}` : ""}`, { method: "GET" });
        let content = await result.json();
        return !result.ok ? Promise.reject(content) : content;
    },

    salvar: async (pessoaFisica) => {
        let result = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoaFisica)
        });
        return !result.ok ? Promise.reject(await result.json()) : result;
    },

    deletar: async (id) => {
        let result = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
        return !result.ok ? Promise.reject(await result.json()) : result;
    },

    atualizar: async (id, pessoaFisica) => {
        let result = await fetch(`${ENDPOINT}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoaFisica)
        });
        return !result.ok ? Promise.reject(await result.json()) : result;
    }
};

