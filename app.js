const {argv} = require('./config/yargs');
const colores = require('colors');
const {crear, getListado, actualizar, borrar} = require('./por-hacer/por-hacer');

switch(argv._[0]) {
    case 'crear':
        let objDevuelto = crear(argv.descripcion);
        console.log(objDevuelto);
        break;

    case 'listar':
        const listado = getListado();
        let decoracion = '------------------------'

        if (listado) {
            console.log(`TAREAS:\n${decoracion}`.green);
            for (let tarea of listado) {
                console.log(tarea.descripcion);
                console.log(`Estado: ${tarea.completado ? 'acabada' : 'por hacer'}`);
                console.log(`Creada el: ${new Date(tarea.fecha).toLocaleDateString('es-ES', {dateStyle: 'full', timeStyle: 'short'})}`);
                console.log(decoracion.green);
            }
        } else {
            console.log('No tienes tareas para mostrar.'.red);
        }
        break;

    case 'actualizar':
        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado ? 'Se ha actualizado la tarea' : 'No se ha podido actualizar la tarea');
        break;

    case 'borrar':
        let descripcion = argv.descripcion;
        let borrado = borrar(descripcion);
        console.log(borrado ? `La tarea "${descripcion}" ha sido borrada` : `No se ha podido eliminar la tarea "${descripcion}".`);
        break;

    default:
        console.log('No se reconoce la instrucción');
}
