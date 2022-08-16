//Clase para datos de contacto
class Contacto {
    constructor(nombreContacto, apellidoContacto, emailContacto, mensajeContacto){
        this.nombreContacto = nombreContacto;
        this.apellidoContacto = apellidoContacto;
        this.emailContacto = emailContacto;
        this.mensajeContacto = mensajeContacto;
    }
}

let contactos = JSON.parse(localStorage.getItem('contactoStorage'))??[];

localStorage.setItem('contactoStorage', JSON.stringify(contactos));

const formularioContacto = document.getElementById('formularioContacto');

//Evento submit para formulario de contacto con notificacion
formularioContacto.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nombreContacto = document.getElementById('nombreContacto');
    const apellidoContacto = document.getElementById('apellidoContacto');
    const emailContacto = document.getElementById('emailContacto');
    const mensajeContacto = document.getElementById('mensajeContacto');

    const contacto = new Contacto(nombreContacto, apellidoContacto, emailContacto, mensajeContacto);

    contactos.push(contacto);

    localStorage.setItem('contactoStorage', JSON.stringify(contactos));

    formularioContacto.reset();

    Swal.fire({
        icon: 'success',
        title: 'Los datos fueron enviados!',
        text: 'A la brevedad nos contactaremos contigo a través del correo indicado',
        confirmButtonColor: "black",
    })
})