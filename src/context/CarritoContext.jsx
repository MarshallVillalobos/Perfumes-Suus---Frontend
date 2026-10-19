import { createContext, useState, useEffect, useContext } from 'react';
import { productosPerfumes } from '../data/productos';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carritoSuus');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carritoSuus', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (idProducto, cantidad = 1) => {
    const productoEncontrado = productosPerfumes.find((p) => p.id === idProducto);
    if (!productoEncontrado) return;

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === idProducto);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === idProducto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...productoEncontrado, cantidad }];
      }
    });

    alert(`¡${productoEncontrado.nombre} añadido al carrito!`);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  const cantidadTotal = carrito.reduce((total, prod) => total + prod.cantidad, 0);

  const totalPrecio = carrito.reduce(
    (total, prod) => total + prod.precio * prod.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cantidadTotal,
        totalPrecio,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}