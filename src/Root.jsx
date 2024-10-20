import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { NotificationProvider } from './contexts/NotificationContext';
import { DialogProvider } from './contexts/DialogContext';

import './Root.css'

export default function Root() {
    return (
        <DialogProvider>
            <NotificationProvider>
                <div>
                    <div style={{display: "flex"}}>
                        <Sidebar/>
                        <div id="content" style={{width: "100%", margin: "20px"}}>
                            <Outlet />
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", width: "100%", position: "absolute", bottom: "0%"}}>
                        <p style={{opacity: "0.7"}}>
                            Made with 🍻 by
                                <i style={{color: "rgb(159, 168, 218)", cursor: "pointer"}} onClick={() => window.location.href = "https://github.com/enchedev"}>EncheDev</i>
                        </p>
                    </div>
                </div>
            </NotificationProvider>
        </DialogProvider>
    );
}
