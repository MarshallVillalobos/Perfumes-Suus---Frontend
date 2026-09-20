
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