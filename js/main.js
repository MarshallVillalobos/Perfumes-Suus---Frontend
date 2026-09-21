const productosPerfumes = [
  {
    "id": 1,
    "nombre": "Andrews Eau de Parfum",
    "precio": 50000,
    "imagen": "img/perfume_principal.webp",
    "descripcion": "Fragancia exclusiva con notas amaderadas y toques cítricos, diseñada para durar todo el día."
  },
  {
    "id": 2,
    "nombre": "Power of You",
    "precio": 65000,
    "imagen": "img/perfume_principal.webp",
    "descripcion": "Aroma intenso que combina notas dulces y orientales para una presencia inconfundible y magnética."
  },
  {
    "id": 3,
    "nombre": "Oud Wood Intense",
    "precio": 85000,
    "imagen": "img/perfume_principal.webp",
    "descripcion": "Fragancia profunda y exótica, centrada en el rico aroma de la madera de oud, complementado con especias cálidas."
  },
  {
    "id": 4,
    "nombre": "Santal 33",
    "precio": 120000,
    "imagen": "img/perfume_principal.webp",
    "descripcion": "Un aroma icónico e inconfundible, con notas de cardamomo, iris, violeta y ambroxan, que evoca el espíritu del oeste americano."
  }
]

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
            <a href="detalle_producto.html?id=${producto.id}" class="enlace-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
            </a>
            <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
            <a href="detalle_producto.html?id=${producto.id}" class="boton-principal">Ver detalle</a>
            <button class="boton-principal" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(article);
    });
}

function renderizarDetalle() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    const id = parseInt(new URLSearchParams(window.location.search).get("id"));
    const producto = productosPerfumes.find(p => p.id === id);

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado. <a href='productos.html'>Volver al catálogo</a></p>";
        return;
    }

    document.title = `${producto.nombre} - Perfumes Suus`;
    document.getElementById("detalle-imagen").src = producto.imagen;
    document.getElementById("detalle-imagen").alt = producto.nombre;
    document.getElementById("detalle-nombre").innerText = producto.nombre;
    document.getElementById("detalle-precio").innerText = `$${producto.precio.toLocaleString('es-CL')}`;
    document.getElementById("detalle-descripcion").innerText = producto.descripcion;
    document.getElementById("btn-detalle-agregar").onclick = () => {
        const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
        agregarAlCarrito(producto.id, cantidad);
    };
}

function agregarAlCarrito(idProducto, cantidad = 1) {
    const productoEncontrado = productosPerfumes.find(p => p.id === idProducto);
    const itemEnCarrito = carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: cantidad });
    }
    localStorage.setItem("carritoSuus", JSON.stringify(carrito));

    actualizarContadorCarrito();
    
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
    actualizarContadorCarrito(); 
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

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        // Calculamos la cantidad total sumando la propiedad 'cantidad' de cada producto
        const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        contador.innerText = cantidadTotal;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarProductos();
    renderizarDetalle();
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
    
    const formularioContacto = document.getElementById("formulario-contacto");
    if (formularioContacto) {
        formularioContacto.addEventListener("submit", function(evento) {
            evento.preventDefault(); 

            const inputNombreContacto = document.getElementById("nombre-contacto").value.trim();
            const inputCorreoContacto = document.getElementById("correo-contacto").value.trim().toLowerCase();
            const inputComentarioContacto = document.getElementById("comentario-contacto").value.trim();
            
            const errorNombreContacto = document.getElementById("error-nombre-contacto");
            const errorCorreoContacto = document.getElementById("error-correo-contacto");
            const errorComentarioContacto = document.getElementById("error-comentario-contacto");
            
            errorNombreContacto.innerText = "";
            errorCorreoContacto.innerText = "";
            errorComentarioContacto.innerText = "";
            
            let hayErrores = false;

            if (inputNombreContacto === "") {
                errorNombreContacto.innerText = "El nombre completo es obligatorio.";
                hayErrores = true;
            } else if (inputNombreContacto.length > 100) {
                errorNombreContacto.innerText = "El nombre completo no puede superar los 100 caracteres.";
                hayErrores = true;
            }

            if (inputCorreoContacto === "") {
                errorCorreoContacto.innerText = "El correo es obligatorio.";
                hayErrores = true;
            } else if (inputCorreoContacto.length > 100) {
                errorCorreoContacto.innerText = "El correo no puede superar los 100 caracteres.";
                hayErrores = true;
            } else if (!validarCorreo(inputCorreoContacto)) {
                 errorCorreoContacto.innerText = "Formato inválido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com.";
                 hayErrores = true;
            }

            if (inputComentarioContacto === "") {
                errorComentarioContacto.innerText = "El comentario es obligatorio.";
                hayErrores = true;
            } else if (inputComentarioContacto.length > 500) {
                errorComentarioContacto.innerText = "El comentario no puede superar los 500 caracteres.";
                hayErrores = true;
            }

            if (!hayErrores) {
                alert("¡Mensaje de contacto enviado con éxito!");
                formularioContacto.reset();
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