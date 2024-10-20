import { InputMask } from "../../../components/InputMask";
import { InputText } from "../../../components/InputText";

export function PessoasJuridicasFiltro({ query, handleChange }) {
    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
            <InputText id="nome" title="Nome" placeholder="Procure pelo nome..." value={query?.nome?.value} onChange={handleChange} />
            <InputText id="nomeFantasia" title="Nome Fantasia" placeholder="Procure pelo nome fantasia..." value={query?.nomeFantasia?.value} onChange={handleChange} />
            <InputMask id="cnpj" title="CNPJ" placeholder="Procure pelo CNPJ..." mask="99.999.999/9999-99" value={query?.cnpj?.value} onChange={handleChange} />
        </div>
    );
}
