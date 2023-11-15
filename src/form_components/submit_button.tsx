import { ComponentPropsWithoutRef } from "react";
import "../css/inventario.css";

interface SubmitButtonProps extends ComponentPropsWithoutRef<'button'> {
    text?: string
    className?: string
}

function SubmitButton(props: SubmitButtonProps) {
    return (
        <div className="is-flex is-justify-content-flex-end mt-6 mb-3 mr-3">
            <div className="is-flex-grow-4" />
            <button
                className={`
                    is-responsive 
                    button 
                    is-outlined 
                    is-info 
                    is-large 
                    is-right
                    fullwidthwhenmobile
                    is-flex-grow-1
                `}
                type="submit"
                {...props}
            >
                {props.text ? props.text : 'Enviar'}
            </button>
        </div>
    );
}

export default SubmitButton