import { useState } from "react";
import FileForm from "./file_form";

interface UploadFileModalProps {
    onClickX?: () => void
    onClickCancel?: () => void
    onClickAprobar: (file: File) => void
}

function QuoteDetail(props: UploadFileModalProps) {
    const [file, setFile] = useState<File>(new File([], 'dummy'));

    return (
        <div className="model-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Subir PDF</p>
                <button className="delete" aria-label="close" onClick={props.onClickX} />
            </header>
            <section className="modal-card-body">
                <FileForm onChange={setFile} />
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={() => props.onClickAprobar(file)}>Enviar</button>
                <button className="button" onClick={props.onClickX}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };
