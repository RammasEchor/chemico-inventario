import { FieldHookConfig, useField } from "formik";
import TextInput from "./text_input";

interface TextInputProps {
    name: string,
    type?: string,
    label: string,
    placeholder?: string
    value?: string
}

function TextInputLabelWarning(props: TextInputProps & FieldHookConfig<string>) {
    const [, meta] = useField(props);
    return (
        <div className="is-flex is-flex-direction-column mb-3">
            <label className="is-size-5" htmlFor={props.name}>{props.label}</label>
            <TextInput name={props.name} type={props.type} placeholder={props.placeholder} value={props.value}/>
            {meta.touched && meta.error ? (
                <div className="has-text-danger">{meta.error}</div>
            ) : null}
        </div>
    );
}

export default TextInputLabelWarning