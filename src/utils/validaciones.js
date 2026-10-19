export function validarCorreo(email) {
  const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return regex.test(email);
}

export function validarRutChileno(rutString) {
  if (!rutString || rutString.length < 7) return false;

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
  const dvCalculado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado;
}