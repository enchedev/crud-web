import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export function ConfirmationDialog({ header, message, onYes, onNo, onHide, visible }) {
    return (
        <Dialog header={header} visible={visible} onHide={onHide} style={{width: "35%", height: "250px"}}>
            <div style={{ height: "65%", fontSize: "20px"}}>
                { message }
            </div>
            <div style={{display: "flex", justifyContent: "right", gap: "10px"}}>
                <Button size="large" icon="fa fa-check" label="Sim" onClick={onYes}/>
                <Button size="large" icon="fa fa-x" label="Não" onClick={onNo}/>
            </div>
        </Dialog>
    );
}
