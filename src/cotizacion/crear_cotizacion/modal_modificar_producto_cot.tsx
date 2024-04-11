import { PropsWithChildren, useState } from "react";
import { ProductInQuote } from "../../apis/api_cotizacion";
import Tabla from "../../form_components/table";
import TextInputModifyModal from "../../form_components/text_input_modify_modal";

interface Props extends PropsWithChildren {
    onClickClose: () => void
    onClickModify: (user: ProductInQuote) => void
    product: ProductInQuote
}

function ModalModificarProductoCotizacion(props: Props) {
    const [modifiedProduct, setModifiedProduct] = useState<ProductInQuote>({ ...(props.product) })

    function updateProduct(field: string, value: string) {
        setModifiedProduct(modifiedProduct => {
            return {
                ...modifiedProduct,
                [field]: value
            }
        })
    }

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.product.descripcion}</p>
                <button
                    className="delete"
                    aria-label="close"
                    onClick={props.onClickClose}
                ></button>
            </header>
            <section className="modal-card-body">
                <Tabla cols={[
                    'Campo',
                    'Valor Actual',
                    'Valor Modificado',
                ]}>
                    <tr>
                        <td className='has-text-weight-bold'>Fabricante</td>
                        <td>{props.product.fabricante}</td>
                        <td>
                            <TextInputModifyModal
                                initialvalue={props.product.fabricante}
                                fieldname="fabricante"
                                setcurrentvalue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Cantidad</td>
                        <td>{props.product.cant}</td>
                        <td>
                            <TextInputModifyModal
                                initialvalue={props.product.cant}
                                fieldname="cant"
                                setcurrentvalue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Presentación</td>
                        <td>{props.product.presentacion}</td>
                        <td>
                            <TextInputModifyModal
                                initialvalue={props.product.presentacion}
                                fieldname="presentacion"
                                setcurrentvalue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Unidad de Medida</td>
                        <td>{props.product.uni_medida}</td>
                        <td>
                            <TextInputModifyModal
                                initialvalue={props.product.uni_medida}
                                fieldname="uni_medida"
                                setcurrentvalue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Área</td>
                        <td>{props.product.area}</td>
                        <td>
                            <TextInputModifyModal
                                initialvalue={props.product.area}
                                fieldname="area"
                                setcurrentvalue={updateProduct}
                            />
                        </td>
                    </tr>
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex-direction-row-reverse">
                <button
                    className="button is-success mx-1"
                    onClick={() => props.onClickModify(modifiedProduct)}
                >Modificar</button>
                <button
                    className="button mx-1"
                    onClick={props.onClickClose}
                >Cancelar</button>
            </footer>
        </div>
    );
}

export default ModalModificarProductoCotizacion