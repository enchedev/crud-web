import { genericService } from "../../services/genericService";
import { campoObrigatorio } from "../../utils/validacoes";

const ENDPOINT = "http://localhost:8000/v1/pessoas-fisicas"

export const pessoasFisicasService = {
    ...genericService(ENDPOINT),
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
    }
};

