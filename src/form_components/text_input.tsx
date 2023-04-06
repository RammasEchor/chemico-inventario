import { Field } from "formik";
import { ComponentPropsWithoutRef } from "react";

function TextInput({...props}: ComponentPropsWithoutRef<'input'>) {
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