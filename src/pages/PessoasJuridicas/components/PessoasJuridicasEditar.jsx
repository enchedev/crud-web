import { useEffect, useState } from "react";
import { InputMask } from "../../../components/InputMask";
import { InputText } from "../../../components/InputText";
import { TabPanel } from "primereact/tabview";
import { InputNumber } from "../../../components/InputNumber";
import { Calendar } from "../../../components/Calendar";
import { pessoasJuridicasService } from "../pessoaJuridicaService";
import { TabForm } from "../../../components/TabForm";

export function PessoasJuridicasEditar() {
    const [pessoa, setPessoa] = useState(pessoasJuridicasService.criar());

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
        if (pessoa.endereco.cep.value.includes("_") || pessoa.endereco.cep.value.length < 8) return;
        (async () => {
            let result = await fetch(`https://opencep.com/v1/${pessoa.endereco.cep.value.replace("-", "")}`).then(response => response.json());
            if (result.error == undefined) {
                setPessoa({ ...pessoa, endereco: { ...pessoa.endereco,
                    rua: { value: result.logradouro },
                    bairro: { value: result.bairro },
                    cidade: { value: result.localidade },
                    estado: { value: result.uf }
                }});
            }
        })();
    }, [pessoa.endereco.cep]);

    return (
        <div>
            <TabForm
                header="Pessoa Jurídica"
                icon="fa fa-user"
                service={pessoasJuridicasService}
                value={pessoa}
                setValue={setPessoa}
            >
                <TabPanel header="Informações básicas">
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <InputText required id="nome" title="Nome" placeholder="Digite o nome..." value={pessoa?.nome.value} onChange={handleChange}/>
                        <InputText required id="nomeFantasia" title="Nome Fantasia" placeholder="Digite o nome fantasia..." value={pessoa?.nomeFantasia.value} onChange={handleChange}/>
                        <InputMask required id="cnpj" title="CNPJ" placeholder="Digite o CNPJ..." value={pessoa?.cnpj.value} mask="99.999.999/9999-99" onChange={handleChange}/>
                        <Calendar required id="nascimento" title="Data de Fundação" showTime={false} value={pessoa?.nascimento.value == null ? null : new Date(pessoa?.nascimento.value)} onChange={handleChange}/>
                    </div>
                </TabPanel>
                <TabPanel header="Endereço">
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <InputText required id="endereco.rua" title="Rua" placeholder="Digite a rua..." value={pessoa?.endereco?.rua.value} onChange={handleChange}/>
                        <InputNumber required id="endereco.numero" title="Número" placeholder="Digite o número..." value={pessoa?.endereco?.numero.value} onChange={handleChange}/>
                        <InputText required id="endereco.bairro" title="Bairro" placeholder="Digite o bairro..." value={pessoa?.endereco?.bairro.value} onChange={handleChange}/>
                        <InputText required id="endereco.cidade" title="Cidade" placeholder="Digite a cidade..." value={pessoa?.endereco?.cidade.value} onChange={handleChange}/>
                        <InputText required id="endereco.estado" title="Estado" placeholder="Digite o estado..." value={pessoa?.endereco?.estado.value} onChange={handleChange}/>
                        <InputMask required id="endereco.cep" title="CEP" placeholder="Digite o cep..." value={pessoa?.endereco?.cep.value} mask="99999-999" onChange={handleChange}/>
                    </div>
                </TabPanel>
            </TabForm>
        </div>
    );
}
