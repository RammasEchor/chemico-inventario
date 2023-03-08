import { Field } from "formik";
import { PropsWithChildren } from "react";

interface SelectProps   {
    name?: string
}

function Select(props: PropsWithChildren & SelectProps) {
    return (
        <Field className="is-fullwidth" name={props.name} as="select">
            {props.children}
        </Field>
    );
}

export { Select };

