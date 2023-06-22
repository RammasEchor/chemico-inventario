import { PropsWithChildren, useEffect, useState } from "react";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { Producto } from "../../apis/api_productos";
import DatePickerField from "../../form_components/datepicker";
import SelectModifyModal from "../../form_components/select_modify_modal";
import Tabla from "../../form_components/table";
import TextInputModifyModal from "../../form_components/text_input_modify_modal";
import { dateParser } from "../../utilities/date_parser";

interface Props extends PropsWithChildren {
    onClickClose: () => void
    onClickModify: (user: Producto) => void
    product: Producto
}

function ModalModificarProducto(props: Props) {
    const [modifiedProduct, setModifiedProduct] = useState<Producto>({ ...props.product })
    const [plantas, setPlantas] = useState<string[]>([]);

    let productBeforeDate = new Date()
    if (props.product.fecha_exp) {
        productBeforeDate = new Date(props.product.fecha_exp)
    }

    const [date, setDate] = useState<Date>(new Date(productBeforeDate));

    function updateProduct(field: string, value: string) {
        setModifiedProduct(modifiedProduct => {
            return {
                ...modifiedProduct,
                [field]: value
            }
        })
    }

    useEffect(() => {
        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
            });
    }, []);

    return (
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.product.idProd}</p>
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
                        <td className='has-text-weight-bold'>Planta</td>
                        <td>{props.product.planta}</td>
                        <td>
                            <SelectModifyModal
                                initialValue={props.product.planta}
                                fieldName="planta"
                                options={plantas}
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>No. Parte</td>
                        <td>{props.product.noParte}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.noParte}
                                fieldName="noParte"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Descripción</td>
                        <td>{props.product.descripcion}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.descripcion}
                                fieldName="descripcion"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Máximo</td>
                        <td>{props.product.maximo}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.maximo}
                                fieldName="maximo"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Mínimo</td>
                        <td>{props.product.minimo}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.minimo}
                                fieldName="minimo"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Precio Unitario</td>
                        <td>{props.product.precio}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.precio}
                                fieldName="precio"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Unidad de Medida</td>
                        <td>{props.product.uni_medida}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.uni_medida}
                                fieldName="uni_medida"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Fecha de expiración</td>
                        <td>{dateParser(props.product.fecha_exp)}</td>
                        <td>
                            <DatePickerField label="Fecha de Expiración" selected={date} onChange={setDate} />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Mínimo</td>
                        <td>{props.product.ubicacion}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.product.ubicacion}
                                fieldName="ubicacion"
                                setCurrentValue={updateProduct}
                            />
                        </td>
                    </tr>
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex-direction-row-reverse">
                <button
                    className="button is-success mx-1"
                    onClick={() => props.onClickModify({
                        ...modifiedProduct,
                        fecha_exp: date.toISOString()
                    })}
                >Modificar</button>
                <button
                    className="button mx-1"
                    onClick={props.onClickClose}
                >Cancelar</button>
            </footer>
        </div>
    );
}

export default ModalModificarProducto