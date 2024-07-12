import { LoadingBar } from "chemico-ui";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import useProductosController from "../../../controllers/productosController";
import Tabla from "../../../form_components/table";
import { dateParser } from "../../../utilities/date_parser";

function FormularioReporteCaducidad() {
    const { getCaducidadesQuery } = useProductosController();
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "reporteDeCaducidad"
    });

    if (getCaducidadesQuery.isLoading || getCaducidadesQuery.isFetching) {
        return (
            <LoadingBar></LoadingBar>
        );
    }

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Reporte de Caducidad</h4>
            <Tabla ref={tableRef} cols={[
                'No. de Parte',
                'Descripción',
                'Fecha de Expiración',
                'Días Restantes',
                'Planta',
                'Lote',
                'Fecha Ingreso'
            ]}>
                {getCaducidadesQuery.data!.map(caducidad =>
                    <tr
                        key={caducidad.no_parte}
                    >
                        <td className={redIfNull(caducidad.no_parte)}>
                            {caducidad.no_parte ? caducidad.no_parte : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.descripcion)}>
                            {caducidad.descripcion ? caducidad.descripcion : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.fecha_exp)}>
                            {caducidad.fecha_exp ? dateParser(caducidad.fecha_exp) : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.dias_entre_fechas)}>
                            {caducidad.dias_entre_fechas ? caducidad.dias_entre_fechas : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.planta)}>
                            {caducidad.planta ? caducidad.planta : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.lote)}>
                            {caducidad.lote ? caducidad.lote : "Faltante"}
                        </td>
                        <td className={redIfNull(caducidad.fechaIngreso)}>
                            {caducidad.fechaIngreso ? dateParser(caducidad.fechaIngreso) : "Faltante"}
                        </td>
                    </tr>
                )}
            </Tabla>
            <div className="is-flex is-justify-content-flex-end mt-5">
                <button className="button is-info is-large mr-5" type="button" onClick={onDownload}>Descargar Excel</button>
            </div>
        </div>
    );
};

export default FormularioReporteCaducidad;