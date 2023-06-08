import { Field } from "formik";
import { ComponentPropsWithoutRef } from "react";

interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
    name: string,
    type?: string,
    className?: string,
    placeholder?: string,
    value?: string
}

function TextInput({ name, type, className, placeholder, value, ...rest }: TextInputProps) {
    return (
        <Field
            name={name}
            type={type ? type : 'text'}
            className={`input ${className}`}
            placeholder={placeholder}
            value={value}
            {...rest}
        />
    );
}

export default TextInput