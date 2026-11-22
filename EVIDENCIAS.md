# Evidencias — Registro de crédito (Garcia Segura Ariadna Jazmin)

Programa: `9B1mFDVdpxyTbk1h25b4bB5puwZCm1DYJrLwuUxndFkC` · Repo: `https://github.com/EGNIS2915/registro-ventas-credito` · Red: **Devnet** · Participante: `Garcia Segura Ariadna Jazmin` · Owner Devnet: `5DqjBoaCdh6U21EHA61c7doKcJvTywxhhP1bdoioZFCA`

Cada firma se verifica en `https://explorer.solana.com/tx/<FIRMA>?cluster=devnet`.
Sustituir los marcadores por la firma real antes de entregar. No capturar claves privadas.

| # | Caso | Operación en la UI | Resultado esperado | Firma / mensaje |
|---|---|---|---|---|
| 1 | Crear registro | `Crear registro` | Cuenta `Registro` creada para `Cafe Credito Novia` | `24PY8EK1DWCRNjLY97jguF1k2sis6enik8HPTY9HdcPD5zYGrGcj4rrNWLuwb9tChKCLUraHoK5ZQdfxEHieV8Q8` |
| 2 | Crear cliente con límite | `Crear cliente` | Cliente #1 con límite 500 | `5BTkrnTiXxLjAD4ruVyrm4NNjuz3XFQ4QLYu3bqSWnQqHkEcnfJdBEoyCTUiV18egyGb5D25J16zUK6enxRSNWpw` |
| 3 | Venta válida | `Registrar venta` | Venta de 50 activa; usado 50 (10%) | `2UzwmpXGbawnZztKF9WNnfHtAorhr6QRRoU6Qt576kSqGkDvdmMGvPZiATNwh5nsWomTBg3Q8XK8KyknxaWm1fvN` |
| 4 | Corregir importe | `Corregir importe` | Monto 55; usado 55 (11%) | `4HyfaFJRWSciVfdGwuwnBBouUcn1p7TcvuQm6tzzTzcnWpFXH6JFac8b5P7wUorFMbxjKcuGRh3n4GWE7xQsXjYq` |
| 5 | Devolución | `Devolución` | Venta eliminada; usado 0 | `qjNDRJQQXypvpvjJd2XiNR5zov5kUjSdzxq23P3y4ypjXofx9XudcNgp8vCwEpebiDX7esRPdpF13HNb7NpuGFF` |
| 6 | Baja de cliente vacío | `Dar de baja` | Cliente sin ventas se elimina del registro | `2EzLtAjZ28UhBNjm43cvfHgZaMNWS3xY7vWiuB5GCyffYvTfLtuHoEU6dR34tzUkbJfULG7TNbBAxAgE8ducUg68` |
| 7 | Wallet no autorizada | Cualquier escritura con otra wallet | `NoOwner` / 6000 | `2xYGqaafYJPkHKVchsWtD1XPajEXhnYRi2UYk9FtKWjy348j8nHeJHKqt5cmRnsNZVJxoyd8WRcNC2Kfm1QcuNG6` (tx fallida: NoOwner 6000, `0x1770`) |
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
