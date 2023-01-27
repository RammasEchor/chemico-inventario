const menu_layout = [
    {
        title: "Usuarios", children: [
            { title: "Alta de usuario", link: "/alta_usuario" },
            { title: "Baja de usuario", link: "/" }
        ]
    },
    {
        title: "Productos", children: [
            { title: "Alta de producto", link: "/alta_producto" },
            { title: "Baja de producto", link: "/baja_producto" },
            { title: "Traspaso entre ubicaciones", link: "/" },
            { title: "Asignar producto a usuario", link: "/" }
        ]
    },
    {
        title: "Cotización", children: [
            { title: "Crear cotización", link: "/crear_cotizacion" },
            { title: "Estatus de cotización", link: "/" },
            { title: "Cancelar cotización", link: "/" }
        ]
    },
    {
        title: "Inventarios", children: [
            { title: "Entrada de material", link: "/" },
            { title: "Salida de material", link: "/" },
            { title: "Impresión de ordenes de material", link: "/" },
            { title: "Listado de productos", link: "/" },
            { title: "Inventario", link: "/inventario" },
            { title: "Cancelar salida de material", link: "/" },
            { title: "Ajustes de inventario", link: "/" }
        ]
    },
    {
        title: "Aprobaciones", children: [
            { title: "Aprobaciones", link: "/" },
        ]
    },
    {
        title: "Consultas", children: [
            { title: "Reporte de entradas", link: "/" },
            { title: "Reporte de consumos", link: "/" },
        ]
    },

]

export default menu_layout