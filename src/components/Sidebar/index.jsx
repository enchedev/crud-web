import { useState } from "react";
import { SidebarContent } from "./components/SidebarContent";

import "./index.css";

export function Sidebar(props) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div
            className={`sidebar sidebar-${expanded ? "expanded" : "retracted"}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            {...props}
        >
            <SidebarContent expanded={expanded} value={[
                { label: "Pessoas Físicas", icon: "fa fa-user", description: "Crie ou edite pessoas físicas", location: "/pessoas-fisicas" },
                { label: "Pessoas Jurídicas", icon: "fa fa-building", description: "Crie ou edite pessoas jurídicas", location: "/pessoas-juridicas" }
            ]}/>
        </div>
    );
}
