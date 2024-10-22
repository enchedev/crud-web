import { useState } from "react";
import { pessoasJuridicasService } from "./pessoaJuridicaService";
import { Form } from "../../components/Form";
import { PessoasJuridicasFiltro } from "./components/PessoasJuridicasFiltro";
import { PessoasJuridicasTabela } from "./components/PessoasJuridicasTabela";
import { campoOpcional } from "../../utils/validacoes";
import { atualizarObjeto } from "../../utils/objetos";

export function PessoasJuridicas() {
    const [query, setQuery] = useState({ data: [], nome: campoOpcional(""), nomeFantasia: campoOpcional(""), cnpj: campoOpcional("") });

    const handleChange = ({ key, value }) => {
        setQuery(atualizarObjeto(query, key, value));
    }

    return (
        <div>
            <Form
                header="Pessoas Jurídicas"
                icon="fa fa-building"
                service={pessoasJuridicasService}
                query={query}
                setQuery={setQuery}
            >
                <PessoasJuridicasFiltro query={query} handleChange={handleChange} />
            </Form>
            <PessoasJuridicasTabela value={query.data}/>
        </div>
    );
}
