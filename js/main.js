const productosPerfumes = [
    { id: 1, nombre: "Andrews Eau de Parfum", precio: 50000, imagen: "img/perfume_principal.webp" },
    { id: 2, nombre: "Power of You", precio: 65000, imagen: "img/perfume_principal.webp" },
    { id: 3, nombre: "Oud Wood Intense", precio: 85000, imagen: "img/perfume_principal.webp" },
    { id: 4, nombre: "Santal 33", precio: 120000, imagen: "img/perfume_principal.webp" }
];

let carrito = JSON.parse(localStorage.getItem("carritoSuus")) || [];

function validarCorreo(email) {
    const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(email);
}

function renderizarProductos() {
    const contenedor = document.querySelector(".grilla-productos");
    if (!contenedor) return; 

    contenedor.innerHTML = ""; 

    productosPerfumes.forEach(producto => {
        const article = document.createElement("article");
        article.className = "tarjeta-producto";
        article.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
            <button class="boton-principal" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(article);
    });
}

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productosPerfumes.find(p => p.id === idProducto);
    const itemEnCarrito = carrito.find(item => item.id === idProducto);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }
    localStorage.setItem("carritoSuus", JSON.stringify(carrito));
    
    alert(`¡${productoEncontrado.nombre} añadido al carrito!`);
    console.log(carrito);
}

function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("lista-carrito");
    const contenedorTotal = document.getElementById("total-carrito");
    
    if (!contenedorCarrito) return; 

    contenedorCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p style='text-align:center; padding: 40px;'>Tu carrito está vacío.</p>";
        contenedorTotal.innerText = "$0";
        return;
    }

    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenedorCarrito.innerHTML += `
            <div class="item-carrito">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-carrito-info">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio.toLocaleString('es-CL')} x ${producto.cantidad}</p>
                </div>
                <div class="item-carrito-acciones">
                    <strong style="display:block; font-size: 18px;">$${subtotal.toLocaleString('es-CL')}</strong>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });

    contenedorTotal.innerText = `$${total.toLocaleString('es-CL')}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    localStorage.setItem("carritoSuus", JSON.stringify(carrito)); 
    renderizarCarrito(); 
}


/* LÓGICA DE REGIONES Y COMUNAS  */
const datosUbicacion = {
    "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
};

