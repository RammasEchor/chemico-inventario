import { failedPromise } from "../utilities/failed_promise";
import { getFetch, rootUrl } from "./api";
import { APIStringArg } from "./api_func_args_types";

class Producto {
  idProd = "";
  planta = "";
  noParte = "";
  descripcion = "";
  maximo = "";
  minimo = "";
  uni_medida = "";
  fecha_exp = "";
  ubicacion = "";
  precio = "";
  stock = "";
  img?: File = undefined;
  nomImg = "";
  lote = "";
  idOdc = "";
}

function createFormDataFromProduct(product: Producto): FormData {
  const formData = new FormData();

  formData.append("idProd", product.idProd);
  formData.append("planta", product.planta);
  formData.append("noParte", product.noParte);
  formData.append("descripcion", product.descripcion);
  formData.append("maximo", product.maximo);
  formData.append("minimo", product.minimo);
  formData.append("uni_medida", product.uni_medida);
  formData.append("fecha_exp", product.fecha_exp);
  formData.append("ubicacion", product.ubicacion);
  formData.append("precio", product.precio);
  formData.append("stock", product.stock);
  formData.append("lote", product.lote);
  formData.append("img", product.img as File);
  formData.append("nomImg", product.nomImg);

  return formData;
}

function insertProduct(product: Producto) {
  let endpoint = process.env.REACT_APP_BACKEND_INSERT_PRODUCT;
  const formData = createFormDataFromProduct(product);

  return fetch(rootUrl + endpoint, {
    method: "POST",
    body: formData,
  });
}

function getProducts() {
  const endpoint = process.env.REACT_APP_BACKEND_GET_PRODUCTS;
  return getFetch(rootUrl + endpoint);
}

function modifyProduct(product: Producto) {
  const endpoint = process.env.REACT_APP_BACKEND_MODIFY_PRODUCT;
  const formData = createFormDataFromProduct(product);

  return fetch(rootUrl + endpoint, {
    method: "POST",
    body: formData,
  });
}

function deleteProduct(productId: APIStringArg) {
  if (productId === undefined) {
    return failedPromise("The productd ID to delete is undefined");
  }

  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_DELETE_PRODUCT;
  api_url += `${productId}/`;
  return fetch(api_url);
}

function getExistent() {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_EXISTANT;
  return fetch(api_url);
}

function searchProducts(noParte: APIStringArg, desc: APIStringArg) {
  let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
  api_url += process.env.REACT_APP_BACKEND_GET_PRODUCTS;
  api_url += `${noParte}/`;
  api_url += `${desc}/`;

  return fetch(api_url);
}

export {
    deleteProduct,
    getExistent,
    getProducts,
    insertProduct,
    modifyProduct, Producto, searchProducts
};

