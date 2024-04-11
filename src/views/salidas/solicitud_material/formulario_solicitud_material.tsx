import { Button, ErrorScreen, LoadingBar, ProductCard, ProductsBill, TextInput } from "chemico-ui";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Material } from "../../../apis/api_material";
import useSolicitudesController from "../../../controllers/solicitudesController";
import { useAuth } from "../../../login/auth-provider/auth_provider";

interface CardProduct extends Material {
    tipo_equipo: string
    numEconomico: string
}

function FormularioSolicitudMaterial() {
    const { userKey } = useAuth();
    const { getProductsSalidaQuery } = useSolicitudesController(userKey);
    const [prodSolicitar, setProdSolicitar] = useState<CardProduct[]>([]);

    if (getProductsSalidaQuery.isLoading || getProductsSalidaQuery.isFetching) {
        return <LoadingBar />
    }

    if (getProductsSalidaQuery.isError) {
        return <ErrorScreen>{getProductsSalidaQuery.error.message}</ErrorScreen>
    }

    let total = 0;
    prodSolicitar.forEach(prod => {
        total += parseFloat(prod.precioT);
    })

    return (
        <Formik
            initialValues={{
            }}
            validationSchema={Yup.object({
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values);
            }}
        >
            <Form className="box">
                <h2 className="title is-3 has-text-grey-dark">Solicitud de Material</h2>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <div className="sticky">
                            <TextInput label="Buscar" name="buscar" />
                            <h5 className="title is-5">Filtros de búsqueda</h5>
                            <div className="block"></div>
                            <h6 className="subtitle is-6">Nombre</h6>
                            <h6 className="subtitle is-6">No. de Parte</h6>
                            <hr></hr>
                            <ProductsBill
                                total={total}
                                prodsSolicitar={prodSolicitar}
                            />
                            <div className="is-flex is-justify-content-flex-end">
                                <Button disabled={!(prodSolicitar.length > 0)}>Solicitar Material</Button>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between 	">
                            {getProductsSalidaQuery.data?.map(p => {
                                return (
                                    <div key={p.idProd} >
                                        <ProductCard
                                            img={p.img?.name as string}
                                            descripcion={p.descripcion}
                                            precio={p.precio}
                                            uni_medida={p.uni_medida}
                                            noParte={p.noParte}
                                            idProd={p.idProd}
                                            prodsSolicitar={prodSolicitar}
                                            setProdsSolicitar={setProdSolicitar}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Form>
        </Formik >
    );
}

export default FormularioSolicitudMaterial;