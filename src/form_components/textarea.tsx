import { Field } from "formik";
import React from "react";

interface TextAreaProps {
    name: string
    placeholder?: string
}

function TextArea(props: TextAreaProps) {
    return (
        <Field
            name={props.name}
            type='textarea'
            as='textarea'
            className='textarea'
            placeholder={props.placeholder}
        />
    );
}

export default TextArea