import { genericService } from "../../services/genericService";
import { campoObrigatorio } from "../../utils/validacoes";

const ENDPOINT = "http://localhost:8000/v1/pessoas-juridicas"

export const pessoasJuridicasService = {
    ...genericService(ENDPOINT),
    criar: () => {
        return {
            nome: campoObrigatorio(""),
            nomeFantasia: campoObrigatorio(""),
            cnpj: campoObrigatorio(""),
            nascimento: campoObrigatorio(null),
            endereco: {
                rua: campoObrigatorio(""),
                numero: campoObrigatorio(null),
                bairro: campoObrigatorio(""),
                cidade: campoObrigatorio(""),
                estado: campoObrigatorio(""),
                cep: campoObrigatorio("")
            }
        }
    }
};

