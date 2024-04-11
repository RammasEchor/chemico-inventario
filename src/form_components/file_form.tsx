import { Dispatch, SetStateAction, useState } from "react";
import { FaUpload } from "react-icons/fa";
import "../css/inventario.css";

interface FileFormInterface {
    onChange: Dispatch<SetStateAction<File>>
    saveFilename?: (filename: string) => void
}

function FileForm(props: FileFormInterface) {
    const [filename, setFilename] = useState("Ningún archivo seleccionado");

    return (
        <div className={`
                file 
                is-boxed 
                is-centered 
                inv-file-responsive 
                has-name
                is-large
            `}>
            <label className="file-label">
                <input className="file-input" type="file" name="resume"
                    onChange={(event) => {
                        const files = event.currentTarget.files as FileList
                        props.onChange(files[0]);
                        setFilename(files[0].name);
                        if (props.saveFilename !== undefined) {
                            props.saveFilename(files[0].name);
                        }
                    }} />
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload">
                            <FaUpload />
                        </i>
                    </span>
                    <span className="file-label">
                        Seleccionar archivo…
                    </span>
                </span>
                <span className="file-name">
                    {filename}
                </span>
            </label>
        </div>
    );
}

export default FileForm