import { Role } from "../../usuarios/campos_usuario"

const menu_layout = [
    {
        title: "Usuarios", children: [
            { title: "Alta de usuario", link: "/alta_usuario", visibility: Role.Admin },
            { title: "Baja de usuario", link: "/baja_usuario", visibility: Role.Admin }
        ],
        visibility: Role.Admin
    },
    {
        title: "Productos", children: [
            { title: "Alta de producto", link: "/alta_producto", visibility: Role.Admin },
            { title: "Baja de producto", link: "/baja_producto", visibility: Role.Admin },
            { title: "Traspaso entre ubicaciones", link: "/", visibility: Role.Admin },
            { title: "Asignar producto a usuario", link: "/", visibility: Role.Admin }
        ],
        visibility: Role.Admin
    },
    {
        title: "Cotización", children: [
            { title: "Crear cotización", link: "/crear_cotizacion", visibility: Role.Cliente },
            { title: "Estatus de cotización", link: "/status_cotizacion", visibility: Role.Chemico },
            { title: "Cancelar cotización", link: "/cancelar_cotizacion", visibility: Role.Admin },
            { title: "Cotizaciones listas", link: "/cotizaciones_listas", visibility: Role.Cliente },
        ],
        visibility: Role.Cliente
    },
    {
        title: "Inventarios", children: [
            { title: "Entrada de material", link: "/entrada_material", visibility: Role.Admin },
            { title: "Salida de material", link: "/", visibility: Role.Admin },
            { title: "Impresión de ordenes de material", link: "/", visibility: Role.Cliente },
            { title: "Listado de productos", link: "/", visibility: Role.Admin },
            { title: "Inventario", link: "/inventario", visibility: Role.Admin },
            { title: "Cancelar salida de material", link: "/", visibility: Role.Admin },
            { title: "Ajustes de inventario", link: "/", visibility: Role.Admin }
        ],
        visibility: Role.Cliente
    },
    {
        title: "Aprobaciones", children: [
            { title: "Por aprobar", link: "/aprobaciones", visibility: Role.Aprobador },
            { title: "Aprobadas", link: "/aprobaciones_listas", visibility: Role.Cliente },
        ],
        visibility: Role.Cliente
    },
    {
        title: "Consultas", children: [
            { title: "Reporte de entradas", link: "/", visibility: Role.Chemico },
            { title: "Reporte de consumos", link: "/", visibility: Role.Chemico },
            { title: "Reporte On hand/stock", link: "/", visibility: Role.Cliente },
            { title: "Listado de usuarios", link: "/", visibility: Role.Admin },
        ],
        visibility: Role.Cliente
    },

]

export default menu_layout