//Almacenando el modulo Client de "pg"
const {Client} = require("pg")

//objeto de configuración
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'usuarios',
    password: 'postgres',
    port: 5432,
}

//Capturando los comandos ingresados por consola
const comandos = process.argv.slice(2)

//Estableciendo la nueva instancia Client con el objeto de configuración
const client = new Client(config)

client.connect()

async function addUser() {
    const res = await client.query(`insert into usuario (nombre, rut, curso, nivel) values ('${comandos[1]}', '${comandos[2]}', '${comandos[3]}', '${comandos[4]}') RETURNING *;`)
    console.log(`El estudiante "${comandos[1]}" ha sido agregado exitosamente`)
    client.end()
}

//función para consultar todos los estudiantes con el comando: node index.js consulta
async function consultarTabla() {
    const res = await client.query("SELECT * FROM usuario")
    console.log("Registros ", res.rows)
    client.end()
}

// función consultar por rut con el comando: node index.js rut '12.345.678-9'
async function consultarRUT() {
    const res = await client.query(`SELECT * FROM usuario WHERE rut = '${comandos[1]}'`)
    console.log(`El usuario con rut: ${comandos[1]} es: `, res.rows)
    client.end()
}
// función para editar el nivel del estudiante, con el comando: node index.js editar nombre rut curso nuevo nivel
async function editUser() {
    const res = await client.query(`UPDATE usuario SET nivel = '${comandos[4]}' WHERE rut = '${comandos[2]}'`)
    console.log(`El estudiante "${comandos[1]}" ha sido editado con éxito`)
    client.end()
}

//función eliminar a estudiante al ingresar comando: node index.js eliminar rut
async function eliminar() {
    const res = await client.query(`DELETE FROM usuario WHERE rut = '${comandos[1]}'`)
    console.log(`Registro de estudiante con rut ${comandos[1]} ha sido eliminado`)
    client.end()
}

//Condicionales para desencadenar las funciones
if (comandos[0] == "nuevo") {
    addUser()
}if (comandos[0] == "consulta") {
    consultarTabla()
}if (comandos[0] == "editar") {
    editUser()
}if (comandos[0] == "eliminar") {
    eliminar()
}if (comandos[0] == "rut") {
    consultarRUT()
}