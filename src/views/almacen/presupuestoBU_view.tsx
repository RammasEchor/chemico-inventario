import { LoadingBar } from "chemico-ui";
import { useState } from "react";
import { useGetAlmacen, usePutAlmacen } from "../../controllers/almacenController";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import TextInputModifyModal from "../../form_components/text_input_modify_modal";
import Almacen from "../../models/almacen";

function PresupuestoBUView() {
    const getAlmacenesQuery = useGetAlmacen();
    const putAlmacenMutation = usePutAlmacen();
    const [almacenToModify, setAlmacenToModify] = useState(new Almacen());
    const [showModifyAlmacenModal, setShowModifyAlmacenModal] = useState(false);

    if (getAlmacenesQuery.isLoading || getAlmacenesQuery.isFetching) {
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
            <h4 className="title is-4">Presupuesto BU</h4>
            <Tabla cols={[
                'Almacén',
                'Planta',
                'Presupuesto BU',
                'Acción',
            ]}>
                {getAlmacenesQuery.data!.map(almacen =>
                    <tr
                        key={almacen.id}
                    >
                        <td className={redIfNull(almacen.almacen)}>
                            {almacen.almacen ? almacen.almacen : "Faltante"}
                        </td>
                        <td className={redIfNull(almacen.planta)}>
                            {almacen.planta ? almacen.planta : "Faltante"}
                        </td>
                        <td className={redIfNull(almacen.monto.toString())}>
                            {almacen.monto.toString() ? almacen.monto : "Faltante"}
                        </td>
                        <td>
                            <button className={`
                                    button 
                                    is-normal 
                                    is-info 
                                    ${almacenToModify.id === almacen.id ? 'is-inverted' : 'is-outlined'}`}
                                onClick={() => {
                                    setAlmacenToModify(almacen);
                                    setShowModifyAlmacenModal(true);
                                }}
                            >Modificar Monto</button>
                        </td>
                    </tr>
                )}

            </Tabla>
            <Modal key={almacenToModify.id} showModal={showModifyAlmacenModal} onClick={() => setShowModifyAlmacenModal(false)}>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{almacenToModify.almacen}</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => setShowModifyAlmacenModal(false)}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <h4 className="subtitle is-4">Monto</h4>
                        <div className="is-flex is-justify-content-space-evenly is-align-items-center">
                            <div className="mr-6 mt-3">
                                <div className="block">Valor Actual</div>
                                <div className="box">{almacenToModify.monto}</div>
                            </div>
                            <div>
                                <div className="block">Valor Modificado</div>
                                <TextInputModifyModal
                                    initialvalue={almacenToModify.monto.toString()}
                                    fieldname="Monto"
                                    setcurrentvalue={(_: string, value: string) => {
                                        almacenToModify.monto = Number(value);
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot is-flex-direction-row-reverse">
                        <button
                            className="button is-success mx-1"
                            onClick={() => {
                                putAlmacenMutation.mutate(almacenToModify);
                            }}
                        >Modificar</button>
                        <button
                            className="button mx-1"
                            onClick={() => setShowModifyAlmacenModal(false)}
                        >Cancelar</button>
                    </footer>
                </div>
            </Modal>
        </div>
    );
}

export default PresupuestoBUView;