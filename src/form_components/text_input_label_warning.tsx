import { useField } from 'formik';
import type { ComponentPropsWithoutRef } from "react";

interface TextInputLabelWarningProps extends ComponentPropsWithoutRef<'input'> {
    label?: string,
    name: string
}

function TextInputLabelWarning({ label, name, className, ...rest }: TextInputLabelWarningProps) {
    const [field, meta] = useField(name);
    return (
        <div className="is-flex is-flex-direction-column mb-3">
            <label className="is-size-5" htmlFor={name}>{label}</label>
            <input className={`input ${className}`} {...field} {...rest} />
            {meta.touched && meta.error ? (
                <div className="has-text-danger">{`${meta.error}`}</div>
            ) : null}
        </div>
    );
}

export default TextInputLabelWarning