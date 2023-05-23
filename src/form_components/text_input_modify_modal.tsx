import { ComponentPropsWithoutRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
    initialValue: string
    fieldName: string
    setCurrentValue: (field: string, value: string) => void
}

function TextInputModifyModal(props: Props) {
    const [currentValue, setCurrentValue] = useState(props.initialValue);

    let inputChanged = false;
    if (props.initialValue !== currentValue) {
        if (currentValue) {
            inputChanged = true;
        }
    }

    return (
        <input
            className={`input ${inputChanged ? 'is-warning' : ''}`}
            type="text"
            placeholder={props.initialValue}
            value={currentValue}
            onChange={e => {
                setCurrentValue(e.target.value)
                props.setCurrentValue(props.fieldName, e.target.value ? e.target.value : props.initialValue)
            }}
        ></input>
    );
}

export default TextInputModifyModal