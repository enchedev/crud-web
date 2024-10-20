import { useEffect, useState } from "react";
import { pessoasFisicasService } from "../pessoaFisicaService";
import { InputMask } from "../../../components/InputMask";
import { InputText } from "../../../components/InputText";
import { TabPanel } from "primereact/tabview";
import { InputNumber } from "../../../components/InputNumber";
import { Calendar } from "../../../components/Calendar";
import { TabForm } from "../../../components/TabForm";

export function PessoasFisicasEditar() {
    const [pessoa, setPessoa] = useState(pessoasFisicasService.criar());

    const handleChange = ({ key, value, parent, recurse = false }) => {
        if (!(key.includes(".") || recurse)) setPessoa({ ...pessoa, [key]: value });
        let keys = key.split(".");
        if (keys.length > 1) {
            if (typeof(pessoa[keys[0]]) === "object") {
                setPessoa({ ...pessoa, [keys[0]]: handleChange({ key: keys.slice(1).join("."), value, parent: pessoa[keys[0]], recurse: true }) });
            } else {
                return { ...parent, [keys[0]]: handleChange({ key: keys.slice(1).join("."), value, recurse: true }) };
            }
        } else {
            return { ...parent, [key]: value };
        }
    };

    useEffect(() => {
        if (pessoa.endereco.cep.value.length === 0) return;
        (async () => {
            let result = await fetch(`https://opencep.com/v1/${pessoa.endereco.cep.value.replace("-", "")}`).then(response => response.json());
            setPessoa({ ...pessoa, endereco: { ...pessoa.endereco,
                rua: { value: result.logradouro },
                bairro: { value: result.bairro },
                cidade: { value: result.localidade },
                estado: { value: result.uf }
            }});
        })();
    }, [pessoa.endereco.cep]);

    return (
        <div>
            <TabForm
                header="Pessoa Física"
                icon="fa fa-user"
                service={pessoasFisicasService}
                value={pessoa}
                setValue={setPessoa}
            >
                <TabPanel header="Informações básicas">
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <InputText required id="nome" title="Nome" placeholder="Digite o nome..." value={pessoa?.nome.value} onChange={handleChange} />
                        <InputMask required id="cpf" title="CPF" placeholder="Digite o CPF..." value={pessoa?.cpf.value} mask="999.999.999-99" onChange={handleChange} />
                        <Calendar required id="nascimento" title="Data de Nascimento" showTime={false} value={pessoa?.nascimento.value == null ? null : new Date(pessoa?.nascimento.value)} onChange={handleChange}/>
                    </div>
                </TabPanel>
                <TabPanel header="Endereço">
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <InputText required id="endereco.rua" title="Rua" placeholder="Digite a rua..." value={pessoa?.endereco?.rua.value} onChange={handleChange} />
                        <InputNumber required id="endereco.numero" title="Número" placeholder="Digite o número..." value={pessoa?.endereco?.numero.value} onChange={handleChange} />
                        <InputText required id="endereco.bairro" title="Bairro" placeholder="Digite o bairro..." value={pessoa?.endereco?.bairro.value} onChange={handleChange} />
                        <InputText required id="endereco.cidade" title="Cidade" placeholder="Digite a cidade..." value={pessoa?.endereco?.cidade.value} onChange={handleChange} />
                        <InputText required id="endereco.estado" title="Estado" placeholder="Digite o estado..." value={pessoa?.endereco?.estado.value} onChange={handleChange} />
                        <InputMask required id="endereco.cep" title="CEP" placeholder="Digite o cep..." value={pessoa?.endereco?.cep.value} mask="99999-999" onChange={handleChange} />
                    </div>
                </TabPanel>
            </TabForm>
        </div>
    );
}
