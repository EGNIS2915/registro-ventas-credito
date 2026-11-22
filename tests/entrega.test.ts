import test from 'node:test';
import assert from 'node:assert/strict';
import { comprobarEntrega, ID_REFERENCIA } from '../scripts/verificar-entrega.mjs';

const id = '7'.repeat(44);
const firmas = Array.from({ length: 6 }, (_, i) => '5'.repeat(88 - i) + '123456'.slice(0, i));

function base() {
  return {
    packageTexto: JSON.stringify({ participante: 'Garcia Segura Ariadna Jazmin' }),
    programaTexto: JSON.stringify({ programId: id, esReferencia: false }),
    idlTexto: JSON.stringify({ metadata: { address: id } }),
    readmeTexto: '# Registro de credito — Garcia Segura Ariadna Jazmin',
    evidenciasTexto: firmas.map((firma, i) => `| ${i + 1} | caso | operacion | resultado | ${firma} |`).join('\n'),
  };
}

test('el gate de entrega acepta un conjunto completo', () => {
  const chequeos = comprobarEntrega(base());
  assert.equal(chequeos.length, 8);
  assert.ok(chequeos.every((chequeo) => chequeo.ok));
});

test('el gate rechaza el IDL de referencia y su program ID', () => {
  const textos = base();
  textos.programaTexto = JSON.stringify({ programId: ID_REFERENCIA, esReferencia: true });
  const chequeos = comprobarEntrega(textos);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'IDL importado del despliegue')?.ok, false);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'Program ID de Devnet')?.ok, false);
});

test('el gate exige firmas reales', () => {
  const textos = base();
  textos.evidenciasTexto = '| 1 | crear | crear | ok | [PENDIENTE] |';
  const chequeos = comprobarEntrega(textos);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'EVIDENCIAS sin marcadores')?.ok, false);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'Firmas verificables en Devnet')?.ok, false);
});

test('el gate detecta marcadores y nombre ausente en el README', () => {
  const textos = base();
  textos.readmeTexto = '# Registro — [PENDIENTE]';
  const chequeos = comprobarEntrega(textos);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'README sin marcadores')?.ok, false);
  assert.equal(chequeos.find((chequeo) => chequeo.etiqueta === 'README con el participante')?.ok, false);
});
