import { ComponentPropsWithoutRef, useState } from "react";

interface Props extends ComponentPropsWithoutRef<"select"> {
    initialValue: string
    fieldName: string
    options: string[]
    setCurrentValue: (field: string, value: string) => void
}

function SelectModifyModal(props: Props) {
    const [currentValue, setCurrentValue] = useState(props.initialValue);

    return (
        <div className={`select ${currentValue !== props.initialValue ? 'is-warning' : ''}`}>
            <select
                value={currentValue}
                onChange={e => {
                    setCurrentValue(e.target.value)
                    props.setCurrentValue(props.fieldName, e.target.value ? e.target.value : props.initialValue)
                }}
            >
                {
                    props.options.map(value => <option key={value}>{value}</option>)
                }
            </select>
        </div>
    );
}

export default SelectModifyModal