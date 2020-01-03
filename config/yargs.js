const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
                .command('crear', 'Crear un elemento por hacer', {descripcion})
                .command('actualizar', 'Actualiza el estado completado de una tarea', {descripcion, completado})
                .command('listar', 'Muestra un listado de todas las tareas')
                .command('borrar', 'Elimina una tarea de la lista', {descripcion})
                .help()
                .argv;

module.exports = {
    argv
};
