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
            { title: "Reporte de Caducidad", link: "/reporte_caducidad", visibility: [Role.Admin] },
            { title: "Traspaso entre ubicaciones", link: "/", visibility: [Role.Admin] },
            { title: "Asignar producto a usuario", link: "/", visibility: [Role.Ninguno] }
        ],
        visibility: [Role.Admin]
    },
    {
        title: "Cotización", children: [
            { title: "Crear cotización", link: "/crear_cotizacion", visibility: [Role.Cliente, Role.Chemico, Role.Admin] },
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
            { title: "Entrada de material", link: "/entrada_material", visibility: [Role.Ninguno] },
            { title: "Salida de material", link: "/", visibility: [Role.Ninguno] },
            { title: "Impresión de ordenes de material", link: "/", visibility: [Role.Ninguno] },
            { title: "Listado de productos", link: "/", visibility: [Role.Ninguno] },
            { title: "Inventario", link: "/inventario", visibility: [Role.Ninguno] },
            { title: "Cancelar salida de material", link: "/", visibility: [Role.Ninguno] },
            { title: "Ajustes de inventario", link: "/", visibility: [Role.Ninguno] },
            { title: "Existencias", link: "/existencias", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico, Role.AlmacenCliente] },
        ],
        visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico]
    },
    {
        title: "Entradas", children: [
            { title: "Ver Entradas", link: "/ver_entradas", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico, Role.AlmacenCliente] },
            { title: "Historial de Entradas", link: "/historial_entradas", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico, Role.AlmacenCliente] },
            { title: "Cargar a Base de Datos", link: "/cargar_bd", visibility: [Role.Admin, Role.Chemico] },
        ],
        visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico, Role.AlmacenCliente]
    },
    {
        title: "Salidas", children: [
            { title: "Solicitud de Material", link: "/solicitud_material", visibility: [Role.Admin, Role.Chemico, Role.RequisitorMaterial] },
            { title: "Solicitudes Pendientes", link: "/solicitudes_pendientes", visibility: [Role.Admin, Role.Chemico, Role.Aprobador] },
            { title: "Solicitudes Aprobadas", link: "/solicitudes_aprobadas", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico] },
            { title: "Solicitudes Cerradas", link: "/solicitudes_cerradas", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico] },
            { title: "Solicitudes Rechazadas", link: "/solicitudes_rechazadas", visibility: [Role.Admin, Role.Chemico, Role.AlmacenChemico] },
        ],
        visibility: [Role.Admin, Role.Chemico, Role.Aprobador, Role.RequisitorMaterial, Role.AlmacenChemico]
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
    {
        title: "Almacén", children: [
            { title: "Presupuesto BU", link: "/almacen", visibility: [Role.Chemico, Role.Admin, Role.Finanzas] },
        ],
        visibility: [Role.Chemico, Role.Admin]
    },
    {
        title: "Cotizaciones Avox/Sem", children: [
            { title: "Cotizaciones Avox/Sem", link: "/cotizaciones_avox", visibility: [Role.Chemico, Role.Admin] },
        ],
        visibility: [Role.Chemico, Role.Admin]
    },

]

export default menu_layout