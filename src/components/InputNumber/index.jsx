import { InputNumber as PInputNumber } from "primereact/inputnumber";
import { useState } from "react";

export function InputNumber(props) {
    const [focused, setFocused] = useState(false);

    const handleChange = (e) => {
        props.onChange?.({ key: props.id, value: { required: props.required, value: e.value }});
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor={props.id}>{props.title}{ props.required && !focused && props.value == null ? <span style={{color: "red"}}>*</span> : <></> }</label>
            <PInputNumber {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleChange}/>
            { props.required && !focused && props.value == null ? <small style={{opacity: 0.8}}>Campo obrigatório</small> : <></> }
        </div>
    );
}
