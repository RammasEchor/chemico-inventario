import "../css/inventario.css";

interface WithdrawButtonProps {
    text?: string
}

function WithdrawButton(props: WithdrawButtonProps) {
    return (
        <div className="is-flex is-justify-content-flex-end mt-6 mb-3 mr-3">
            <div className="is-flex-grow-4" />
            <button
                className={`
                    is-responsive 
                    button 
                    is-outlined 
                    is-danger 
                    is-large 
                    is-right
                    fullwidthwhenmobile
                    is-flex-grow-1
                `}
                type="submit"
            >
                {props.text ? props.text : 'Enviar'}
            </button>
        </div>
    );
}

export default WithdrawButton