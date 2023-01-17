import { Field } from "formik";

interface TextInputProps {
    name: string,
    type?: string,
}

function TextInput(props: TextInputProps) {
    return (
        <Field
            name={props.name}
            type={props.type ? props.type : 'text'}
            className='input'
        />
    );
}

export default TextInput