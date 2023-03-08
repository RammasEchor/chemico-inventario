import { Field } from "formik"

interface TextInputProps {
    name: string,
    label: string
    type?: string
    value?: string
}

function TextInputNoMod(props: TextInputProps) {
    return (
        <div className="is-flex is-flex-direction-column mb-3">
            <label className="is-size-5" htmlFor={props.name}>{props.label}</label>
            <Field
                name={props.name}
                type={props.type ? props.type : 'text'}
                className='input'
                disabled
                value={props.value}
            />
        </div>
    )
}

export { TextInputNoMod }

