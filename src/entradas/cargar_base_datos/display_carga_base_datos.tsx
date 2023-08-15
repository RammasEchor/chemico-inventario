import { useNavigate } from "react-router";
import { uploadPurchaseOrderFileToDatabase } from "../../apis/api_orden_compra";
import { UploadFile } from "../../form_components/modal_upload_file";

function DisplayCargarBaseDatos() {
    const navigate = useNavigate();

    function startUpload(file: File) {
        uploadPurchaseOrderFileToDatabase(file)
            .then(res => {
                if (res.ok) {
                    res.text().then(info_to_show => {
                        alert(info_to_show)
                        navigate(0);
                    })
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <UploadFile
            onClickAprobar={startUpload}
            onClickX={() => navigate(0)}
        />
    )
}

export default DisplayCargarBaseDatos