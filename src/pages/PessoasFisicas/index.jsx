import { useState } from "react";
import { pessoasFisicasService } from "./pessoaFisicaService";
import { Form } from "../../components/Form";
import { PessoasFisicasFiltro } from "./components/PessoasFisicasFiltro";
import { PessoasFisicasTabela } from "./components/PessoasFisicasTabela";
import { campoOpcional } from "../../utils/validacoes";
import { atualizarObjeto } from "../../utils/objetos";

export function PessoasFisicas() {
    const [query, setQuery] = useState({ data: [], nome: campoOpcional(""), cpf: campoOpcional("") });

    const handleChange = ({ key, value }) => {
        setQuery(atualizarObjeto(query, key, value));
    };

    return (
        <div>
            <Form
                header="Pessoas Físicas"
                icon="fa fa-user"
                service={pessoasFisicasService}
                query={query}
                setQuery={setQuery}
            >
                <PessoasFisicasFiltro query={query} handleChange={handleChange} />
            </Form>
            <PessoasFisicasTabela value={query.data} />
        </div>
    );
}
