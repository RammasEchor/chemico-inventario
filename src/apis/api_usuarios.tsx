import { useMutation } from "@tanstack/react-query";
import {
  mutationOnError,
  mutationOnSuccessReload,
  postFetch,
  rootUrl,
} from "./api";
import { APIStringArg } from "./api_func_args_types";
import { PlantasAPI } from "./api_plantas";
import { Producto } from "./api_productos";

class User {
  id = "";
  nombre = "";
  contraseña = "";
  rol = "";
  email = "";
  planta = "";
  cveUsuario = "";
  aprob1 = "";
  aprob2 = "";
  monto = "";
  almacen = "";
}

interface RolAPIReturn {
  id: string;
  nombre: string;
}

enum Role {
  UsuarioGen,
  Cliente,
  Aprobador,
  Chemico,
  Admin,
  AprobSeguridad,
  AlmacenChemico,
  AlmacenCliente,
  RequisitorMaterial,
  Finanzas,
  Ninguno,
}

function getUserRoleFromString(rawString: APIStringArg) {
  switch (rawString) {
    case "Admin":
      return Role.Admin;
    case "Chemico":
      return Role.Chemico;
    case "Aprobador":
      return Role.Aprobador;
    case "Cliente":
      return Role.Cliente;
    case "Aprob. Seguridad":
      return Role.AprobSeguridad;
    case "Almacen Chemico":
      return Role.AlmacenChemico;
    case "Almacen Cliente":
      return Role.AlmacenCliente;
    case "Requisitor de Material":
      return Role.RequisitorMaterial;
    case "Finanzas":
      return Role.Finanzas;
    default:
      return Role.UsuarioGen;
  }
}

function getUsers() {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_USERS;
  return fetch(api_url);
}

function createUser(user: User) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_INSERT_USER;
  api_url += `${user.nombre}/`;
  api_url += `${user.cveUsuario}/`;
  api_url += `${user.contraseña}/`;
  api_url += `${user.email}/`;
  api_url += `${user.planta}/`;
  api_url += `${user.rol}/`;
  api_url += `${user.aprob1}/`;
  api_url += `${user.aprob2}/`;
  api_url += `${user.monto}/`;
  api_url += `${user.almacen}/`;

  return fetch(api_url);
}

function getRoles() {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_ROLES;
  return fetch(api_url);
}

function getAprobadores(planta: APIStringArg) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES;
  api_url += `${planta}/`;
  return fetch(api_url);
}

function getAprobadores2(planta: APIStringArg) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES2;
  api_url += `${planta}/`;
  return fetch(api_url);
}

function modifyUser(user: User) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_MODIFY_USER;

  return fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

function getWarehouses(plant: APIStringArg) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_WAREHOUSES;
  api_url += `${plant}/`;

  return fetch(api_url);
}

function useAssignProductsToUser() {
  return useMutation({
    mutationFn: async (params: { id: string; products: Producto[] }) => {
      const endpoint = rootUrl + process.env.REACT_APP_ASIGN_PRODUCTS;
      return postFetch(
        endpoint,
        params.products.map((p) => {
          return { idUsuario: params.id, idProducto: p.idProd };
        })
      );
    },
    onSuccess: mutationOnSuccessReload,
    onError: mutationOnError,
  });
}

function useAssignPlantsToUser() {
  return useMutation({
    mutationKey: ["postPlantsToUser"],
    mutationFn: async (params: {
      cveUsuario: string;
      plantas: PlantasAPI[];
    }) => {
      const endpoint = rootUrl + process.env.REACT_APP_ASSIGN_PLANTS_TO_USER;
      return postFetch(
        endpoint,
        params.plantas.map((p) => {
          return { idUsuario: params.cveUsuario, idPlanta: p.id };
        })
      );
    },
    onSuccess: mutationOnSuccessReload,
    onError: mutationOnError,
  });
}

function useAssignWarehouseToUser() {
  return useMutation({
    mutationKey: ["postWarehouseToUser"],
    mutationFn: async (params: { idUsuario: string; almacenes: string[] }) => {
      const endpoint = rootUrl + process.env.REACT_APP_ASIGN_WAREHOUSE_TO_USER;
      return postFetch(endpoint, params);
    },
    onSuccess: mutationOnSuccessReload,
    onError: mutationOnError,
  });
}

function getWarehousesForUser() {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_GET_WAREHOUSES_FOR_ASSIGNMENT;

  return fetch(api_url);
}

export {
  createUser,
  getAprobadores,
  getAprobadores2,
  getRoles,
  getUserRoleFromString,
  getUsers,
  getWarehouses,
  getWarehousesForUser,
  modifyUser,
  Role,
  useAssignPlantsToUser,
  useAssignProductsToUser,
  useAssignWarehouseToUser,
  User
};
export type { RolAPIReturn };

