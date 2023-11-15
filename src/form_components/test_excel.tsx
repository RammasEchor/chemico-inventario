import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import Tabla from "./table";

function TestExcel()    {
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "tablaEnExcel"
    });

    return(
        <>
            <Tabla ref={tableRef}
                cols={[
                    'Test',
                    'Test2'
                ]}
            >
                <tr>
                    <td>Testing</td>
                    <td>Testing</td>
                </tr>
                <tr>
                    <td>Testing1</td>
                    <td>Testing5</td>
                </tr>
                <tr>
                    <td>Testing2</td>
                    <td>Testing3</td>
                </tr>
            </Tabla>
            <button onClick={onDownload}>Export excel</button>
        </>
    );
}

export default TestExcel;
