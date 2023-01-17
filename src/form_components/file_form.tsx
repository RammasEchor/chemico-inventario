import { FaUpload } from "react-icons/fa";
import "../css/inventario.css";

function FileForm() {
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
                <input className="file-input" type="file" name="resume" />
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
                    Ningún archivo seleccionado
                </span>
            </label>
        </div>
    );
}

export default FileForm