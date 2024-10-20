import React, { useContext, useState } from "react";

export const DialogContext = React.createContext();

export function DialogProvider({ children }) {
    const [dialog, setDialog] = useState(null);

    const show = (dialog) => {
        setDialog({ ...dialog, props: { ...dialog.props, visible: true, onHide: () => {
            dialog?.props?.onHide?.();
            hide();
        }}});
    };

    const hide = () => {
        setDialog(null);
    };

    return (
        <DialogContext.Provider value={{
            showDialog: show,
            hideDialog: hide,
        }}>
            { dialog }
            { children }
        </DialogContext.Provider>
    );
}

export function useDialog() {
    return useContext(DialogContext);
}
