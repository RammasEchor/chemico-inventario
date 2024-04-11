import { useEffect, useState } from "react";
import { getMaterials, MaterialAPI } from "../../apis/api_inventario";
import TablaInventario from "./tabla_inventario";

function DisplayInventario() {
    const [materials, setMaterials] = useState<MaterialAPI[]>([]);
    const [materialSelected, setMaterialSelected] = useState('none');

    useEffect(() => {
        getMaterials()
            .then(response => response.json())
            .then((data: MaterialAPI[]) => {
                setMaterials(data);
            });
    }, []);

    return (
        <div className="box">
            <h4 className="title is-4">Inventario</h4>
            <TablaInventario>
                {materials.map(material => {
                    return (
                        <tr id={material.id}
                            key={material.id}
                            onClick={() => setMaterialSelected(material.id as string)}
                            className={materialSelected === material.id ? 'is-selected' : ''}
                        >
                            <td key={material.nombreProd}>{material.nombreProd}</td>
                            <td key={material.codigoProd}>{material.codigoProd}</td>
                            <td key={material.fechaEntrada}>{material.fechaEntrada}</td>
                            <td key={material.usuarioRecibio}>{material.usuarioRecibio}</td>
                            <td key={material.cantidad}>{material.cantidad}</td>
                            <td key={material.planta}>{material.planta}</td>
                        </tr>
                    );
                })}
            </TablaInventario>
        </div>
    );
}

export default DisplayInventario