import { APIStringArg } from "./api_func_args_types"

interface UserFields {
    [index: string]: string | undefined,
    id: string,
    nombre: string,
    contraseña: string,
    rol: string,
    email: string,
    planta: string,
    cveUsuario: string,
    aprobador1: string,
    aprobador2: string,
    monto_aprobador: string
}

enum Role {
    UsuarioGen,
    Cliente,
    Aprobador,
    Chemico,
    Admin
};

function getUserRoleFromString(rawString: APIStringArg) {
    switch (rawString) {
        case "Admin": return Role.Admin
        case "Chemico": return Role.Chemico
        case "Aprobador": return Role.Aprobador
        case "Cliente": return Role.Cliente
        default: return Role.UsuarioGen
    }
}

function getUsers() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_USERS
    return fetch(api_url);
}

function createUser(user: UserFields) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_USER
    api_url += `${user.nombre}/`
    api_url += `${user.cveUsuario}/`
    api_url += `${user.contraseña}/`
    api_url += `${user.email}/`
    api_url += `${user.planta}/`
    api_url += `${user.rol}/`
    api_url += `${user.aprobador1}/`
    api_url += `${user.aprobador2}/`
    api_url += `${user.monto_aprobador}/`

    return fetch(api_url);
}

function getRoles() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_ROLES
    return fetch(api_url);
}

function getAprobadores(planta: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES
    api_url += `${planta}/`
    return fetch(api_url);
}

function getAprobadores2(planta: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES2
    api_url += `${planta}/`
    return fetch(api_url);
}

function modifyUser(user: UserFields) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MODIFY_USER

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

export {
    Role,
    getUserRoleFromString,
    createUser,
    getRoles,
    getUsers,
    getAprobadores,
    getAprobadores2,
    modifyUser
}
export type { UserFields }


