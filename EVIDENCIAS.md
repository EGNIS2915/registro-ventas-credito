# Evidencias — Registro de crédito (Garcia Segura Ariadna Jazmin)

Programa: `9B1mFDVdpxyTbk1h25b4bB5puwZCm1DYJrLwuUxndFkC` · Repo: `https://github.com/EGNIS2915/registro-ventas-credito` · Red: **Devnet** · Participante: `Garcia Segura Ariadna Jazmin`

Cada firma se verifica en `https://explorer.solana.com/tx/<FIRMA>?cluster=devnet`.
Sustituir los marcadores por la firma real antes de entregar. No capturar claves privadas.

| # | Caso | Operación en la UI | Resultado esperado | Firma / mensaje |
|---|---|---|---|---|
| 1 | Crear registro | `Crear registro` | Cuenta `Registro` creada para `Cafe Credito Novia` | `2TCKUqQ8PXbVoxaohkN9Jz6WkrcTraBHoMkem2DTcA52M6wyNg1K9rcTPb1s8TMrfNQM2m2bpD5g9CaGTok66cWQ` |
| 2 | Crear cliente con límite | `Crear cliente` | Cliente #1 con límite 500 | `5L2pmcsfoUvsipqxRavXVQY3isjvxkrEZR5fLpfJySuRp9ViDxcGQPGGcLjwauGdnmqxRgeV6ugKNNWsmtwga3xt` |
| 3 | Venta válida | `Registrar venta` | Venta de 50 activa; usado 50 (10%) | `5Bpy35Dmhi15QYBuZh5PH1ViseQ6Bw9Eh4oqG3u52T6vWK9SiD5fbYnY6amQJDxhLJV2EuCHtQnPvuFxxGPh2z6y` |
| 4 | Corregir importe | `Corregir importe` | Monto 55; usado 55 (11%) | `4aY3oms1maLTQr3XiLWFS3dwoe2WeUvj93na4id6D9kcMEmj3toS6DQx4CBUgsBbJVJh4h2o73uNzgqC6kD83es2` |
| 5 | Devolución | `Devolución` | Venta eliminada; usado 0 | `4EEHmq3t8x9AtU4kYaKa7NbKe3wBnuE9AD9T9mtP5npzGjCrC8NPa81pFDTLh43tYpPhzSGA4mDaCwRQ2Ma2rZCt` |
| 6 | Baja de cliente vacío | `Dar de baja` | Cliente sin ventas se elimina del registro | `cXD5tNSM7zDWRD3BwVS3UEuSNpe3tnBc7DWozUAEqwS8oMe7amjo9zxBzKcBEUzs1rupGjWJXtahDewZMz3g6VZ` |
| 7 | Wallet no autorizada | Cualquier escritura con otra wallet | `NoOwner` / 6000 | `2pqK25ATsAjKKMRyEsMZGKA6ErbqzykBAUJgaNimVAQba2Ufn7neYPTrhUcWMKQyZx5h4yz8YXky1gsWpCbSFu37` (tx fallida: NoOwner 6000, `0x1770`) |
| 8 | Venta ajena | Venta con cliente fuera del registro | `ConstraintSeeds` / 2006 (cliente ajeno al registro) | `ConstraintSeeds 2006 (simulación RPC, sin firma)` |
| 9 | **Mejora: excede límite** | `Registrar venta` por 600 | `ExcedeLimite` / 6006 | `ExcedeLimite 6006 (0x1776, simulación RPC, sin firma)` |
| 10 | **Mejora: demasiadas ventas** | 11 ventas de 1 | `MuchasVentas` / 6007 | `MuchasVentas 6007 (0x1777, simulación RPC, sin firma)` |
| 11 | **Mejora: monto inválido** | `Registrar venta` con 0 | `MontoInvalido` / 6004 | `MontoInvalido 6004 (0x1774, simulación RPC, sin firma)` |
| 12 | Baja con ventas activas | `Dar de baja` con historial | `ClienteConVentas` / 6003 | `ClienteConVentas 6003 (0x1773, simulación RPC, sin firma)` |

## Checklist de captura

- [ ] Explorer en Devnet con la firma legible.
- [ ] Panel `Clientes y ventas` mostrando **Límite de crédito**, **Crédito usado** y el porcentaje.
- [ ] Aviso de la app con el error del programa cuando aplique.
- [ ] Sin `keypair.json`, semillas ni claves en pantalla.
- [ ] IDL exportado del despliegue guardado como `idl.json` y `npm run verificar` en verde.

## Cómo completar cada fila

Para cada caso registra el estado inicial (negocio, ID de cliente y monto), la operación ejecutada, el resultado observado en las cuentas y la firma o el error. Usa enlaces `https://explorer.solana.com/tx/<FIRMA>?cluster=devnet`. Si el rechazo ocurre en simulación previa y no hay transacción consultable, conserva el mensaje de error y comprueba que el estado del negocio no cambió.

## Cierre automático

Ejecuta `npm run verificar:entrega` antes de entregar. El gate revisa Program ID, IDL real, nombre del participante, ausencia de marcadores y firmas válidas; mientras quede algún marcador sin completar, el cierre falla y el repo no debe enviarse.
