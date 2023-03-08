import { PropsWithChildren } from "react";
import { Select } from "./select";

interface SelectWithLabelProps {
    name?: string
    label: string
}

function SelectWithLabel(props: PropsWithChildren & SelectWithLabelProps) {
    return (
        <>
            <label className="is-size-5">{props.label}</label>
            <div className="select is-info mb-3 is-fullwidth">
                <Select name={props.name}>
                    {props.children}
                </Select>
            </div>
        </>
    );
}

export { SelectWithLabel };

