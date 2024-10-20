import { Toast } from "primereact/toast";
import React, { useContext, useRef } from "react";

export const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
    const notification = useRef(null);

    const show = (message) => {
        notification.current.show(message);
    };

    return (
        <NotificationContext.Provider value={{
            showNotification: show
        }}>
            <Toast ref={notification} />
            { children }
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
