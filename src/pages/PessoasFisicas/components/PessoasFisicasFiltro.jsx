import { InputMask } from "../../../components/InputMask";
import { InputText } from "../../../components/InputText";

export function PessoasFisicasFiltro({ query, handleChange }) {
    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <InputText id="nome" title="Nome" placeholder="Procure pelo nome..." value={query?.nome?.value} onChange={handleChange}/>
            <InputMask id="cpf" title="CPF" placeholder="Procure pelo CPF..." mask="999.999.999-99" value={query?.cpf?.value} onChange={handleChange}/>
        </div>
    );
}
