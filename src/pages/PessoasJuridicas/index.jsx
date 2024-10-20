import { useMemo, useState } from "react";
import { pessoasJuridicasService } from "./pessoaJuridicaService";
import { Form } from "../../components/Form";
import { PessoasJuridicasFiltro } from "./components/PessoasJuridicasFiltro";
import { PessoasJuridicasTabela } from "./components/PessoasJuridicasTabela";

export function PessoasJuridicas() {
    const [pessoasJuridicas, setPessoasJuridicas] = useState([]);
    const [query, setQuery] = useState({ nome: { value: "" }, nomeFantasia: { value: "" }, cnpj: { value: "" } });

    const handleChange = ({ key, value }) => {
        setQuery({ ...query, [key]: value });
    }

    return (
        <div>
            <Form
                header="Pessoas Jurídicas"
                icon="fa fa-building"
                service={pessoasJuridicasService}
                query={query}
                setValue={setPessoasJuridicas}
            >
                <PessoasJuridicasFiltro query={query} handleChange={handleChange} />
            </Form>
            <PessoasJuridicasTabela value={useMemo(() => pessoasJuridicas, [pessoasJuridicas])}/>
        </div>
    );
}
