import { useField } from "formik";

function TextInputWithName({ label, ...props }: { label: string, [x: string]: any; }) {
    const [field, meta] = useField(props as any);
    return (
        <div className="field">
            {/* <label className="label is-medium" htmlFor={props.id || props.name}>{label}</label> */}
            <div className="control">
                <input {...field} {...props} className="input is-medium" placeholder={label} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        </div>
    );
}

export default TextInputWithName