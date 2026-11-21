# Evidencias — Registro de crédito (Garcia Segura Ariadna Jazmin)

Programa: `PENDIENTE` · Repo: `https://github.com/EGNIS2915/registro-ventas-credito` · Red: **Devnet** · Participante: `Garcia Segura Ariadna Jazmin`

Cada firma se verifica en `https://explorer.solana.com/tx/<FIRMA>?cluster=devnet`.
Sustituir `[PENDIENTE]` por la firma real antes de entregar. No capturar claves privadas.

| # | Caso | Operación en la UI | Resultado esperado | Firma / mensaje |
|---|---|---|---|---|
| 1 | Crear registro | `Crear registro` | Cuenta `Registro` creada para `Cafe Credito Novia` | `[PENDIENTE]` |
| 2 | Crear cliente con límite | `Crear cliente` | Cliente #1 con límite 500 | `[PENDIENTE]` |
| 3 | Venta válida | `Registrar venta` | Venta de 50 activa; usado 50 (10%) | `[PENDIENTE]` |
| 4 | Corregir importe | `Corregir importe` | Monto 55; usado 55 (11%) | `[PENDIENTE]` |
| 5 | Devolución | `Devolución` | Venta eliminada; usado 0 | `[PENDIENTE]` |
| 6 | Baja de cliente vacío | `Dar de baja` | Cliente sin ventas se elimina del registro | `[PENDIENTE]` |
| 7 | Wallet no autorizada | Cualquier escritura con otra wallet | `NoOwner` / 6000 | `[PENDIENTE: error 6000]` |
| 8 | Venta ajena | Venta con cliente fuera del registro | `NoClienteEnRegistro` / 6002 o `NoSKU` / 6001 | `[PENDIENTE: error]` |
| 9 | **Mejora: excede límite** | `Registrar venta` por 600 | `ExcedeLimite` / 6006 | `[PENDIENTE: error 6006]` |
| 10 | **Mejora: demasiadas ventas** | 11 ventas de 1 | `MuchasVentas` / 6007 | `[PENDIENTE: error 6007]` |
| 11 | **Mejora: monto inválido** | `Registrar venta` con 0 | `MontoInvalido` / 6004 | `[PENDIENTE: error 6004]` |

## Checklist de captura

- [ ] Explorer en Devnet con la firma legible.
- [ ] Panel `Clientes y ventas` mostrando **Límite de crédito**, **Crédito usado** y el porcentaje.
- [ ] Aviso de la app con el error del programa cuando aplique.
- [ ] Sin `keypair.json`, semillas ni claves en pantalla.
- [ ] IDL exportado del despliegue guardado como `idl.json` y `npm run verificar` en verde.
