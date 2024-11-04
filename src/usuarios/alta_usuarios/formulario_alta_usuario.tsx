import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import {
    RolAPIReturn,
    User,
    createUser,
    getAprobadores,
    getAprobadores2,
    getRoles,
    getWarehouses,
} from "../../apis/api_usuarios";
import LoadingModal from "../../form_components/loading_modal";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

function FormularioAltaUsuario() {
  const [showModal, setShowModal] = useState(2);

  const [roles, setRoles] = useState<string[]>([]);
  const [plantas, setPlantas] = useState<string[]>([]);
  const [warehouses, setWarehouses] = useState<string[]>([]);
  const [currentPlant, setCurrentPlant] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [currentWarehouse, setCurrentWarehouse] = useState("");

  const [aprobadores1, setAprobadores1] = useState([]);
  const [currentAprob1, setCurrentAprob1] = useState("");
  const [aprobadores2, setAprobadores2] = useState([]);
  const [currentAprob2, setCurrentAprob2] = useState("");

  const [initialValues, setIntialValues] = useState<User>(new User());
  const navigate = useNavigate();

  useEffect(() => {
    getRoles()
      .then((response) => response.json())
      .then((data: RolAPIReturn[]) => {
        setRoles(data.map((rol) => rol.nombre));
        setCurrentRole(data[0].nombre);
        setIntialValues((initialValues) => {
          setShowModal((showModal) => showModal - 1);
          return { ...initialValues, rol: data[0]?.nombre };
        });
      });

    getPlants()
      .then((response) => response.json())
      .then((data: PlantasAPI[]) => {
        setPlantas(data.map((planta) => planta.nombre));
        setCurrentPlant(data[0].nombre);
        setIntialValues((initialValues) => {
          setShowModal((showModal) => showModal - 1);
          return { ...initialValues, planta: data[0]?.nombre };
        });
      });
  }, []);

  useEffect(() => {
    if (currentPlant) {
      getAprobadores(currentPlant)
        .then((response) => response.json())
        .then((data) => {
          setAprobadores1(data);
          setCurrentAprob1(data[0] ? data[0] : "");
        });

      getAprobadores2(currentPlant)
        .then((response) => response.json())
        .then((data) => {
          setAprobadores2(data);
          setCurrentAprob2(data[0] ? data[0] : "");
        });
    }
  }, [currentPlant]);

  useEffect(() => {
    if (currentPlant) {
      setCurrentWarehouse("");
      getWarehouses(currentPlant)
        .then((res) => res.json())
        .then((data) => {
          setWarehouses(data);
          setCurrentWarehouse(data[0] ? data[0] : "-");
        })
        .catch((error) => console.log(error));
    }
  }, [currentPlant]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        nombre: Yup.string().required(appendFieldRequiredSpanish("Nombre")),
        contraseña: Yup.string().required(
          appendFieldRequiredSpanish("Contraseña")
        ),
        rol: Yup.string().required(appendFieldRequiredSpanish("Rol")),
        email: Yup.string()
          .email("Email inválido")
          .required(appendFieldRequiredSpanish("Email")),
        planta: Yup.string().required(appendFieldRequiredSpanish("Planta")),
        cveUsuario: Yup.string().required(
          appendFieldRequiredSpanish("Clave de Usuario")
        ),
        aprob1: Yup.string(),
        aprob2: Yup.string(),
        monto: Yup.string(),
        almacen: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        values.aprob1 = currentAprob1;
        values.aprob2 = currentAprob2;
        values.almacen = currentWarehouse;

        if (currentRole !== "Cliente") {
          if (currentRole !== "Requisitor de Material") values.aprob1 = "-";

          values.aprob2 = "-";
        }
        if (
          currentRole !== "Aprobador" &&
          currentRole !== "Requisitor de Material"
        ) {
          values.monto = "-";
        }
        createUser(values)
          .then((response) => {
            if (!response.ok) return Promise.reject(response);

            navigate(0);
          })
          .catch((error) => console.error(error));
      }}
    >
      {(formikProps) => (
        <ShadowedForm>
          <h4 className="title is-4">Alta de Usuario</h4>
          <div className="is-flex is-flex-direction-column">
            <TextInputLabelWarning name="nombre" label="Nombre" />
            <TextInputLabelWarning
              name="contraseña"
              label="Contraseña"
              type="password"
            />
            <SelectWithLabel
              onChange={(e) => {
                setCurrentPlant(e.currentTarget.value);
                formikProps.setFieldValue("planta", e.currentTarget.value);
              }}
              value={currentPlant}
              name="planta"
              label="Planta"
            >
              {plantas.map((planta) => (
                <option value={planta} key={planta}>
                  {planta}
                </option>
              ))}
            </SelectWithLabel>
            <SelectWithLabel
              onChange={(e) => {
                setCurrentRole(e.currentTarget.value);
                formikProps.setFieldValue("rol", e.currentTarget.value);
              }}
              value={currentRole}
              name="rol"
              label="Rol"
            >
              {roles.map((rol) => (
                <option value={rol} key={rol}>
                  {rol}
                </option>
              ))}
            </SelectWithLabel>
            {currentRole === "Cliente" && (
              <div className="px-3">
                <SelectWithLabel
                  onChange={(e) => {
                    setCurrentAprob1(e.currentTarget.value);
                    formikProps.setFieldValue("aprob1", e.currentTarget.value);
                  }}
                  value={currentAprob1}
                  name="aprob1"
                  label="Aprobador 1"
                >
                  {aprobadores1.map((ap1) => (
                    <option value={ap1} key={ap1}>
                      {ap1}
                    </option>
                  ))}
                </SelectWithLabel>
                <SelectWithLabel
                  onChange={(e) => {
                    setCurrentAprob2(e.currentTarget.value);
                    formikProps.setFieldValue("aprob2", e.currentTarget.value);
                  }}
                  value={currentAprob2}
                  name="aprob2"
                  label="Aprobador 2"
                >
                  {aprobadores2.map((ap2) => (
                    <option value={ap2} key={ap2}>
                      {ap2}
                    </option>
                  ))}
                </SelectWithLabel>
              </div>
            )}
            {currentRole === "Requisitor de Material" && (
              <div className="px-3">
                <SelectWithLabel
                  onChange={(e) => {
                    setCurrentAprob1(e.currentTarget.value);
                    formikProps.setFieldValue("aprob1", e.currentTarget.value);
                  }}
                  value={currentAprob1}
                  name="aprob1"
                  label="Aprobador 1"
                >
                  {aprobadores1.map((ap1) => (
                    <option value={ap1} key={ap1}>
                      {ap1}
                    </option>
                  ))}
                </SelectWithLabel>
              </div>
            )}
            {(currentRole === "Aprobador" ||
              currentRole === "Requisitor de Material") && (
              <div className="px-3">
                <TextInputLabelWarning name="monto" label="Monto" />
              </div>
            )}
            <SelectWithLabel
              onChange={(e) => {
                setCurrentWarehouse(e.currentTarget.value);
                formikProps.setFieldValue("almacen", e.currentTarget.value);
              }}
              value={currentWarehouse}
              name="almacen"
              label="Almacén"
            >
              {warehouses.map((warehouse) => (
                <option value={warehouse} key={warehouse}>
                  {warehouse}
                </option>
              ))}
            </SelectWithLabel>
            <TextInputLabelWarning name="email" label="Email" />
            <TextInputLabelWarning name="cveUsuario" label="Clave de Usuario" />
            {formikProps.values.planta === "Planta 3 Oxygen" && (
              <label className="checkbox is-size-5 mt-5 ml-1">
                <Field type="checkbox" name="avox" className="mr-2" />
                AVOX/SEM
              </label>
            )}
          </div>
          <SubmitButton text="Crear Usuario" />
          <LoadingModal show={showModal > 0} />
        </ShadowedForm>
      )}
    </Formik>
  );
}

export default FormularioAltaUsuario;
