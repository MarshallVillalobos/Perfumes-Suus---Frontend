import { Link } from 'react-router-dom';

function TarjetaProducto({ producto, alAgregar }) {
  return (
    <article className="tarjeta-producto shadow-sm">
      <Link to={`/producto/${producto.id}`} className="enlace-producto">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-fluid"
        />
        <h3>{producto.nombre}</h3>
      </Link>
      <p className="precio">${producto.precio.toLocaleString('es-CL')}</p>
      <Link to={`/producto/${producto.id}`} className="boton-principal">
        Ver detalle
      </Link>
      <button
        className="boton-principal"
        onClick={() => alAgregar(producto.id)}
      >
        Añadir al carrito
      </button>
    </article>
  );
}

export default TarjetaProducto;