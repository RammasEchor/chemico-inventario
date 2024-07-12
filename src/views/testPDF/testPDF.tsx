import { PDFViewer } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { getFetch, rootUrl } from "../../apis/api";
import { Material } from "../../apis/api_material";
import Vale from "../salidas/solicitudes_cerradas/vale";

function TestPdf() {
    const getSalidaDetailQuery = useQuery<Material[]>({
        queryKey: ["getSalidaDetailQuery", 1],
        queryFn: async () => {
            let api_url = rootUrl + process.env.REACT_APP_BACKEND_GET_SALIDAS_DETAIL;
            api_url += `${1}/`
            return getFetch(api_url);
        },
    });

    if (getSalidaDetailQuery.isSuccess) {
        <PDFViewer style={{ width: "100%", height: 1000 }}>
            <Vale solicitudMaster={{
                id: "1",
                aprobador: "Aprobador Apell1 Apell2",
                estatus: "Aporbada",
                fecha_aprob: "2024-01-10T06:00:00.000+00:00",
                solicitante: "Mercado Libre",
                total: "3000.400",
                descripcion: "Descripción",
                firma: "test"
            }}
                solicitudDetalle={getSalidaDetailQuery.data} />
        </PDFViewer>
    }

    return (
        <></>
    );
}

export default TestPdf;