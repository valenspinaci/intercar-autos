//Configurando array y storage para guardar vehiculos favoritos

const vehiculosFavoritos = document.getElementById('vehiculosFavoritos');

let favoritos = [];

let storageFavoritos = JSON.parse(localStorage.getItem('favoritos'))??[];

if (localStorage.getItem('favoritos')){
    favoritos = JSON.parse(localStorage.getItem('favoritos'))
} else{
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

//Condicional para mostrar cantidad de resultados arrojados
if(storageFavoritos.length > 0){
vehiculosFavoritos.innerHTML += `
        <div>
            <h1 class="text-black-50 my-3 fs-6 fw-semibold">Resultados arrojados: <span class="fw-lighter">${favoritos.length}</span></h1>
            <hr>
        </div>
`
}

//Condicional para mostrar los vehiculos favoritos o el cartel que dice que no hay vehiculos en la lista
if(storageFavoritos.length>0){
storageFavoritos.forEach((vehiculo, indice)=>{
    vehiculosFavoritos.innerHTML += `
    <div class="card col-10 col-md-6 col-lg-4 col-xxl-3 d-block mx-auto my-2" id=vehiculo${indice}>
        <img src="${vehiculo.img}" class="card-img-top img-fluid p-2 rounded-4" alt="${vehiculo.marca} ${vehiculo.version}">
        <div class="card-body">
            <h4 class="card-title text-center fw-bold">${vehiculo.marca.toUpperCase()} ${vehiculo.version.toUpperCase()}</h4>
            <p class="card-text text-center">${vehiculo.modelo} - ${vehiculo.km} - ${vehiculo.ciudad.toUpperCase()}, ${vehiculo.provincia.toUpperCase()}</p>
            <h5 class="card-title text-center fw-bold">$${vehiculo.valor}</h5>
            <button href="#" id='botonEliminar' class="btn btn-dark d-block mx-auto mt-3">Eliminar de favoritos</button>
            <button href="#" id='botonContacto' class="btn btn-dark d-block mx-auto mt-3">Contacto</button>
        </div>
    </div>
    `
})} else{
    vehiculosFavoritos.innerHTML += `
    <div class="alert alert-dark" role="alert">
        Todavía no has agregado ningún vehículo a tu lista de favoritos!
    </div>
    <div class="card">
    <div class="card-body">
        <h5 class="card-title fw-bold mb-4">Juntá tus vehículos favoritos en un lugar</h5>
        <p class="card-text">1 - Andá a la sección <span class="fw-bold">comprá</span> o hace <a href=../pages/compra.html class="text-decoration-none">click acá</a></p>
        <p class="card-text">2 - Buscá entre todos los vehículos que están esperando por vos</p>
        <p class="card-text">3 - Elegí los que más te gusten y apretá en el boton que dice "Agregar a favoritos"</p>
        <p class="card-text">Listo! Ya tenés tus autos favoritos en un lugar!</p>
    </div>
    <img src="../img/interior-auto-favoritos.jpg" class="card-img-bottom img-fluid mb-2" alt="Interior auto">
    </div>
    `
}
console.log(favoritos)

//Boton para eliminar de la lista
storageFavoritos.forEach((vehiculo, indice)=>{
    const botonEliminar = (document.getElementById(`vehiculo${indice}`).lastElementChild.children[3]);
    botonEliminar.addEventListener("click",()=>{
        document.getElementById(`vehiculo${indice}`).remove();
        favoritos.splice(indice, 1);
        (localStorage.setItem("favoritos", JSON.stringify(favoritos)));
        Toastify({
            text: "Eliminado de favoritos",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #000000, #4C4C4C)",
            },
            onClick: function(){} 
            }).showToast();
    })

    const botonContacto = (document.getElementById(`vehiculo${indice}`).lastElementChild.lastElementChild);
    botonContacto.addEventListener('click', () => {
        Swal.fire({
            icon: 'info',
            title: 'Datos de contacto:',
            html:
                `<p>Email: ${vehiculo.mail}</p>
                <p>Teléfono: ${vehiculo.telefono}</p>
                <p>Ubicación: ${vehiculo.ciudad}, ${vehiculo.provincia}</p>`,
            confirmButtonColor: "black",
        })
    })
})

//Condicional para agrandar body cuando tengo pocos vehiculos en la lista
if(storageFavoritos.length<4){
    document.getElementById("contenedorFavoritos").style.height = "78vh";
}