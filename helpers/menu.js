const getMenuFront = () => {
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi me-2 mdi-gauge',
            url:'/'
        },
        {
            titulo: 'Empleados',
            icono: 'mdi mdi-briefcase',
            url:'empleados'
        },
        {
            titulo: 'Movimientos',
            icono: 'mdi mdi-clipboard-flow',
            url:'movimientos'
        },
        {
            titulo: 'Nominas',
            icono: 'mdi mdi-cash-multiple',
            url:'nominas'
        },
        {
            titulo: 'Reportes',
            icono: 'mdi mdi-file-document',
            url:'reportes'
        },
    ]

    return menu;
}

module.exports = {
    getMenuFront
}