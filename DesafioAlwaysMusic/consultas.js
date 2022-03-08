const { Client } = require("pg");
//Este archivo contiene los codigos javascript para el CRUD

const config = {
    user: "postgres",
    host: "localhost",
    database: "colegio",
    password: "13991987Ft",
    port: 5432,
    };
const client = new Client(config);
client.connect();

async function ingresar(arr){
    try{
        const res = await client.query(`insert into alumnos (nombre, rut, curso, nivel) values ('${arr[0]}', '${arr[1]}','${arr[2]}', '${arr[3]}') RETURNING *;`);
        console.log(res.rowCount + " registro afectado")
        console.log(`Estudiante ${res.rows[0].nombre} agregado con éxito`);
        client.end();
    }catch(e){
        console.log('No se puedo completar la operacion de inserción')
        console.log(`Error : ${e}`)
    }
}

async function consultar(){
    try{
        const res = await client.query(`SELECT * FROM alumnos;`);
        let obj={
            Registros: res.rows
        }
        console.log('Consulta satisfactoria')
        console.log('------------------------')
        console.log(obj);
        client.end();
    }catch(e){
        console.log('No se puedo completar la operacion de consulta')
        console.log(`Error : ${e}`)
        client.end();
    }
}
async function editar(arr){
    try{
        const res = await client.query(`UPDATE alumnos SET nombre = '${arr[0]}', curso='${arr[2]}', nivel='${arr[3]}' WHERE rut = '${arr[1]}' RETURNING *;`);
        console.log(res.rowCount + " registro afectado")
        console.log(`EStudiante ${res.rows[0].nombre} editado con exito`);
        client.end();
    }catch(e){
        console.log('No se puedo completar la operacion de edición')
        console.log(`Error : ${e}`)
        client.end();
    }
};
async function consultaXrut(xRut){
    try{
        const res = await client.query(`SELECT * FROM alumnos WHERE rut= '${xRut}';`);
        console.log('Consulta satisfactoria')
        console.log('------------------------')
        console.log( res.rows);
        client.end();
    }catch(e){
        console.log('No se puedo completar la operacion de edición')
        console.log(`Error : ${e}`)
        client.end();
    }
};
async function eliminar(xRut){
    try{
        const res = await client.query(`DELETE FROM alumnos WHERE rut= '${xRut}';`);
        console.log('Consulta satisfactoria')
        console.log('------------------------')
        console.log(res.rowCount + " registros afectados")
        console.log(`Registro de estudiante con rut ${xRut} eliminado`)
        client.end();
    }catch(e){
        console.log('No se puedo completar la operacion de eliminación de la base de datos')
        console.log(`Error : ${e}`)
        client.end();
    }
}
module.exports={ingresar, consultar, editar, consultaXrut, eliminar}