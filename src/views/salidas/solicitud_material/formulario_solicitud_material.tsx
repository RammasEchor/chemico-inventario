import {
    Button,
    ErrorScreen,
    LoadingBar,
    ProductCard,
    ProductsBill,
    TextInput,
} from "chemico-ui";
import { Form, Formik } from "formik";
import { useState } from "react";
import useSolicitudesController from "../../../controllers/solicitudesController";
import { useAuth } from "../../../login/auth-provider/auth_provider";

interface CardProduct {
  id: string;
  codigo: string;
  cantidad: string;
  precioU: string;
  precioT: string;
  numPedido: string;
  folio: string;
  comentarios: string;
  tipo_equipo: string;
  numEconomico: string;
  currency?: string;
  stock?: string;
  idOdc: string;
}

function FormularioSolicitudMaterial() {
  const { userKey } = useAuth();
  const {
    getNextFolioQuery,
    getProductsSalidaQuery,
    postDetalleSalidaMutation,
    postMasterDetalleSalidaMutation,
  } = useSolicitudesController(userKey);
  const [prodSolicitar, setProdSolicitar] = useState<CardProduct[]>([]);

  if (
    getProductsSalidaQuery.isLoading ||
    getProductsSalidaQuery.isFetching ||
    getNextFolioQuery.isLoading ||
    getNextFolioQuery.isFetching
  ) {
    return <LoadingBar />;
  }

  if (getProductsSalidaQuery.isError) {
    return <ErrorScreen>{getProductsSalidaQuery.error.message}</ErrorScreen>;
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={(_: any, { setSubmitting }: any) => {
        setSubmitting(false);
        postMasterDetalleSalidaMutation.mutate({
            folio: getNextFolioQuery.data,
            userKey: userKey,
            descripcion: "",
        });
        postDetalleSalidaMutation.mutate(
            prodSolicitar.map((p) => {
                return { ...p, folio: getNextFolioQuery.data as string };
            })
        );
      }}
    >
      <Form className="box">
        <h2 className="title is-3 has-text-grey-dark">Solicitud de Material</h2>
        <div className="is-flex is-align-items-center">
          <h3 className="subtitle is-5 mb-3">
            Folio: {getNextFolioQuery.data}
          </h3>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="sticky">
              <TextInput label="Buscar" name="buscar" />
              <h5 className="title is-5">Filtros de búsqueda</h5>
              <div className="block"></div>
              <h6 className="subtitle is-6">Nombre</h6>
              <h6 className="subtitle is-6">No. de Parte</h6>
              <hr></hr>
              <ProductsBill prodsSolicitar={prodSolicitar} />
              <div className="is-flex is-justify-content-flex-end">
                <Button disabled={!(prodSolicitar.length > 0)}>
                  Solicitar Material
                </Button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between 	">
              {getProductsSalidaQuery.data?.map((p) => {
                return (
                  <div key={p.idProd}>
                    <ProductCard
                      img={
                        "https://javaclusters-95554-0.cloudclusters.net/imagesProd/" +
                        p.nomImg
                      }
                      descripcion={p.descripcion}
                      precio={p.precio}
                      uni_medida={p.uni_medida}
                      noParte={p.noParte}
                      idProd={p.idProd}
                      prodsSolicitar={prodSolicitar}
                      setProdsSolicitar={setProdSolicitar}
                      currency="MXN"
                      stock={p.stock}
                      idOdc={p.idOdc}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default FormularioSolicitudMaterial;
