# Evidencias — Registro de crédito (Garcia Segura Ariadna Jazmin)

Programa: `9B1mFDVdpxyTbk1h25b4bB5puwZCm1DYJrLwuUxndFkC` · Repo: `https://github.com/EGNIS2915/registro-ventas-credito` · Red: **Devnet** · Participante: `Garcia Segura Ariadna Jazmin` · Owner Devnet: `5DqjBoaCdh6U21EHA61c7doKcJvTywxhhP1bdoioZFCA`

Cada firma de las operaciones válidas está enlazada a Solana Explorer en Devnet. Los rechazos de regla que no generan transacción conservan el mensaje de error y la comprobación de que el negocio no cambió. No se incluyen claves privadas.

| # | Caso | Operación en la UI | Resultado esperado | Firma / mensaje |
|---|---|---|---|---|
| 1 | Crear registro | `Crear registro` | Cuenta `Registro` creada para `Cafe Credito Novia` | `[24PY8EK1DWCRNjLY97jguF1k2sis6enik8HPTY9HdcPD5zYGrGcj4rrNWLuwb9tChKCLUraHoK5ZQdfxEHieV8Q8](https://explorer.solana.com/tx/24PY8EK1DWCRNjLY97jguF1k2sis6enik8HPTY9HdcPD5zYGrGcj4rrNWLuwb9tChKCLUraHoK5ZQdfxEHieV8Q8?cluster=devnet)` |
| 2 | Crear cliente con límite | `Crear cliente` | Cliente #1 con límite 500 | `[5BTkrnTiXxLjAD4ruVyrm4NNjuz3XFQ4QLYu3bqSWnQqHkEcnfJdBEoyCTUiV18egyGb5D25J16zUK6enxRSNWpw](https://explorer.solana.com/tx/5BTkrnTiXxLjAD4ruVyrm4NNjuz3XFQ4QLYu3bqSWnQqHkEcnfJdBEoyCTUiV18egyGb5D25J16zUK6enxRSNWpw?cluster=devnet)` |
| 3 | Venta válida | `Registrar venta` | Venta de 50 activa; usado 50 (10%) | `[2UzwmpXGbawnZztKF9WNnfHtAorhr6QRRoU6Qt576kSqGkDvdmMGvPZiATNwh5nsWomTBg3Q8XK8KyknxaWm1fvN](https://explorer.solana.com/tx/2UzwmpXGbawnZztKF9WNnfHtAorhr6QRRoU6Qt576kSqGkDvdmMGvPZiATNwh5nsWomTBg3Q8XK8KyknxaWm1fvN?cluster=devnet)` |
| 4 | Corregir importe | `Corregir importe` | Monto 55; usado 55 (11%) | `[4HyfaFJRWSciVfdGwuwnBBouUcn1p7TcvuQm6tzzTzcnWpFXH6JFac8b5P7wUorFMbxjKcuGRh3n4GWE7xQsXjYq](https://explorer.solana.com/tx/4HyfaFJRWSciVfdGwuwnBBouUcn1p7TcvuQm6tzzTzcnWpFXH6JFac8b5P7wUorFMbxjKcuGRh3n4GWE7xQsXjYq?cluster=devnet)` |
| 5 | Devolución | `Devolución` | Venta eliminada; usado 0 | `[qjNDRJQQXypvpvjJd2XiNR5zov5kUjSdzxq23P3y4ypjXofx9XudcNgp8vCwEpebiDX7esRPdpF13HNb7NpuGFF](https://explorer.solana.com/tx/qjNDRJQQXypvpvjJd2XiNR5zov5kUjSdzxq23P3y4ypjXofx9XudcNgp8vCwEpebiDX7esRPdpF13HNb7NpuGFF?cluster=devnet)` |
| 6 | Baja de cliente vacío | `Dar de baja` | Cliente sin ventas se elimina del registro | `[2EzLtAjZ28UhBNjm43cvfHgZaMNWS3xY7vWiuB5GCyffYvTfLtuHoEU6dR34tzUkbJfULG7TNbBAxAgE8ducUg68](https://explorer.solana.com/tx/2EzLtAjZ28UhBNjm43cvfHgZaMNWS3xY7vWiuB5GCyffYvTfLtuHoEU6dR34tzUkbJfULG7TNbBAxAgE8ducUg68?cluster=devnet)` |
| 7 | Wallet no autorizada | Cualquier escritura con otra wallet | `NoOwner` / 6000 | `[2xYGqaafYJPkHKVchsWtD1XPajEXhnYRi2UYk9FtKWjy348j8nHeJHKqt5cmRnsNZVJxoyd8WRcNC2Kfm1QcuNG6](https://explorer.solana.com/tx/2xYGqaafYJPkHKVchsWtD1XPajEXhnYRi2UYk9FtKWjy348j8nHeJHKqt5cmRnsNZVJxoyd8WRcNC2Kfm1QcuNG6?cluster=devnet)` (tx fallida: NoOwner 6000, `0x1770`) |
| 8 | Venta ajena | Venta con cliente fuera del registro | `ConstraintSeeds` / 2006 (cliente ajeno al registro) | `ConstraintSeeds 2006 (simulación RPC, sin firma)` |
| 9 | **Mejora: excede límite** | `Registrar venta` por 600 | `ExcedeLimite` / 6006 | `ExcedeLimite 6006 (0x1776, simulación RPC, sin firma)` |
| 10 | **Mejora: demasiadas ventas** | 11 ventas de 1 | `MuchasVentas` / 6007 | `MuchasVentas 6007 (0x1777, simulación RPC, sin firma)` |
| 11 | **Mejora: monto inválido** | `Registrar venta` con 0 | `MontoInvalido` / 6004 | `MontoInvalido 6004 (0x1774, simulación RPC, sin firma)` |
| 12 | Baja con ventas activas | `Dar de baja` con historial | `ClienteConVentas` / 6003 | `ClienteConVentas 6003 (0x1773, simulación RPC, sin firma)` |

