
interface LoadingModalProps {
    show: boolean
}

function LoadingModal(props: LoadingModalProps) {
    return (
        <div className={`modal ${props.show && "is-active"}`}>
            <div className="modal-background"></div>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">Cargando...</p>
                </header>
            </div>
        </div>
    );
}

export default LoadingModal