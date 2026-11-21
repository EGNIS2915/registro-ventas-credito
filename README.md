# Registro de crédito — Novia

Proyecto del **Solana Engineering Track: Advanced** (WayLearn). Registro de clientes y ventas con PDAs en Devnet, frontend React/Vite y cliente TypeScript generado por Codama desde el IDL.

- **Repo:** `https://github.com/EGNIS2915/registro-ventas-credito`
- **Negocio usado en la app:** `Cafe Credito Novia`
- **Program ID:** `PENDIENTE` (se obtiene al hacer Deploy en Solana Playground)
- **IDL entregado:** `idl.json` (actualmente de desarrollo; reemplazar por el exportado del despliegue)
- **Evidencias:** [`EVIDENCIAS.md`](./EVIDENCIAS.md)

## Mejora funcional: control de crédito por cliente

La operación `Crear cliente` ahora pide un **límite de crédito** y el programa lo valida en cada venta:

- `Cliente` gana el campo `limite_credito: u32` y `crear_cliente` recibe `limite_credito` como argumento final.
- `registrar_venta` rechaza `monto == 0` (`MontoInvalido`, 6004), `monto > limite_credito` (`ExcedeLimite`, 6006) y más de 10 ventas activas por cliente (`MuchasVentas`, 6007).
- `cambiar_monto` vuelve a validar el límite para que una corrección no salte el control.
- La UI muestra el límite, el crédito usado y el porcentaje; los errores de programa se traducen a español.
- La baja de cliente del día 5 queda integrada en la UI como `Dar de baja`.

## Contrato del bootcamp (sin romper)

Se conservan las 6 instrucciones base, el orden de argumentos/cuentas, los seeds `registro`, `cliente`, `venta` y los errores 6000–6003. El validador `scripts/contrato-idl.mjs` acepta campos/argumentos añadidos **al final**, pero rechaza cualquier cambio en el prefijo base.

## Estructura

- `programa/src/lib.rs`: programa Anchor con las cuentas `Registro`, `Cliente` y `Venta`.
- `idl.json`: contrato fuente para Codama.
- `clients/js/src/generated`: cliente generado (instrucciones, cuentas, tipos y PDA helpers).
- `src/solana`: PDAs, lecturas, envío de transacciones, validaciones y seguridad Devnet.
- `src/components/Registro.tsx`: panel de consulta y operaciones con firma.
- `tests/integracion-cliente.test.ts`: 10 pruebas (semillas, serialización, contrato, errores y Devnet).

## Ejecutar

```powershell
npm ci
npm run cliente
npm run verificar
npm run dev
```

`npm run verificar` corre `tsc -b`, las pruebas y el build de producción. `npm run comprobar:idl` confirma que `idl.json`, `src/config/programa.json` y el cliente generado coinciden.

## Despliegue y entrega

1. En Solana Playground: pegar `programa/src/lib.rs`, conservar la línea `declare_id!` que te da Playground (el `declare_id!("")` del repo es solo marcador), `Build`, `Deploy` en Devnet y copiar el **Program ID**.
2. Exportar el IDL del programa y guardarlo localmente, por ejemplo `C:\Users\pilia\Downloads\credito_idl.json`.
3. Importarlo y regenerar el cliente:

```powershell
npm run configurar:idl -- "C:\Users\pilia\Downloads\credito_idl.json" --program-id TU_PROGRAM_ID
npm run verificar
```

4. Crear el negocio `Cafe Credito Novia` con la wallet de la entrega y capturar las firmas indicadas en `EVIDENCIAS.md`.
5. Subir este repo a `main` y enviar el formulario final con el enlace del repo y el Program ID.

No incluir claves privadas ni `keypair.json` en el repo. Las capturas deben mostrar direcciones públicas y firmas, nunca semillas.
