import SignatureCanvas from 'react-signature-canvas';
import { ModalInfo } from '../views/salidas/solicitudes_pendientes/display_solicitudes_pendientes';


interface SignatureModalContentInterface {
    info: ModalInfo
    onClickCancel?: () => void
}

function SignatureModalContent(props: SignatureModalContentInterface) {
    return (
        <div className="modal-card ">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.info.title} </p>
                <button className="delete" aria-label="close" onClick={props.onClickCancel} />
            </header>
            <section className="modal-card-body">
                <div className="has-background-white">
                    <SignatureCanvas
                        canvasProps={{
                            width: 500,
                            height: 200,
                            className: "sigCanvas",
                        }}
                    />
                </div>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
            </footer>
        </div>
    );
}

export default SignatureModalContent;