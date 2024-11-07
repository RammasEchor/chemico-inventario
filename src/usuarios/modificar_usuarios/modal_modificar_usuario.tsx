import { Formik } from "formik";
import { PropsWithChildren, useEffect, useState } from "react";
import * as Yup from "yup";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import {
  User,
  getAprobadores,
  getAprobadores2,
  getRoles,
} from "../../apis/api_usuarios";
import { SelectWithLabel } from "../../form_components/select_with_label";
import Tabla from "../../form_components/table";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

interface Props extends PropsWithChildren {
  onClickClose: () => void;
  onClickModify: (user: User) => void;
  user: User;
}

interface RolAPIReturn {
  id: string;
  nombre: string;
}

function ModalModificarUsuario(props: Props) {
  const [roles, setRoles] = useState<string[]>([]);
  const [plantas, setPlantas] = useState<string[]>([]);
  const [currentPlant, setCurrentPlant] = useState(props.user.planta);
  const [currentRole, setCurrentRole] = useState(props.user.rol);
  const [aprobadores1, setAprobadores1] = useState([]);
  const [aprobadores2, setAprobadores2] = useState([]);

  useEffect(() => {
    getRoles()
      .then((response) => response.json())
      .then((data: RolAPIReturn[]) => {
        setRoles(data.map((rol) => rol.nombre));
      });

    getPlants()
      .then((response) => response.json())
      .then((data: PlantasAPI[]) => {
        setPlantas(data.map((planta) => planta.nombre));
      });
  }, []);

  useEffect(() => {
    if (currentPlant) {
      getAprobadores(currentPlant)
        .then((response) => response.json())
        .then((data) => {
          setAprobadores1(data);
        });

      getAprobadores2(currentPlant)
        .then((response) => response.json())
        .then((data) => {
          setAprobadores2(data);
        });
    }
  }, [currentPlant]);

  let extra_items = <></>;
  if (currentRole === "Cliente") {
    extra_items = (
      <div className="px-3">
        <SelectWithLabel name="aprob1" label="Aprobador 1">
          {props.user.aprob1 === "-" && (
            <option selected disabled value={"-"}>
              {"-"}
            </option>
          )}
          {aprobadores1.map((ap1) => {
            if (ap1 === props.user.aprob1)
              return (
                <option selected value={ap1} key={ap1}>
                  {ap1}
                </option>
              );

            return (
              <option value={ap1} key={ap1}>
                {ap1}
              </option>
            );
          })}
        </SelectWithLabel>
        <SelectWithLabel name="aprob2" label="Aprobador 2">
          {props.user.aprob2 === "-" && (
            <option selected disabled value={"-"}>
              {"-"}
            </option>
          )}
          {aprobadores2.map((ap2) => {
            if (ap2 === props.user.aprob2)
              return (
                <option selected value={ap2} key={ap2}>
                  {ap2}
                </option>
              );

            return (
              <option value={ap2} key={ap2}>
                {ap2}
              </option>
            );
          })}
        </SelectWithLabel>
      </div>
    );
  } else if (currentRole === "Requisitor de Material") {
    extra_items = (
      <div className="px-3">
        <SelectWithLabel name="aprob1" label="Aprobador 1">
          {props.user.aprob1 === "-" && (
            <option selected disabled value={"-"}>
              {"-"}
            </option>
          )}
          {aprobadores1.map((ap1) => {
            if (ap1 === props.user.aprob1)
              return (
                <option selected value={ap1} key={ap1}>
                  {ap1}
                </option>
              );

            return (
              <option value={ap1} key={ap1}>
                {ap1}
              </option>
            );
          })}
        </SelectWithLabel>
      </div>
    );
  }

  var newUser = new User();
  Object.keys(props.user).map((k) => (newUser[k] = props.user[k]));
  return (
    <Formik
      initialValues={newUser}
      validateOnMount={true}
      validationSchema={Yup.object({
        nombre: Yup.string().required(appendFieldRequiredSpanish("Nombre")),
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
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        if (
          currentRole !== "Cliente" &&
          currentRole !== "Requisitor de Material"
        ) {
          values.aprob1 = "-";
          values.aprob2 = "-";
        }
        if (
          currentRole !== "Aprobador" &&
          currentRole !== "Requisitor de Material"
        ) {
          values.monto = "-";
        }

        props.onClickModify(values);
      }}
    >
      {(formikProps) => (
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.user.nombre}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={props.onClickClose}
            ></button>
          </header>
          <section className="modal-card-body">
            <Tabla cols={["Campo", "Valor Actual", "Valor Modificado"]}>
              <tr>
                <td className="has-text-weight-bold">Nombre</td>
                <td>{props.user.nombre}</td>
                <td>
                  <TextInputLabelWarning
                    value={formikProps.values.nombre}
                    name="nombre"
                    label=""
                    className={
                      formikProps.initialValues.nombre !==
                      formikProps.values.nombre
                        ? "is-warning"
                        : undefined
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="has-text-weight-bold">Rol</td>
                <td>
                  {props.user.rol}
                  {(currentRole === "Aprobador" ||
                    currentRole === "Requisitor de Material") && (
                    <div>Monto: {props.user.monto}</div>
                  )}
                </td>
                <td>
                  <SelectWithLabel
                    onChange={(e) => {
                      setCurrentRole(e.currentTarget.value);
                      formikProps.setFieldValue("rol", e.currentTarget.value);
                    }}
                    value={formikProps.values.rol}
                    name="rol"
                    label=""
                    bulmaColor={
                      formikProps.initialValues.rol !== formikProps.values.rol
                        ? "is-warning"
                        : undefined
                    }
                  >
                    {roles.map((rol) => (
                      <option value={rol} key={rol}>
                        {rol}
                      </option>
                    ))}
                  </SelectWithLabel>
                  {extra_items}
                  {(currentRole === "Aprobador" ||
                    currentRole === "Requisitor de Material") && (
                    <div className="px-3">
                      <TextInputLabelWarning
                        value={formikProps.values.monto}
                        name="monto"
                        label="Monto"
                        className={
                          formikProps.initialValues.monto !==
                          formikProps.values.monto
                            ? "is-warning"
                            : undefined
                        }
                      />
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="has-text-weight-bold">Email</td>
                <td>{props.user.email}</td>
                <td>
                  <TextInputLabelWarning
                    value={formikProps.values.email}
                    name="email"
                    label=""
                    className={
                      formikProps.initialValues.email !==
                      formikProps.values.email
                        ? "is-warning"
                        : undefined
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="has-text-weight-bold">Planta</td>
                <td>{props.user.planta}</td>
                <td>
                  <SelectWithLabel
                    onChange={(e) => {
                      setCurrentPlant(e.currentTarget.value);
                      formikProps.setFieldValue(
                        "planta",
                        e.currentTarget.value
                      );
                    }}
                    value={formikProps.values.planta}
                    name="planta"
                    label=""
                    bulmaColor={
                      formikProps.initialValues.planta !==
                      formikProps.values.planta
                        ? "is-warning"
                        : undefined
                    }
                  >
                    {plantas.map((planta) => (
                      <option value={planta} key={planta}>
                        {planta}
                      </option>
                    ))}
                  </SelectWithLabel>
                </td>
              </tr>
              <tr>
                <td className="has-text-weight-bold">Cve. Usuario</td>
                <td>{props.user.cveUsuario}</td>
                <td>
                  <TextInputLabelWarning
                    value={formikProps.values.cveUsuario}
                    name="cveUsuario"
                    label=""
                    className={
                      formikProps.initialValues.cveUsuario !==
                      formikProps.values.cveUsuario
                        ? "is-warning"
                        : undefined
                    }
                  />
                </td>
              </tr>
            </Tabla>
          </section>
          <footer className="modal-card-foot is-flex-direction-row-reverse">
            <button
              className="button is-success mx-1"
              type="submit"
              onClick={() => formikProps.handleSubmit()}
            >
              Modificar
            </button>
            <button
              className="button mx-1"
              type="button"
              onClick={props.onClickClose}
            >
              Cancelar
            </button>
          </footer>
        </div>
      )}
    </Formik>
  );
}

export default ModalModificarUsuario;
