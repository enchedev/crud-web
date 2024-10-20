import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";

export function SidebarEntry({ label, icon, description, location, expanded }) {
    const [hovered, setHovered] = useState(false);
    const currentLocation = useLocation();
    const tooltip = useRef(null);
    const navigate = useNavigate();

    return (
        <div>
            <Tooltip ref={tooltip} target=".sidebar-entry-tooltip" mouseTrack mouseTrackTop={35} mouseTrackLeft={5} showDelay={450} />
            <span className="sidebar-entry-tooltip" data-pr-tooltip={description}>
                <div
                    className={`sidebar-entry sidebar-entry${ currentLocation.pathname.includes(location) ? "-selected" : hovered ? "-hovered" : ""}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => navigate(location)}
                    style={{marginBottom: "5px"}}
                >
                    <div style={{display: "flex", width: "50px", height: "50px", justifyContent: "center", alignItems: "center", paddingRight: "5px"}}>
                        <i className={`${icon} fa-xl`} />
                    </div>
                    <div style={{display: "flex", alignItems: "center", textWrap: "nowrap"}}>
                        <p className={`sidebar-entry-label-${expanded ? "expanded" : "retracted"}`} style={{margin: "0px"}}>{label}</p>
                    </div>
                </div>
            </span>
        </div>
    );
}
