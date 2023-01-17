import { FieldHookConfig, useField } from "formik";
import TextInput from "./text_input";

interface TextInputProps {
    name: string,
    type?: string,
    label: string,
}

function TextInputLabelWarning(props: TextInputProps & FieldHookConfig<string>) {
    const [, meta] = useField(props);
    return (
        <div className="is-flex is-flex-direction-column mb-3">
            <label className="is-size-5" htmlFor={props.name}>{props.label}</label>
            <TextInput name={props.name} type={props.type} />
            {meta.touched && meta.error ? (
                <div className="has-text-danger">{props.label + " es requerido"}</div>
            ) : null}
        </div>
    );
}

export default TextInputLabelWarning