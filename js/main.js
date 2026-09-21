
const productosPerfumes = [
    { id: 1, nombre: "Andrews Eau de Parfum", precio: 50000, imagen: "img/perfume_principal.webp" },
    { id: 2, nombre: "Power of You", precio: 65000, imagen: "img/perfume_principal.webp" },
    { id: 3, nombre: "Oud Wood Intense", precio: 85000, imagen: "img/perfume_principal.webp" },
    { id: 4, nombre: "Santal 33", precio: 120000, imagen: "img/perfume_principal.webp" }
];

let carrito = JSON.parse(localStorage.getItem("carritoSuus")) || [];


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
document.addEventListener("DOMContentLoaded", renderizarProductos);

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
                    <button onclick="eliminarDelCarrito(${index})" style="color:red; cursor:pointer; border:none; background:none; text-decoration:underline; margin-top:5px;">Eliminar</button>
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

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    renderizarCarrito();
});

/* VALIDACIONES DEL FORMULARIO DE LOGIN */

document.addEventListener("DOMContentLoaded", () => {
    
    const formLogin = document.getElementById("formulario-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function(evento) {
            
            evento.preventDefault(); 

            
            const inputCorreo = document.getElementById("correo").value.trim();
            const inputContrasena = document.getElementById("contrasena").value.trim();
            
            
            const errorCorreo = document.getElementById("error-correo");
            const errorContrasena = document.getElementById("error-contrasena");
            
            
            errorCorreo.innerText = "";
            errorContrasena.innerText = "";
            let hayErrores = false;

            
            const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const terminaEnDominioValido = dominiosValidos.some(dominio => inputCorreo.endsWith(dominio));

            if (inputCorreo === "") {
                errorCorreo.innerText = "El correo es obligatorio.";
                hayErrores = true;
            } else if (inputCorreo.length > 100) {
                errorCorreo.innerText = "El correo no puede superar los 100 caracteres.";
                hayErrores = true;
            } else if (!terminaEnDominioValido) {
                errorCorreo.innerText = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
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
});