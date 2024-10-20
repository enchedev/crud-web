import { InputMask as PInputMask } from "primereact/inputmask";
import { useState } from "react";

export function InputMask(props) {
    const [focused, setFocused] = useState(false);

    const handleChange = (e) => {
        props.onChange?.({ key: props.id, value: { required: props.required, value: e.target.value }});
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor={props.id}>{props.title}{ props.required && !focused && props.value.length === 0 ? <span style={{color: "red"}}>*</span> : <></> }</label>
            <PInputMask {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleChange}/>
            { props.required && !focused && props.value.length === 0 ? <small style={{opacity: 0.8}}>Campo obrigatório</small> : <></> }
        </div>
    );
}
