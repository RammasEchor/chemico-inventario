import { Field } from "formik";
import { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
    name: string
}

function Select({ name, ...rest }: SelectProps) {
    return (
        <Field className="is-fullwidth" name={name} as="select" {...rest}>
            {rest.children}
        </Field>
    );
}

export { Select };

