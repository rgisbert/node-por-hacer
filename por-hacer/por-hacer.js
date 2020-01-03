const fs = require('fs');

const rutaArchivo = `db/data.json`;
let listadoPorHacer = [];


const cargarDB = () => {
    try {
        listadoPorHacer = require(`../${rutaArchivo}`);
    } catch(error) {
        listadoPorHacer = [];
    }
};


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(rutaArchivo, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        // else console.log(`Se ha actualizado el arhivo correctamente.`);
    });
};


const crear = descripcion => {
    let porHacer = {
        descripcion,
        completado: false,
        fecha: new Date()
    };

    try {
        cargarDB();
        listadoPorHacer.push(porHacer);
        guardarDB();
    
        return porHacer;
    } catch (error) {
        throw new Error (error);
    }
};

const getListado = () => {
    cargarDB()
    return listadoPorHacer;
};


const actualizar = (descripcion, completado) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion );
    

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = descripcion => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

    /**
     * SOLUCIÓN PROFESOR
     * 
     * cargarDB();
     * 
     * let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
     * 
     * // Si tienen la misma longitud, no ha borrado nada
     * if (listadoPorHacer.length === nuevoListado.length) {
     *      return false;
     * } else {
     *      listadoPorHacer = nuevoListado;
     *      guardarDB();
     *      return true;
     * }
     */
};


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
