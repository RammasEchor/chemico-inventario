import { ComponentPropsWithoutRef } from "react";
import { Select } from "./select";

interface SelectWithLabelProps extends ComponentPropsWithoutRef<'select'> {
    name: string
    label: string
}

function SelectWithLabel({ label, name, ...rest }: SelectWithLabelProps) {
    return (
        <>
            <label className="is-size-5">{label}</label>
            <div className="select is-info mb-3 is-fullwidth">
                <Select name={name} {...rest}>
                    {rest.children}
                </Select>
            </div>
        </>
    );
}

export { SelectWithLabel };

