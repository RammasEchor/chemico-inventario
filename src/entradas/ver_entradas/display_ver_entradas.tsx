import { Button } from "chemico-ui";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPurchaseOrderItemList } from "../../apis/api_orden_compra";
import DatePickerField from "../../form_components/datepicker";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { useAuth } from "../../login/auth-provider/auth_provider";

function DisplayVerEntradas() {
    const [items, setItems] = useState<string[]>([])
    const [selectedItem, setSelectedItem] = useState<string>();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [fileType, setFileType] = useState("PDF");
    const { userKey } = useAuth();

    useEffect(() => {
        getPurchaseOrderItemList()
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
            .catch(error => console.log(error))
    }, [])

    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                searchString: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                navigate(`/qr_orden_compra?id=${values.searchString}`)
            }}
        >
            <Form>
                <div className="columns is-vcentered">
                    <div className="column is-offset-1 is-3 is-four-fifths-mobile is-offset-1-mobile">
                        <TextInputLabelWarning name='searchString' label='Orden de Compra' />
                    </div>
                    <div className="column is-2 is-four-fifths-mobile is-offset-1-mobile mt-1">
                        <button
                            className="button is-info mt-3"
                            type="submit"
                        >
                            Ir a Orden de Compra
                        </button>
                    </div>
                    <div className="column">
                        <div className="is-flex mt-4">
                            <div className="mr-2">
                                <label className="label">Fecha Inicio</label>
                                <DatePickerField
                                    selected={startDate}
                                    onChange={e => setStartDate(e)}
                                />
                            </div>
                            <div className="">
                                <label className="label">Fecha Fin</label>
                                <DatePickerField
                                    selected={endDate}
                                    onChange={e => setEndDate(e)}
                                />
                            </div>
                            <div className="control is-flex is-flex-direction-column mt-4 ml-3 is-justify-content-center">
                                <div className="mb-2">
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="fileType"
                                            checked
                                            onClick={() => setFileType("PDF")}
                                        />
                                        PDF
                                    </label>
                                </div>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="fileType"
                                        onClick={() => setFileType("EXCEL")}
                                    />
                                    Excel
                                </label>
                            </div>
                            <div className="mt-5 ml-5">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = `http://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/solicitud/download?tipo=${fileType}&pCve=${userKey}&pIni=${startDate.getFullYear()}-${startDate.getMonth().toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}&pFin=${endDate.getFullYear()}-${endDate.getMonth().toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
                                    }}
                                >Imprimir Reporte de Entrada</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="table-container">
                    <table className="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th className="has-text-centered">No. Orden de Compra</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th className="has-text-centered">No. Orden de Compra</th>
                                <th>Acción</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {items.map(item =>
                                <tr
                                    key={item}
                                    className={selectedItem === item ? "is-selected" : ""}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <td className="has-text-centered">{item}</td>
                                    <td><button
                                        className="button is-info"
                                        onClick={() => navigate(`/qr_orden_compra?id=${item}`)}
                                        type="button"
                                    >Ver Detalle</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Form>
        </Formik>
    )
}

export default DisplayVerEntradas