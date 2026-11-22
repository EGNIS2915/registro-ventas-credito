# Arquitectura y defensa — Registro de crédito

Participante: **Garcia Segura Ariadna Jazmin** · Red: **Devnet** · Ruta: proyecto guiado con mejora funcional.

## Modelo de cuentas y PDAs

| Cuenta | Seeds | Datos relevantes |
| --- | --- | --- |
| `Registro` | `["registro", nombre_negocio, owner]` | `owner`, `nombre_negocio`, `clientes`, `id_counter` |
| `Cliente` | `["cliente", registro, id_cliente_le]` | `id_cliente`, `nombre`, `compras`, `historial`, `limite_credito` |
| `Venta` | `["venta", cliente, sku]` | `sku`, `descripcion`, `monto` |

El `id_cliente` se serializa en dos bytes little-endian y el `id_counter` del registro solo avanza: dar de baja a un cliente no libera su ID para otro.

## Autoridad y pertenencia

- `owner` es un `Signer` y el `Registro` lleva `has_one = owner @ NoOwner`: otra wallet puede leer, pero no escribir.
- `NuevoCliente` exige que el `Registro` pertenezca al firmante y calcula el seed con `id_counter + 1`.
- `EliminarVenta` y `BajaCliente` usan `close = owner`, con lo que la renta vuelve a la autoridad.
- `BajaCliente` solo acepta clientes sin historial (`ClienteConVentas`) y comprueba que sigan referenciados en el registro (`NoClienteEnRegistro`).

## Aporte funcional: control de crédito por cliente

La base del bootcamp registro, cliente, venta, devolución y baja. El aporte propio convierte el registro en un control de exposición crediticia:

1. `crear_cliente` recibe `limite_credito` como argumento final y exige que sea mayor a cero (`LimiteInvalido`, 6005).
2. `registrar_venta` rechaza montos superiores al límite (`ExcedeLimite`, 6006) y un undécimo SKU activo (`MuchasVentas`, 6007).
3. `cambiar_monto` vuelve a validar el límite: una corrección no puede saltarse el control.
4. `registrar_venta` exige `monto > 0` (`MontoInvalido`, 6004).
5. La UI muestra límite, crédito usado y porcentaje, y traduce los errores del programa a español.

### Cómo se comprueba

| Caso | Acción | Resultado |
| --- | --- | --- |
| Límite | Cliente con límite 500 y venta de 600 | Error 6006, sin cuenta `Venta` creada |
| Corrección | `Corregir importe` a 600 | Error 6006, se conserva el monto anterior |
| Tope de SKUs | Undécima venta de 1 | Error 6007 |
| Monto cero | `Registrar venta` con 0 | Error 6004 |
| Devolución | `Devolución` de una venta | Crédito usado vuelve a 0 y la cuenta se cierra |
| Autoridad | Escritura con otra wallet | Error 6000 |
| Baja bloqueada | `Dar de baja` con historial | Error 6003, cliente y referencias intactos |

## Errores del programa

| Código | Nombre | Significado |
| --- | --- | --- |
| 6000 | `NoOwner` | La wallet no es autoridad del registro |
| 6001 | `NoSKU` | La venta no está en el historial del cliente |
| 6002 | `NoClienteEnRegistro` | El cliente no pertenece al registro |
| 6003 | `ClienteConVentas` | No se puede dar de baja con ventas activas |
| 6004 | `MontoInvalido` | El monto debe ser mayor a cero |
| 6005 | `LimiteInvalido` | El límite de crédito debe ser mayor a cero |
| 6006 | `ExcedeLimite` | El monto supera el límite del cliente |
| 6007 | `MuchasVentas` | El cliente alcanzó 10 ventas activas |

## Demo de 60 segundos

1. Conectar Solflare en **Devnet** y mostrar la wallet pública (0:00–0:08).
2. `Crear registro` para `Cafe Credito Novia` y esperar la confirmación (0:08–0:18).
3. `Crear cliente` con límite 500 y resaltar el indicador de crédito (0:18–0:28).
4. `Registrar venta` de 50: mostrar usado 50 y el porcentaje (0:28–0:38).
5. Intentar una venta de 600: mostrar el rechazo `ExcedeLimite` (0:38–0:50).
6. Abrir la firma de la venta válida en `explorer.solana.com?cluster=devnet` (0:50–1:00).

## Seguridad y alcance

El cliente comprueba el genesis de Devnet antes de firmar, conserva la firma si se pierde la confirmación y traduce los errores del programa. No se guardan semillas, claves ni `keypair.json`. El IDL entregado debe ser el exportado del despliegue; mientras `esReferencia` sea `true`, la UI bloquea escrituras a propósito.
