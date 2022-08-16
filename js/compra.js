const vehiculosPublicados = document.getElementById("vehiculosPublicados")

let favoritos = [];

if (localStorage.getItem('favoritos')) {
        favoritos = JSON.parse(localStorage.getItem('favoritos'))
} else {
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

//Funcion para pedir vehiculos al JSON
async function pedirVehiculos() {
        const response = await fetch("../vehiculos.json")
        const data = await response.json()

        const cantidadArrojada = document.getElementById("cantidadArrojada")
        cantidadArrojada.innerHTML = `
        ${data.length}
        `

        function renderizarProductos(data) {
                vehiculosPublicados.innerHTML = ""
                cantidadArrojada.innerHTML = ""
                cantidadArrojada.innerHTML = `
        ${data.length}
        `
                data.forEach((vehiculo, indice) => {
                        vehiculosPublicados.innerHTML += `
                <div class="card col-10 col-md-6 col-lg-4 col-xxl-3 d-block mx-auto my-2" id=vehiculo${indice}>
                        <img src="${vehiculo.img}" class="card-img-top img-fluid p-2 rounded-4" alt="${vehiculo.marca} ${vehiculo.version}">
                        <div class="card-body">
                                <h4 class="card-title text-center fw-bold">${vehiculo.marca.toUpperCase()} ${vehiculo.version.toUpperCase()}</h4>
                                <p class="card-text text-center">${vehiculo.modelo} - ${vehiculo.km}km - ${vehiculo.ciudad.toUpperCase()}, ${vehiculo.provincia.toUpperCase()}</p>
                                <h5 class="card-title text-center fw-bold">$${vehiculo.valor}</h5>
                                <button href="#" class="btn btn-dark d-block mx-auto mt-3">Añadir a favoritos</button>
                                <button href="#" class="btn btn-dark d-block mx-auto mt-3">Contacto</button>
                        </div>
                </div>
                `
                });
                data.forEach((vehiculo, indice) => {
                        const botonAgregar = (document.getElementById(`vehiculo${indice}`).lastElementChild.children[3]);
                        botonAgregar.addEventListener('click', () => {
                                favoritos.push(vehiculo);
                                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                                Toastify({
                                        text: "Añadido a favoritos",
                                        duration: 3000,
                                        close: true,
                                        gravity: "bottom",
                                        position: "left",
                                        stopOnFocus: true,
                                        style: {
                                                background: "linear-gradient(to right, #000000, #4C4C4C)",
                                        },
                                        onClick: function () {}
                                }).showToast();
                        })

                        const botonContacto = (document.getElementById(`vehiculo${indice}`).lastElementChild.lastElementChild);
                        botonContacto.addEventListener('click', () => {
                                Swal.fire({
                                        icon: 'info',
                                        title: 'Datos de contacto:',
                                        html: `<p>Email: ${vehiculo.mail}</p>
                        <p>Telefono: ${vehiculo.telefono}</p>
                        <p>Ubicacion: ${vehiculo.ciudad}, ${vehiculo.provincia}</p>`,
                                        confirmButtonColor: "black",
                                })
                        })
                })
        }

        data.forEach((vehiculo, indice) => {
                vehiculosPublicados.innerHTML += `
        <div class="card col-10 col-md-6 col-lg-4 col-xxl-3 d-block mx-auto my-2" id=vehiculo${indice}>
                <img src="${vehiculo.img}" class="card-img-top img-fluid p-2 rounded-4" alt="${vehiculo.marca} ${vehiculo.version}">
                <div class="card-body">
                        <h4 class="card-title text-center fw-bold">${vehiculo.marca.toUpperCase()} ${vehiculo.version.toUpperCase()}</h4>
                        <p class="card-text text-center">${vehiculo.modelo} - ${vehiculo.km}km - ${vehiculo.ciudad.toUpperCase()}, ${vehiculo.provincia.toUpperCase()}</p>
                        <h5 class="card-title text-center fw-bold">$${vehiculo.valor}</h5>
                        <button href="#" class="btn btn-dark d-block mx-auto mt-3">Añadir a favoritos</button>
                        <button href="#" class="btn btn-dark d-block mx-auto mt-3">Contacto</button>
                </div>
        </div>
        `
        });
        data.forEach((vehiculo, indice) => {
                const botonAgregar = (document.getElementById(`vehiculo${indice}`).lastElementChild.children[3]);
                botonAgregar.addEventListener('click', () => {
                        favoritos.push(vehiculo);
                        localStorage.setItem('favoritos', JSON.stringify(favoritos));
                        Toastify({
                                text: "Añadido a favoritos",
                                duration: 3000,
                                close: true,
                                gravity: "bottom",
                                position: "left",
                                stopOnFocus: true,
                                style: {
                                        background: "linear-gradient(to right, #000000, #4C4C4C)",
                                },
                                onClick: function () {}
                        }).showToast();
                })

                const botonContacto = (document.getElementById(`vehiculo${indice}`).lastElementChild.lastElementChild);
                botonContacto.addEventListener('click', () => {
                        Swal.fire({
                                icon: 'info',
                                title: 'Datos de contacto:',
                                html: `<p>Email: ${vehiculo.mail}</p>
                        <p>Telefono: ${vehiculo.telefono}</p>
                        <p>Ubicacion: ${vehiculo.ciudad}, ${vehiculo.provincia}</p>`,
                                confirmButtonColor: "black",
                        })
                })
        })


        //Metodos de ordenamiento segun valores y antiguedad

        const mayorMenor = document.getElementById("mayorMenor");
        const menorMayor = document.getElementById("menorMayor");
        const antiguoNuevo = document.getElementById("antiguoNuevo");
        const nuevoAntiguo = document.getElementById("nuevoAntiguo");

        mayorMenor.addEventListener("click", () => {
                renderizarProductos(data.sort((a, b) => b.valor - a.valor))
        })

        menorMayor.addEventListener("click", () => {
                renderizarProductos(data.sort((a, b) => a.valor - b.valor))
        })

        antiguoNuevo.addEventListener("click", () => {
                renderizarProductos(data.sort((a, b) => a.modelo - b.modelo))
        })

        nuevoAntiguo.addEventListener("click", () => {
                renderizarProductos(data.sort((a, b) => b.modelo - a.modelo))
        })

        //Filtros por clase
        const claseAuto = document.getElementById("claseAuto");
        const claseCamioneta = document.getElementById("claseCamioneta");
        const claseTodos = document.getElementById("claseTodos");

        claseAuto.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.clase == "auto"))
        })

        claseCamioneta.addEventListener("click", () => {
                renderizarProductos(data.filter(vehiculo => vehiculo.clase == "camioneta"))
        })

        claseTodos.addEventListener("click", () => {
                renderizarProductos(data)
        })

        //Filtros por marca
        const marcaAudi = document.getElementById("marcaAudi");
        const marcaBMW = document.getElementById("marcaBMW");
        const marcaChevrolet = document.getElementById("marcaChevrolet");
        const marcaFiat = document.getElementById("marcaFiat");
        const marcaFord = document.getElementById("marcaFord");
        const marcaHonda = document.getElementById("marcaHonda");
        const marcaMercedes = document.getElementById("marcaMercedes");
        const marcaNissan = document.getElementById("marcaNissan");
        const marcaRenault = document.getElementById("marcaRenault");
        const marcaToyota = document.getElementById("marcaToyota");
        const marcaVolkswagen = document.getElementById("marcaVolkswagen");
        const marcaTodos = document.getElementById("marcaTodos");

        marcaAudi.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "audi"))
        })

        marcaBMW.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "bmw"))
        })

        marcaChevrolet.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "chevrolet"))
        })

        marcaFiat.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "fiat"))
        })

        marcaFord.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "ford"))
        })

        marcaHonda.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "honda"))
        })

        marcaMercedes.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "mercedes"))
        })

        marcaNissan.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "nissan"))
        })

        marcaRenault.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "renault"))
        })

        marcaToyota.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "toyota"))
        })

        marcaVolkswagen.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.marca == "volkswagen"))
        })

        marcaTodos.addEventListener("click", () => {
                renderizarProductos(data)
        })

        //Filtros por modelo
        const modelo2012 = document.getElementById("modelo2012")
        const modelo2013 = document.getElementById("modelo2013")
        const modelo2014 = document.getElementById("modelo2014")
        const modelo2015 = document.getElementById("modelo2015")
        const modelo2016 = document.getElementById("modelo2016")
        const modelo2017 = document.getElementById("modelo2017")
        const modelo2018 = document.getElementById("modelo2018")
        const modelo2019 = document.getElementById("modelo2019")
        const modelo2020 = document.getElementById("modelo2020")
        const modelo2021 = document.getElementById("modelo2021")
        const modelo2022 = document.getElementById("modelo2022")
        const modeloTodos = document.getElementById("modeloTodos")

        modelo2012.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2012))
        })

        modelo2013.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2013))
        })

        modelo2014.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2014))
        })

        modelo2015.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2015))
        })

        modelo2016.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2016))
        })

        modelo2017.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2017))
        })

        modelo2018.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2018))
        })

        modelo2019.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2019))
        })

        modelo2020.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2020))
        })

        modelo2021.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2021))
        })

        modelo2022.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.modelo == 2022))
        })

        modeloTodos.addEventListener("click", () => {
                renderizarProductos(data)
        })

        const valor1 = document.getElementById("valor1")
        const valor2 = document.getElementById("valor2")
        const valor3 = document.getElementById("valor3")
        const valor4 = document.getElementById("valor4")
        const valor5 = document.getElementById("valor5")
        const valor6 = document.getElementById("valor6")
        const valorTodos = document.getElementById("valorTodos")

        valor1.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 2000000 && vehiculo.valor < 3000000))
        })

        valor2.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 3000000 && vehiculo.valor < 4000000))
        })

        valor3.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 4000000 && vehiculo.valor < 5000000))
        })

        valor4.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 5000000 && vehiculo.valor < 6000000))
        })

        valor5.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 6000000 && vehiculo.valor < 7000000))
        })

        valor6.addEventListener("click", () => {
                renderizarProductos(data.filter((vehiculo) => vehiculo.valor > 7000000))
        })

        valorTodos.addEventListener("click", () => {
                renderizarProductos(data)
        })
}

pedirVehiculos();