## Cómo se comprobó

Las firmas de las operaciones válidas están enlazadas a Explorer y se pueden abrir una por una. Para los rechazos se conservó el error del programa (o de la simulación previa) y se verificó que las cuentas del negocio quedaran igual. No se incluyeron capturas porque el curso acepta transacciones verificables, y en ellas no aparecen claves, semillas ni datos personales. `idl.json` salió del despliegue y `npm run verificar` está en verde.

## Estado inicial y resultado observado

1. **Registro:** no había negocio; se creó `Cafe Credito Novia` con la wallet de Ariadna y la cuenta quedó legible en la app.
2. **Cliente con límite:** registro sin clientes; se creó el cliente #1 con límite 500.
3. **Venta válida:** cliente con usado 0; se registró una venta de 50 y el usado pasó a 50 (10 %).
4. **Corregir importe:** venta de 50; se cambió a 55 y el usado pasó a 55 (11 %) sin perder la relación con el cliente.
5. **Devolución:** venta de 55 activa; se cerró y el usado volvió a 0.
6. **Baja vacía:** cliente sin ventas; se cerró su cuenta y el contador de IDs no retrocedió.
7. **Wallet no autorizada:** registro existente; otra wallet recibió `NoOwner` 6000 y los datos no cambiaron.
8. **Venta ajena:** cliente fuera del registro; la simulación devolvió `ConstraintSeeds` 2006 y no se creó venta.
9. **Excede límite:** cliente con límite 500; una venta de 600 devolvió `ExcedeLimite` 6006 y no se creó.
10. **Demasiadas ventas:** cliente con 10 ventas activas; la número 11 devolvió `MuchasVentas` 6007.
11. **Monto inválido:** venta por 0; la simulación devolvió `MontoInvalido` 6004 y no se creó venta.
12. **Baja con ventas:** cliente con historial; la simulación devolvió `ClienteConVentas` 6003 y las cuentas quedaron intactas.

## Cierre automático

Ejecuta `npm run verificar:entrega` antes de entregar. El gate revisa Program ID, IDL real, nombre del participante, ausencia de marcadores y firmas válidas; mientras quede algún marcador sin completar, el cierre falla y el repo no debe enviarse.
