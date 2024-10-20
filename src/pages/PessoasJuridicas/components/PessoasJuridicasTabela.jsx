import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";

export function PessoasJuridicasTabela({ value }) {
    const navigate = useNavigate();

    return (
        <DataTable value={value} paginator rows={10} rowsPerPageOptions={[5, 10, 15, 20]} onRowDoubleClick={(e) => navigate(`/pessoas-juridicas/${e.data.id}`)} emptyMessage="Nenhum dado encontrado...">
            <Column style={{ width: "30rem" }} header="Nome" field="nome"/>
            <Column style={{ width: "30rem" }} header="Nome Fantasia" field="nomeFantasia"/>
            <Column style={{ width: "30rem" }} header="CNPJ" field="cnpj"/>
            <Column style={{ width: "25rem" }} header="Data de Fundação" body={({ nascimento }) => new Date(nascimento).toLocaleDateString()}/>
        </DataTable>
    );
}
