import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ID_REFERENCIA = '38oTMyvUTmqkBQeMiuok5F2mPjp9dVadWdBeQTDNmTUY';

const base58 = /^[1-9A-HJ-NP-Za-km-z]+$/;
const esBase58 = (valor, minimo, maximo) =>
  typeof valor === 'string' && base58.test(valor) && valor.length >= minimo && valor.length <= maximo;

function parsear(texto) {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

export function comprobarEntrega(textos) {
  const pkg = parsear(textos.packageTexto);
  const programa = parsear(textos.programaTexto);
  const idl = parsear(textos.idlTexto);
  const readme = textos.readmeTexto ?? '';
  const evidencias = textos.evidenciasTexto ?? '';
  const chequeos = [];
  const anadir = (ok, etiqueta, detalle) => chequeos.push({ ok, etiqueta, detalle });

  const participante = typeof pkg?.participante === 'string' ? pkg.participante.trim() : '';
  anadir(participante.length > 3, 'Nombre para el certificado', participante || 'falta en package.json');

  const esReal = programa?.esReferencia === false;
  anadir(esReal, 'IDL importado del despliegue', esReal ? 'esReferencia=false' : 'sigue siendo el IDL de referencia');

  const programId = programa?.programId;
  const idValido = esBase58(programId, 32, 44) && programId !== ID_REFERENCIA;
  anadir(idValido, 'Program ID de Devnet', programId || 'ausente');

  const direccionIdl = idl?.metadata?.address ?? idl?.address;
  anadir(idValido && direccionIdl === programId, 'idl.json coincide con el Program ID', direccionIdl || 'sin direccion');

  const marcadorReadme = /\[PENDIENTE\]|`PENDIENTE`|Program ID:\s*PENDIENTE/i.test(readme);
  anadir(!marcadorReadme, 'README sin marcadores', marcadorReadme ? 'aun dice PENDIENTE' : 'listo');
  anadir(participante.length > 3 && readme.includes(participante), 'README con el participante', participante || 'sin nombre');
  anadir(!/\[PENDIENTE\]/i.test(evidencias), 'EVIDENCIAS sin marcadores', /\[PENDIENTE\]/i.test(evidencias) ? 'faltan firmas' : 'listo');

  const firmas = new Set(evidencias.match(/[1-9A-HJ-NP-Za-km-z]{64,88}/g) ?? []);
  anadir(firmas.size >= 6, 'Firmas verificables en Devnet', firmas.size + '/6');

  return chequeos;
}

const esPrincipal =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (esPrincipal) {
  const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const leer = (archivo) => readFileSync(path.join(raiz, archivo), 'utf8');
  const chequeos = comprobarEntrega({
    packageTexto: leer('package.json'),
    programaTexto: leer('src/config/programa.json'),
    idlTexto: leer('idl.json'),
    readmeTexto: leer('README.md'),
    evidenciasTexto: leer('EVIDENCIAS.md'),
  });

  for (const chequeo of chequeos) {
    console.log((chequeo.ok ? 'OK   ' : 'FALTA') + ' ' + chequeo.etiqueta + ' :: ' + chequeo.detalle);
  }

  const faltan = chequeos.filter((chequeo) => !chequeo.ok).length;
  console.log(faltan === 0 ? 'Listo para entregar.' : 'Faltan ' + faltan + ' requisitos de entrega.');
  process.exitCode = faltan === 0 ? 0 : 1;
}
