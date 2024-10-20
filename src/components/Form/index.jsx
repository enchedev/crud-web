import { useEffect } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { decairObjeto } from "../../utils/validacoes";

export function Form({ header, icon, service, query, setValue, children }) {
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const handleListar = async (query) => {
        try {
            setValue(await service.listar(query != null ? decairObjeto(query) : query));
        } catch (exception) {
            showNotification({ severity: "error", detail: exception.error.message });
        }
    };

    useEffect(() => {
        (async () => await handleListar(null))();
    }, []);

    return (
        <div>
            <div style={{background: "#252525", borderRadius: "10px", padding: "20px", marginBottom: "20px", border: "0.6mm solid #353535"}}>
                <div style={{display: "flex", alignItems: "center", padding: "10px 10px 0px 0px", gap: "5px"}}>
                    <i className={icon} />
                    <p style={{fontSize: "20px", margin: "0px", padding: "0px"}}>{header}</p>
                </div>
                <Divider />
                <div style={{paddingBottom: "10px", height: "100%"}}>
                    { children }
                </div>
                <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
                    <Button size="large" icon="fa fa-magnifying-glass" label="Procurar" onClick={async () => handleListar(query)}/>
                    <Button size="large" icon="fa fa-plus" label="Novo" onClick={() => navigate("new")}/>
                </div>
            </div>
        </div>
    );
}
