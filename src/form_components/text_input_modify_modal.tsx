import { ComponentPropsWithoutRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
    initialvalue: string
    fieldname: string
    setcurrentvalue: (field: string, value: string) => void
}

function TextInputModifyModal(props: Props) {
    const [currentValue, setCurrentValue] = useState(props.initialvalue ?? "");

    let inputChanged = false;
    if (props.initialvalue !== currentValue) {
        if (currentValue) {
            inputChanged = true;
        }
    }

    return (
        <input
            className={`input ${inputChanged ? 'is-warning' : ''}`}
            type="text"
            placeholder={props.initialvalue}
            value={currentValue}
            onChange={e => {
                setCurrentValue(e.target.value)
                props.setcurrentvalue(props.fieldname, e.target.value ? e.target.value : props.initialvalue)
            }}
            {...props}
        ></input>
    );
}

export default TextInputModifyModal