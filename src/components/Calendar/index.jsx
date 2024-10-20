import { Calendar as PCalendar } from "primereact/calendar";
import { useState } from "react";

export function Calendar(props) {
    const [focused, setFocused] = useState(false);

    const handleChange = (e) => {
        props.onChange?.({ key: props.id, value: { required: props.required, value: e.target.value }});
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor={props.id}>{props.title}{ props.required && !focused && props.value == null ? <span style={{color: "red"}}>*</span> : <></> }</label>
            <PCalendar {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Selecione uma data..." onChange={handleChange}/>
            { props.required && !focused && props.value == null ? <small style={{opacity: 0.8}}>Campo obrigatório</small> : <></> }
        </div>
    );
}
