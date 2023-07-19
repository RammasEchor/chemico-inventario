import { Role } from "../apis/api_usuarios"

const menu_layout = [
    {
        title: "Usuarios", children: [
            { title: "Alta de usuario", link: "/alta_usuario", visibility: [Role.Admin] },
            { title: "Modificar usuario", link: "/modificar_usuario", visibility: [Role.Admin] },
            { title: "Baja de usuario", link: "/baja_usuario", visibility: [Role.Admin] }
        ],
        visibility: [Role.Admin]
    },
    {
        title: "Productos", children: [
            { title: "Alta de producto", link: "/alta_producto", visibility: [Role.Admin] },
            { title: "Modificar producto", link: "/modificar_producto", visibility: [Role.Admin] },
            { title: "Baja de producto", link: "/baja_producto", visibility: [Role.Admin] },
            { title: "Traspaso entre ubicaciones", link: "/", visibility: [Role.Admin] },
            { title: "Asignar producto a usuario", link: "/", visibility: [Role.Admin] }
        ],
        visibility: [Role.Admin]
    },
    {
        title: "Cotización", children: [
            { title: "Crear cotización", link: "/crear_cotizacion", visibility: [Role.Cliente, Role.Aprobador, Role.Chemico, Role.Admin] },
            { title: "Pendientes de cotizar", link: "/cotizaciones_pendientes", visibility: [Role.Chemico, Role.Admin] },
            { title: "Cotizaciones rechazadas", link: "/cotizaciones_rechazadas", visibility: [Role.Admin, Role.Chemico] },
            { title: "Cotizaciones enviadas", link: "/cotizaciones_enviadas", visibility: [Role.Cliente, Role.Aprobador, Role.Chemico, Role.Admin] },
            { title: "Aprobaciones HS", link: "/aprobaciones_hs", visibility: [Role.AprobSeguridad] },
            {
                title: "Aprobar/Rechazar Cotizaciones", children: [
                    { title: "Por aprobar", link: "/cotizaciones_por_aprobar", visibility: [Role.Aprobador, Role.Chemico, Role.Admin] },
                    { title: "Aprobadas", link: "/cotizaciones_aprobadas", visibility: [Role.Cliente, Role.Aprobador, Role.Chemico, Role.Admin] },
                ],
                visibility: [Role.Cliente, Role.Aprobador, Role.Chemico, Role.Admin]
            },
        ],
        visibility: [Role.Aprobador, Role.Chemico, Role.Admin, Role.Cliente, Role.AprobSeguridad]
    },
    {
        title: "Inventarios", children: [
            { title: "Entrada de material", link: "/entrada_material", visibility: [Role.Admin] },
            { title: "Salida de material", link: "/", visibility: [Role.Admin] },
            { title: "Impresión de ordenes de material", link: "/", visibility: [Role.Aprobador, Role.Chemico, Role.Admin] },
            { title: "Listado de productos", link: "/", visibility: [Role.Admin] },
            { title: "Inventario", link: "/inventario", visibility: [Role.Admin] },
            { title: "Cancelar salida de material", link: "/", visibility: [Role.Admin] },
            { title: "Ajustes de inventario", link: "/", visibility: [Role.Admin] }
        ],
        visibility: [Role.Ninguno]
    },
    {
        title: "Entradas", children: [
            { title: "Ver Entradas", link: "/ver_entradas", visibility: [Role.Admin, Role.Chemico] },
            { title: "Cargar a Base de Datos", link: "/cargar_bd", visibility: [Role.Admin, Role.Chemico] },
        ],
        visibility: [Role.Admin, Role.Chemico]
    },
    {
        title: "Consultas", children: [
            { title: "Reporte de entradas", link: "/", visibility: [Role.Chemico, Role.Admin] },
            { title: "Reporte de consumos", link: "/", visibility: [Role.Chemico, Role.Admin] },
            { title: "Reporte On hand/stock", link: "/", visibility: [Role.Aprobador, Role.Chemico, Role.Admin] },
            { title: "Listado de usuarios", link: "/", visibility: [Role.Admin] },
        ],
        visibility: [Role.Ninguno]
    },

]

export default menu_layout