import { useMemo, useState } from "react";
import { pessoasFisicasService } from "./pessoaFisicaService";
import { Form } from "../../components/Form";
import { PessoasFisicasFiltro } from "./components/PessoasFisicasFiltro";
import { PessoasFisicasTabela } from "./components/PessoasFisicasTabela";

export function PessoasFisicas() {
    const [pessoasFisicas, setPessoasFisicas] = useState([]);
    const [query, setQuery] = useState(null);

    return (
        <div>
            <Form
                header="Pessoas Físicas"
                icon="fa fa-user"
                service={pessoasFisicasService}
                query={query}
                setValue={setPessoasFisicas}
            >
                <PessoasFisicasFiltro query={query} setQuery={setQuery} />
            </Form>
            <PessoasFisicasTabela value={useMemo(() => pessoasFisicas, [pessoasFisicas])}/>
        </div>
    );
}
