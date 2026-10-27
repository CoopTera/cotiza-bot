# Cotiza Bot

Primer agente comercial para ayudar a convertir presupuestos en ventas.

## Qué incluye

- Agente EVE con instrucciones comerciales.
- Herramienta `draft_followup` para sugerir timing, enfoque y mensaje.
- `create_quote` guarda presupuestos confirmados en la API compartida de Cotiza.
- `draft_followup` prepara mensajes: todavía no envía WhatsApp ni modifica estados externos.

## Ejecutar

Requiere Node.js 24 y una credencial de modelo configurada en EVE.

```bash
npm run typecheck
npm run dev
```

En la interfaz de EVE, probá:

> Prepará un seguimiento para Constructora Delta. El presupuesto es de 1850000 por una estructura metálica para galpón. El diferencial es el tratamiento anticorrosivo y la entrega en 30 días.

La integración con la pantalla de `presupuestos-demo`, base de datos y WhatsApp queda para el siguiente paso.
