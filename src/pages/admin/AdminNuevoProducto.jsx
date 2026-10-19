import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';

function AdminNuevoProducto() {
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stockCritico, setStockCritico] = useState('');
  const [imagen, setImagen] = useState('');

  const [errores, setErrores] = useState({});

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    let hayErrores = false;

    if (codigo.trim().length < 3) {
      nuevosErrores.codigo = 'El código es obligatorio (mínimo 3 caracteres).';
      hayErrores = true;
    }

    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre del producto es obligatorio.';
      hayErrores = true;
    } else if (nombre.trim().length > 100) {
      nuevosErrores.nombre = 'El nombre no puede superar los 100 caracteres.';
      hayErrores = true;
    }

    if (descripcion.length > 500) {
      nuevosErrores.descripcion =
        'La descripción no puede superar los 500 caracteres.';
      hayErrores = true;
    }

    if (precio === '' || Number(precio) < 0) {
      nuevosErrores.precio = 'Debe ingresar un precio válido (mayor o igual a 0).';
      hayErrores = true;
    }

    if (stock === '' || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      nuevosErrores.stock =
        'El stock inicial es obligatorio y debe ser un número entero.';
      hayErrores = true;
    }

    if (categoria === '') {
      nuevosErrores.categoria = 'Debe seleccionar una categoría.';
      hayErrores = true;
    }

    if (
      stockCritico !== '' &&
      (Number(stockCritico) < 0 || !Number.isInteger(Number(stockCritico)))
    ) {
      nuevosErrores.stockCritico =
        'El stock crítico debe ser un número entero mayor o igual a 0.';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      alert('¡Producto guardado con éxito!');
      navigate('/admin/productos');
    }
  };

  return (
    <div className="body-admin">
      <div className="contenedor-admin">
        <SidebarAdmin />

        <main className="contenido-admin">
          <header className="header-mantenedor">
            <h1>Nuevo Producto</h1>
            <Link to="/admin/productos" className="boton-oscuro btn-gris">
              VOLVER AL LISTADO
            </Link>
          </header>

          <section className="panel-contenido">
            <div className="tarjeta-formulario-admin">
              <h2 className="titulo-formulario-admin">Datos del Producto</h2>

              <form
                id="formulario-nuevo-producto"
                onSubmit={manejarSubmit}
                noValidate
              >
                <div className="grupo-form-admin">
                  <label htmlFor="codigo-prod">Código Producto *</label>
                  <input
                    type="text"
                    id="codigo-prod"
                    placeholder="Ej: PRD-001"
                    minLength="3"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                  <span id="error-codigo-prod" className="mensaje-error">
                    {errores.codigo}
                  </span>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="nombre-prod">Nombre *</label>
                  <input
                    type="text"
                    id="nombre-prod"
                    placeholder="Nombre del perfume"
                    maxLength="100"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <span id="error-nombre-prod" className="mensaje-error">
                    {errores.nombre}
                  </span>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="desc-prod">Descripción (Opcional)</label>
                  <textarea
                    id="desc-prod"
                    rows="3"
                    placeholder="Detalles aromáticos..."
                    maxLength="500"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                  <span id="error-desc-prod" className="mensaje-error">
                    {errores.descripcion}
                  </span>
                </div>

                <div className="fila-form-admin">
                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="precio-prod">Precio *</label>
                    <input
                      type="number"
                      id="precio-prod"
                      placeholder="Ej: 50000"
                      min="0"
                      step="0.01"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                    <span id="error-precio-prod" className="mensaje-error">
                      {errores.precio}
                    </span>
                  </div>

                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="stock-prod">Stock Inicial *</label>
                    <input
                      type="number"
                      id="stock-prod"
                      placeholder="Ej: 10"
                      min="0"
                      step="1"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    <span id="error-stock-prod" className="mensaje-error">
                      {errores.stock}
                    </span>
                  </div>
                </div>

                <div className="fila-form-admin">
                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="categoria-prod">Categoría *</label>
                    <select
                      id="categoria-prod"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">-- Seleccione --</option>
                      <option value="arabes">Perfumes Árabes</option>
                      <option value="nicho">Perfumes de Nicho</option>
                      <option value="autor">Perfumes de Autor</option>
                    </select>
                    <span id="error-categoria-prod" className="mensaje-error">
                      {errores.categoria}
                    </span>
                  </div>

                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="stock-critico-prod">
                      Stock Crítico (Opcional)
                    </label>
                    <input
                      type="number"
                      id="stock-critico-prod"
                      placeholder="Alerta si baja de..."
                      min="0"
                      step="1"
                      value={stockCritico}
                      onChange={(e) => setStockCritico(e.target.value)}
                    />
                    <span
                      id="error-stock-critico-prod"
                      className="mensaje-error"
                    >
                      {errores.stockCritico}
                    </span>
                  </div>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="imagen-prod">URL de Imagen (Opcional)</label>
                  <input
                    type="text"
                    id="imagen-prod"
                    placeholder="/img/nuevo_perfume.webp"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                  />
                </div>

                <div className="acciones-formulario-admin">
                  <button type="submit" className="boton-oscuro btn-largo">
                    GUARDAR PRODUCTO
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminNuevoProducto;