import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";

export function PessoasFisicasTabela({ value }) {
    const navigate = useNavigate();

    return (
        <DataTable value={value} paginator rows={10} rowsPerPageOptions={[5, 10, 15, 20]} onRowDoubleClick={(e) => navigate(`/pessoas-fisicas/${e.data.id}`)} emptyMessage="Nenhum dado encontrado...">
            <Column style={{ width: "30rem" }} header="Nome" field="nome"/>
            <Column style={{ width: "30rem" }} header="CPF" field="cpf"/>
            <Column style={{ width: "25rem" }} header="Data de Nascimento" body={({ nascimento }) => new Date(nascimento).toLocaleDateString()}/>
        </DataTable>
    );
}
