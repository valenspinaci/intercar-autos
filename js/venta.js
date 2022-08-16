//Declarando objeto datos para los datos ingresados para los posibles vendedores
class Datos {
    constructor(nombre, apellido, email, telefono, clase, marca, version, modelo, mensaje){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.clase = clase;
        this.marca = marca;
        this.version = version;
        this.modelo = modelo;
        this.mensaje = mensaje;
    }
}

//Array para guardar datos de posibles autos
//Luego estos datos podran ser utilizados para enviar emails a quienes deseen publicar en el sitio
let posibles = [];

//Storage para posibles ventas con todos los datos del cliente
posibles = JSON.parse(localStorage.getItem('posibleStorage'))??[];

//Boton formulario de venta

const formularioVenta = document.getElementById('formularioVenta');

formularioVenta.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.toLowerCase();
    const apellido = document.getElementById('apellido').value.toLowerCase();
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const clase = document.getElementById('clase').value;
    const marca = document.getElementById('marca').value.toLowerCase();
    const version = document.getElementById('version').value.toLowerCase();
    const modelo = document.getElementById('modelo').value;
    const mensaje = document.getElementById('mensaje').value.toLowerCase();

    const posible = new Datos(nombre, apellido, email, telefono, clase, marca, version, modelo, mensaje);

//Condicionales para formulario donde se ingresan vehiculos
    if (marca != "ford" && marca != "chevrolet" && marca != "toyota" && marca != "volkswagen" && marca != "honda" && marca != "nissan" && marca != "renault" && marca != "fiat" && marca != "audi" && marca != "mercedes benz" && marca != "bmw") {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos!',
            text: 'No aceptamos vehiculos de la marca ingresada',
            confirmButtonColor: "black"
        })
        return(false);
    }

    if (modelo < 2012 || modelo > 2022){
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos!',
            text: 'El vehículo debe ser modelo 2012 en adelante',
            confirmButtonColor: "black",
        })
        return(false);
    }


    posibles.push(posible);

    localStorage.setItem('posibleStorage', JSON.stringify(posibles));

    formularioVenta.reset();

    Swal.fire({
        icon: 'success',
        title: 'Tu auto fue publicado!',
        text: 'A la brevedad nos contactaremos contigo para coordinar una visita',
        confirmButtonColor: "black",
    })
})