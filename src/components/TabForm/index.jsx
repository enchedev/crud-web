import { useNotification } from "../../contexts/NotificationContext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { TabView } from "primereact/tabview";
import { useEffect } from "react";
import { useDialog } from "../../contexts/DialogContext";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { Dialog } from "primereact/dialog";
import { decairObjeto, promoverObjeto } from "../../utils/validacoes";

export function TabForm({ header, icon, service, value, setValue, children }) {
    const navigate = useNavigate();
    const { showDialog, hideDialog } = useDialog();
    const { showNotification } = useNotification();
    const { id } = useParams();

    useEffect(() => {
        if (id !== "new") {
            (async () => {
                try {
                    setValue(promoverObjeto(await service.buscar(id), service.criar()));
                } catch (exception) {
                    showNotification({ severity: "error", detail: exception.error.message });
                }
            })();
        }
    }, [id]);

    const handleAtualizar = async (value) => {
        console.log(value);
        let camposNaoPreenchidos = service.validar(value);
        if (camposNaoPreenchidos) {
            showDialog(<Dialog header="Aviso">Existem <b>{camposNaoPreenchidos}</b> campo(s) não preenchido(s)!</Dialog>);
            return false;
        }

        try {
            await service.atualizar(id, decairObjeto(value));
        } catch (exception) {
            showNotification({ severity: "error", detail: exception.error.message });
        }
        showNotification({ severity: "success", detail: "Updated successfully!" });
        return true;
    };

    const handleSalvar = async (value) => {
        let camposNaoPreenchidos = service.validar(value);
        if (camposNaoPreenchidos) {
            showDialog(<Dialog header="Aviso">Existem <b>{camposNaoPreenchidos}</b> campo(s) não preenchido(s)!</Dialog>);
            return false;
        }

        try {
            await service.salvar(decairObjeto(value));
        } catch (exception) {
            showNotification({ severity: "error", detail: exception.error.message });
        }
        showNotification({ severity: "success", detail: "Saved successfully!" });
        return true;
    };

    const handleDeletar = async (id) => {
        try {
            await service.deletar(id);
        } catch (exception) {
            showNotification({ severity: "error", detail: exception.error.message });
        }
        showNotification({ severity: "success", detail: "Deleted successfully!" });
    };

    return (
        <div>
            <div style={{background: "#252525", borderRadius: "10px", padding: "20px", marginBottom: "20px", border: "0.6mm solid #353535"}}>
                <div style={{display: "flex", alignItems: "center", padding: "10px 10px 0px 0px", gap: "5px"}}>
                    <i className={icon} />
                    <p style={{fontSize: "20px", margin: "0px", padding: "0px"}}>{header}</p>
                </div>
                <Divider />
                <TabView>
                { children }
                </TabView>
                <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
                    {
                        id !== "new"
                            ? <>
                                <Button size="large" icon="fa fa-trash" label="Deletar" onClick={() => {
                                    showDialog(
                                        <ConfirmationDialog
                                            header="Confirmação de exclusão"
                                            message="Você tem certeza que deseja deletar esta entidade?"
                                            onYes={async () => await handleDeletar(id).then(() => hideDialog()).then(() => navigate(-1))}
                                            onNo={hideDialog}
                                            onClose={() => navigate(-1) }
                                        />
                                    );
                                }}/>
                            </>
                            : <>
                            </>
                    }
                    <Button size="large" icon="fa fa-floppy-disk" label="Salvar" onClick={async () =>
                        (id === "new" ? handleSalvar(value) : handleAtualizar(value)).then((result) => { if (result) navigate(-1); })
                    }/>
                    <Button size="large" icon="fa fa-arrow-left" label="Voltar" onClick={() => navigate(-1)}/>
                </div>
            </div>
        </div>
    );
}
