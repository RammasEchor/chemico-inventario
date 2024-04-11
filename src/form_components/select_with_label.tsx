import { useField } from "formik";
import { ComponentPropsWithoutRef } from "react";

interface SelectWithLabelProps extends ComponentPropsWithoutRef<'select'> {
    name: string
    label: string
    bulmaColor?: string
}

function SelectWithLabel({ label, bulmaColor = 'is-info', ...props }: SelectWithLabelProps) {
    const [field, meta] = useField(props);

    return (
        <>
            <label className="is-size-5" htmlFor={props.id || props.name}>{label}</label>
            <div className={`select mb-3 is-fullwidth ${bulmaColor}`}>
                <select className="is-fullwidth" {...field} {...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className="has-text-danger">{`${meta.error}`}</div>
            ) : null}
        </>
    );
}

export { SelectWithLabel };

