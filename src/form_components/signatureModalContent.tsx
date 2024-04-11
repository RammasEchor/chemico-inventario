import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { mutationOnError, mutationOnSuccessReload, root } from '../apis/api';
import { APIStringArg } from '../apis/api_func_args_types';
import { ModalInfo } from '../views/salidas/solicitudes_pendientes/display_solicitudes_pendientes';


interface SignatureModalContentInterface {
    info: ModalInfo
    onClickCancel?: () => void
}

function SignatureModalContent(props: SignatureModalContentInterface) {
    const canvasRef = useRef() as React.MutableRefObject<any>;
    const postFirmaMutation = useMutation({
        mutationFn: async (params: { img: APIStringArg, nomImg: APIStringArg, folio: APIStringArg }) => {
            const endpoint = root + process.env.REACT_APP_BACKEND_POST_FIRMA;
            const formData = new FormData();
            formData.append("img", params.img as string);
            formData.append("nomImg", params.nomImg as string);
            formData.append("folio", params.folio as string);
            return fetch(endpoint, {
                method: "POST",
                body: formData
            });
        },
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

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
                        ref={canvasRef}
                    />
                </div>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <div className="buttons">
                    <button className="button" onClick={() => canvasRef.current.clear()}>Borrar</button>
                    <button className="button is-success" onClick={() => postFirmaMutation.mutate({
                        img: `${canvasRef.current.getTrimmedCanvas().toDataURL("image/png")}`,
                        nomImg: `${props.info.id}`,
                        folio: `${props.info.id}`
                    })}>Guardar</button>
                </div>
            </footer>
        </div>
    );
}

export default SignatureModalContent;