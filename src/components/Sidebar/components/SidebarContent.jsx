import { SidebarEntry } from "./SidebarEntry";

export function SidebarContent({ expanded, value }) {
    return (
        <div>
        {
            value.map((entry, index) => <SidebarEntry key={index} label={entry.label} icon={entry.icon} description={entry.description} location={entry.location} expanded={expanded} />)
        }
        </div>
    );
}
