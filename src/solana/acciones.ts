import { address, createNoopSigner, type Address } from '@solana/kit';
import type { Connection } from '@solana/web3.js';
import {
  getCrearRegistroInstruction, getCrearClienteInstruction,
  getRegistrarVentaInstruction, getCambiarMontoInstruction, getHacerDevolucionInstruction,
  getEliminarClienteInstruction,
} from '../../clients/js/src/generated';
import { cadena, pdaCliente, pdaRegistro } from './pdas';
import { siguienteId } from './lecturas';
import { enviar, type WalletFirma, type OpcionesEnvio } from './tx';
import { comprobarConfiguracion } from './seguridad';
import { negocioValido, nombreValido, skuValido, descripcionValida, idValido, montoValido, limiteValido } from './validaciones';

const menciona = (error: unknown, texto: string) =>
  (error instanceof Error ? error.message : String(error)).toLowerCase().includes(texto.toLowerCase());

export function direccionDe(wallet: Pick<WalletFirma, 'publicKey'>): Address {
  if (!wallet.publicKey) throw new Error('Conecta tu wallet primero.');
  return address(wallet.publicKey.toBase58());
}

function firmante(wallet: WalletFirma) {
  comprobarConfiguracion();
  // Representa la identidad que la wallet firmará después; no contiene claves.
  // Los roles finales los establece el builder generado del cliente actual.
  return createNoopSigner(direccionDe(wallet));
}

/** Ejemplo resuelto: identidad, cuentas, instrucción y envío. */
export async function crearRegistro(wallet: WalletFirma, connection: Connection, nombreNegocio: string, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  const owner = firmante(wallet);
  const registro = pdaRegistro(nombreNegocio, owner.address);
  const ix = getCrearRegistroInstruction({ owner, registro, nombreNegocio });
  return enviar(ix, wallet, connection, opciones);
}

/** Ejercicio 1 del día 4: crear la cuenta Cliente con su línea de crédito. */
export async function crearCliente(wallet: WalletFirma, connection: Connection, nombreNegocio: string, nombre: string, limiteCredito: number, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  nombre = nombreValido(nombre);
  limiteCredito = limiteValido(limiteCredito);
  const owner = firmante(wallet);
  const registro = pdaRegistro(nombreNegocio, owner.address);
  const id = await siguienteId(nombreNegocio, owner.address);
  const cliente = pdaCliente(registro, id);
  const ix = getCrearClienteInstruction({ owner, registro, cliente, nombre, limiteCredito });
  try {
    return await enviar(ix, wallet, connection, opciones);
  } catch (error) {
    if (menciona(error, 'LimiteInvalido') || menciona(error, '6005')) throw new Error('El límite de crédito debe ser mayor a cero.');
    throw error;
  }
}

/** Ejercicio 2: mismo patrón con una Venta que depende del Cliente. */
export async function registrarVenta(wallet: WalletFirma, connection: Connection, nombreNegocio: string, idCliente: number, sku: string, descripcion: string, monto: number, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  idCliente = idValido(idCliente);
  sku = skuValido(sku);
  descripcion = descripcionValida(descripcion);
  monto = montoValido(monto);
  const owner = firmante(wallet);
  const { registro, cliente, venta } = cadena(nombreNegocio, owner.address, idCliente, sku);
  const ix = getRegistrarVentaInstruction({ owner, registro, cliente, venta, idCliente, sku, descripcion, monto });
  try {
    return await enviar(ix, wallet, connection, opciones);
  } catch (error) {
    if (menciona(error, 'MontoInvalido') || menciona(error, '6004')) throw new Error('El importe debe ser mayor a cero.');
    if (menciona(error, 'ExcedeLimite') || menciona(error, '6006')) throw new Error('El importe supera el límite de crédito del cliente.');
    if (menciona(error, 'MuchasVentas') || menciona(error, '6007')) throw new Error('El cliente alcanzó el máximo de 10 ventas activas.');
    throw error;
  }
}

export async function cambiarMonto(wallet: WalletFirma, connection: Connection, nombreNegocio: string, idCliente: number, sku: string, nuevoMonto: number, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  idCliente = idValido(idCliente);
  sku = skuValido(sku);
  nuevoMonto = montoValido(nuevoMonto);
  const owner = firmante(wallet);
  const { registro, cliente, venta } = cadena(nombreNegocio, owner.address, idCliente, sku);
  const ix = getCambiarMontoInstruction({ owner, registro, cliente, venta, idCliente, sku, nuevoMonto });
  try {
    return await enviar(ix, wallet, connection, opciones);
  } catch (error) {
    if (menciona(error, 'MontoInvalido') || menciona(error, '6004')) throw new Error('El importe debe ser mayor a cero.');
    if (menciona(error, 'ExcedeLimite') || menciona(error, '6006')) throw new Error('El nuevo importe supera el límite de crédito del cliente.');
    throw error;
  }
}

export async function hacerDevolucion(wallet: WalletFirma, connection: Connection, nombreNegocio: string, idCliente: number, sku: string, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  idCliente = idValido(idCliente);
  sku = skuValido(sku);
  const owner = firmante(wallet);
  const { registro, cliente, venta } = cadena(nombreNegocio, owner.address, idCliente, sku);
  const ix = getHacerDevolucionInstruction({ owner, registro, cliente, venta, idCliente, sku });
  return enviar(ix, wallet, connection, opciones);
}

/** Baja del día 5: el programa impide borrar clientes con ventas activas. */
export async function eliminarCliente(wallet: WalletFirma, connection: Connection, nombreNegocio: string, idCliente: number, opciones?: OpcionesEnvio): Promise<string> {
  nombreNegocio = negocioValido(nombreNegocio);
  idCliente = idValido(idCliente);
  const owner = firmante(wallet);
  const registro = pdaRegistro(nombreNegocio, owner.address);
  const cliente = pdaCliente(registro, idCliente);
  const ix = getEliminarClienteInstruction({ owner, registro, cliente, idCliente });
  try {
    return await enviar(ix, wallet, connection, opciones);
  } catch (error) {
    if (menciona(error, 'ClienteConVentas') || menciona(error, '6003')) throw new Error('No puedes dar de baja un cliente con ventas activas.');
    if (menciona(error, 'NoClienteEnRegistro') || menciona(error, '6002')) throw new Error('El cliente no pertenece a este registro.');
    throw error;
  }
}
