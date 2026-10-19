import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import { datosUbicacion } from '../../data/ubicaciones';
import { validarCorreo, validarRutChileno } from '../../utils/validaciones';

function AdminNuevoUsuario() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [run, setRun] = useState('');
  const [rol, setRol] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [telefono, setTelefono] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');

  const [errores, setErrores] = useState({});

  const manejarCambioRegion = (e) => {
    setRegion(e.target.value);
    setComuna('');
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    let hayErrores = false;

    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre completo es obligatorio.';
      hayErrores = true;
    }

    const correoTrim = correo.trim().toLowerCase();
    if (correoTrim === '') {
      nuevosErrores.correo = 'El correo es obligatorio.';
      hayErrores = true;
    } else if (!validarCorreo(correoTrim)) {
      nuevosErrores.correo =
        'Formato inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.';
      hayErrores = true;
    }

    const runTrim = run.trim();
    if (runTrim === '') {
      nuevosErrores.run = 'El RUN es obligatorio.';
      hayErrores = true;
    } else if (runTrim.includes('.') || runTrim.includes('-')) {
      nuevosErrores.run = 'Sin puntos ni guion.';
      hayErrores = true;
    } else if (!validarRutChileno(runTrim)) {
      nuevosErrores.run = 'El RUN ingresado no es válido.';
      hayErrores = true;
    }

    if (rol === '') {
      nuevosErrores.rol = 'Seleccione un tipo de usuario.';
      hayErrores = true;
    }

    if (pass.length < 4 || pass.length > 10) {
      nuevosErrores.pass = 'Debe tener entre 4 y 10 caracteres.';
      hayErrores = true;
    }

    if (confPass !== pass) {
      nuevosErrores.confPass = 'Las contraseñas no coinciden.';
      hayErrores = true;
    }

    if (region === '') {
      nuevosErrores.region = 'Seleccione una región.';
      hayErrores = true;
    }

    if (comuna === '') {
      nuevosErrores.comuna = 'Seleccione una comuna.';
      hayErrores = true;
    }

    if (direccion.trim() === '') {
      nuevosErrores.direccion = 'La dirección es obligatoria.';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      alert('¡Usuario registrado exitosamente!');
      navigate('/admin/usuarios');
    }
  };

  const comunasDisponibles = region ? datosUbicacion[region] || [] : [];

  return (
    <div className="body-admin">
      <div className="contenedor-admin">
        <SidebarAdmin />

        <main className="contenido-admin">
          <header className="header-mantenedor">
            <h1>Nuevo Usuario</h1>
            <Link to="/admin/usuarios" className="boton-oscuro btn-gris">
              VOLVER AL LISTADO
            </Link>
          </header>

          <section className="panel-contenido">
            <div className="tarjeta-formulario-admin">
              <div className="encabezado-formulario-usuario">
                <h2 className="titulo-formulario-admin">Registro de usuario</h2>
              </div>

              <form
                id="formulario-nuevo-usuario"
                onSubmit={manejarSubmit}
                noValidate
              >
                <div className="grupo-form-admin">
                  <label htmlFor="nombre-usuario">NOMBRE COMPLETO *</label>
                  <input
                    type="text"
                    id="nombre-usuario"
                    placeholder="Ej: Juan Pérez"
                    maxLength="100"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <span id="error-nombre-usuario" className="mensaje-error">
                    {errores.nombre}
                  </span>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="correo-usuario">CORREO *</label>
                  <input
                    type="email"
                    id="correo-usuario"
                    placeholder="Ej: usuario@duoc.cl"
                    maxLength="100"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <span id="error-correo-usuario" className="mensaje-error">
                    {errores.correo}
                  </span>
                </div>

                <div className="fila-form-admin">
                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="run-usuario">RUN *</label>
                    <input
                      type="text"
                      id="run-usuario"
                      placeholder="Sin puntos ni guion"
                      maxLength="9"
                      value={run}
                      onChange={(e) => setRun(e.target.value)}
                    />
                    <span id="error-run-usuario" className="mensaje-error">
                      {errores.run}
                    </span>
                  </div>

                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="rol-usuario">TIPO DE USUARIO *</label>
                    <select
                      id="rol-usuario"
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                    >
                      <option value="">-- Seleccione el perfil --</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Cliente">Cliente</option>
                      <option value="Vendedor">Vendedor</option>
                    </select>
                    <span id="error-rol-usuario" className="mensaje-error">
                      {errores.rol}
                    </span>
                  </div>
                </div>

                <div className="fila-form-admin">
                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="pass-usuario">CONTRASEÑA *</label>
                    <input
                      type="password"
                      id="pass-usuario"
                      placeholder="Mínimo 4 caracteres"
                      minLength="4"
                      maxLength="10"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <span id="error-pass-usuario" className="mensaje-error">
                      {errores.pass}
                    </span>
                  </div>

                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="conf-pass-usuario">
                      CONFIRMAR CONTRASEÑA *
                    </label>
                    <input
                      type="password"
                      id="conf-pass-usuario"
                      placeholder="Repita la contraseña"
                      minLength="4"
                      maxLength="10"
                      value={confPass}
                      onChange={(e) => setConfPass(e.target.value)}
                    />
                    <span id="error-conf-pass-usuario" className="mensaje-error">
                      {errores.confPass}
                    </span>
                  </div>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="telefono-usuario">TELÉFONO (opcional)</label>
                  <input
                    type="tel"
                    id="telefono-usuario"
                    placeholder="Ej: +56912345678"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>

                <div className="fila-form-admin">
                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="region-usuario">REGIÓN *</label>
                    <select
                      id="region-usuario"
                      value={region}
                      onChange={manejarCambioRegion}
                    >
                      <option value="">-- Seleccione la región --</option>
                      {Object.keys(datosUbicacion).map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                    <span id="error-region-usuario" className="mensaje-error">
                      {errores.region}
                    </span>
                  </div>

                  <div className="grupo-form-admin col-mitad">
                    <label htmlFor="comuna-usuario">COMUNA *</label>
                    <select
                      id="comuna-usuario"
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      disabled={!region}
                    >
                      <option value="">-- Seleccione la comuna --</option>
                      {comunasDisponibles.map((com) => (
                        <option key={com} value={com}>
                          {com}
                        </option>
                      ))}
                    </select>
                    <span id="error-comuna-usuario" className="mensaje-error">
                      {errores.comuna}
                    </span>
                  </div>
                </div>

                <div className="grupo-form-admin">
                  <label htmlFor="direccion-usuario">DIRECCIÓN *</label>
                  <input
                    type="text"
                    id="direccion-usuario"
                    placeholder="Calle y número"
                    maxLength="300"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                  <span id="error-direccion-usuario" className="mensaje-error">
                    {errores.direccion}
                  </span>
                </div>

                <div className="acciones-formulario-admin centrado">
                  <button type="submit" className="boton-oscuro btn-largo">
                    REGISTRAR
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

export default AdminNuevoUsuario;