function inicializarUbicaciones() {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    if (!selectRegion || !selectComuna) return;

    for (const region in datosUbicacion) {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    }

    selectRegion.addEventListener("change", function() {
        const regionSeleccionada = this.value;
        
        selectComuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';
        
        if (regionSeleccionada !== "") {
            selectComuna.disabled = false;
            const comunas = datosUbicacion[regionSeleccionada];
            
            comunas.forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna;
                option.textContent = comuna;
                selectComuna.appendChild(option);
            });
        } else {
            selectComuna.disabled = true;
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    renderizarCarrito();
    inicializarUbicaciones();

    const formLogin = document.getElementById("formulario-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            const inputCorreo = document.getElementById("correo").value.trim().toLowerCase();
            const inputContrasena = document.getElementById("contrasena").value.trim();
            
            const errorCorreo = document.getElementById("error-correo");
            const errorContrasena = document.getElementById("error-contrasena");
            
            errorCorreo.innerText = "";
            errorContrasena.innerText = "";
            let hayErrores = false;

            if (inputCorreo === "") {
                errorCorreo.innerText = "El correo es obligatorio.";
                hayErrores = true;
            } else if (inputCorreo.length > 100) {
                errorCorreo.innerText = "El correo no puede superar los 100 caracteres.";
                hayErrores = true;
            } else if (!validarCorreo(inputCorreo)) {
                errorCorreo.innerText = "Formato inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.";
                hayErrores = true;
            }

            if (inputContrasena === "") {
                errorContrasena.innerText = "La contraseña es obligatoria.";
                hayErrores = true;
            } else if (inputContrasena.length < 4 || inputContrasena.length > 10) {
                errorContrasena.innerText = "La contraseña debe tener entre 4 y 10 caracteres.";
                hayErrores = true;
            }

            if (!hayErrores) {
                alert("¡Inicio de sesión exitoso!");
                window.location.href = "inicio.html"; 
            }
        });
    }

    const formRegistro = document.getElementById("formulario-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            const inputRun = document.getElementById("run").value.trim();
            const inputNombre = document.getElementById("nombre").value.trim();
            const inputApellidos = document.getElementById("apellidos").value.trim();
            const inputCorreo = document.getElementById("correo-reg").value.trim().toLowerCase();
            
            const errorRun = document.getElementById("error-run");
            const errorNombre = document.getElementById("error-nombre");
            const errorApellidos = document.getElementById("error-apellidos");
            const errorCorreo = document.getElementById("error-correo-reg");
            
            errorRun.innerText = "";
            errorNombre.innerText = "";
            errorApellidos.innerText = "";
            errorCorreo.innerText = "";
            let hayErrores = false;

            const inputRegion = document.getElementById("region").value;
            const inputComuna = document.getElementById("comuna").value;
            const inputDireccion = document.getElementById("direccion").value.trim();

            const errorRegion = document.getElementById("error-region");
            const errorComuna = document.getElementById("error-comuna");
            const errorDireccion = document.getElementById("error-direccion");

            errorRegion.innerText = "";
            errorComuna.innerText = "";
            errorDireccion.innerText = "";

            if (inputRegion === "") {
                errorRegion.innerText = "Debe seleccionar una región.";
                hayErrores = true;
            }
            
            if (inputComuna === "") {
                errorComuna.innerText = "Debe seleccionar una comuna.";
                hayErrores = true;
            }

            if (inputDireccion === "") {
                errorDireccion.innerText = "La dirección es obligatoria.";
                hayErrores = true;
            } else if (inputDireccion.length > 300) {
                errorDireccion.innerText = "La dirección no puede superar los 300 caracteres.";
                hayErrores = true;
            }

            if (inputRun === "") {
                errorRun.innerText = "El RUN es obligatorio.";
                hayErrores = true;
            } else if (inputRun.includes(".") || inputRun.includes("-")) {
                errorRun.innerText = "El RUN debe ser ingresado sin puntos ni guion.";
                hayErrores = true;
            } else if (inputRun.length < 7 || inputRun.length > 9) {
                errorRun.innerText = "El RUN debe tener entre 7 y 9 caracteres.";
                hayErrores = true;
            } else if (!validarRutChileno(inputRun)) {
                errorRun.innerText = "El RUN ingresado no es válido matemáticamente.";
                hayErrores = true;
            }

            if (inputNombre === "") {
                errorNombre.innerText = "El nombre es obligatorio.";
                hayErrores = true;
            } else if (inputNombre.length > 50) {
                errorNombre.innerText = "El nombre no puede superar los 50 caracteres.";
                hayErrores = true;
            }

            if (inputApellidos === "") {
                errorApellidos.innerText = "Los apellidos son obligatorios.";
                hayErrores = true;
            } else if (inputApellidos.length > 100) {
                errorApellidos.innerText = "Los apellidos no pueden superar los 100 caracteres.";
                hayErrores = true;
            }

            if (inputCorreo === "") {
                errorCorreo.innerText = "El correo es obligatorio.";
                hayErrores = true;
            } else if (inputCorreo.length > 100) {
                errorCorreo.innerText = "El correo no puede superar los 100 caracteres.";
                hayErrores = true;
            } else if (!validarCorreo(inputCorreo)) {
                errorCorreo.innerText = "Formato inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.";
                hayErrores = true;
            }

            if (!hayErrores) {
                alert("¡Registro completado con éxito!");
                window.location.href = "login.html"; 
            }
        });
    }
});

function validarRutChileno(rutString) {
    const cuerpo = rutString.slice(0, -1);
    const dv = rutString.slice(-1).toUpperCase();
    
    if (!/^[0-9]+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
        const index = multiplo * rutString.charAt(cuerpo.length - i);
        suma = suma + index;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvCalculado;
}