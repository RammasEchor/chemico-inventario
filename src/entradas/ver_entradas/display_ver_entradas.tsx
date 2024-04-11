import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPurchaseOrderItemList } from "../../apis/api_orden_compra";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";

function DisplayVerEntradas() {
    const [items, setItems] = useState<string[]>([])
    const [selectedItem, setSelectedItem] = useState<string>();

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
                    <div className="column is-offset-3 is-3 is-four-fifths-mobile is-offset-1-mobile">
                        <TextInputLabelWarning name='searchString' label='Orden de Compra' />
                    </div>
                    <div className="column is-bfour-fifths-mobile is-offset-1-mobile mt-1">
                        <button
                            className="button is-info mt-3"
                            type="submit"
                        >
                            Ir a Orden de Compra
                        </button>
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