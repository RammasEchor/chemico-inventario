import { Field } from "formik";
import { StringSchema } from "yup";

interface TextInputProps {
    name: string,
    type?: string,
    placeholder?: string
    value?: StringSchema
}

function TextInput(props: TextInputProps) {
    return (
        <Field
            name={props.name}
            type={props.type ? props.type : 'text'}
            className='input'
            placeholder={props.placeholder}
            value={props.value}
        />
    );
}

export default TextInput