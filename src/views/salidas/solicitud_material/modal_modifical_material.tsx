import { PropsWithChildren, useState } from "react";
import { Material } from "../../../apis/api_material";
import Tabla from "../../../form_components/table";
import TextInputModifyModal from "../../../form_components/text_input_modify_modal";

interface Props extends PropsWithChildren {
    onClickClose: () => void
    onClickModify: (user: Material) => void
    product: Material
}

function ModalModificarProductoSolicitud(props: Props) {
    const [modifiedProduct, setModifiedProduct] = useState<Material>({ ...(props.product) })

    function updateProduct(field: string, value: string) {
        setModifiedProduct(modifiedProduct => {
            let cantidad = Number(modifiedProduct.cantidad);
            if(field === 'cantidad')
                cantidad = Number(value);

            let precioUnitario = Number(modifiedProduct.precioU);

            return {
                ...modifiedProduct,
                [field]: value,
                precioTotal: `${cantidad * precioUnitario}`
            }
        })
    }

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.product.codigo}</p>
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
                        <td className='has-text-weight-bold'>Cantidad</td>
                        <td>{props.product.cantidad}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.cantidad}
                                fieldName="cantidad"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Precio Unitario</td>
                        <td>{props.product.precioU}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.precioU}
                                fieldName="precioU"
                                setCurrentValue={updateProduct}
                                disabled
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Precio Total</td>
                        <td>{props.product.precioT}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.precioT}
                                fieldName="precioT"
                                setCurrentValue={updateProduct}
                                value={modifiedProduct.precioT}
                                disabled
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Comentarios</td>
                        <td>{props.product.comentarios}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.comentarios}
                                fieldName="comentarios"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex-direction-row-reverse">
                <button
                    className="button is-success mx-1"
                    onClick={() => props.onClickModify(modifiedProduct)}
                    type="button"
                >Modificar</button>
                <button
                    className="button mx-1"
                    onClick={props.onClickClose}
                    type="button"
                >Cancelar</button>
            </footer>
        </div>
    );
}

export default ModalModificarProductoSolicitud