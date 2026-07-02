# mitienda · Ecommerce MVP

MVP de ecommerce para portfolio, construido con **Next.js 16 (App Router)**, **React 19** y **Tailwind CSS 4**. Inspirado en [pillowtop.com.ar](https://www.pillowtop.com.ar/), con foco en velocidad y personalización.

## Features

- 🎨 **Tema personalizable en vivo**: colores (paletas + color picker), tipografía (4 fuentes) y modo claro/oscuro, persistido en `localStorage` sin flash de tema incorrecto.
- 🛒 **Carrito funcional** con drawer, cantidades y persistencia.
- 💳 **Checkout simulado** con confirmación de orden.
- ⚡ **Performance**: páginas estáticas (SSG), cero imágenes externas (visuales generados por CSS), fuentes optimizadas con `next/font`.
- 📱 Responsive y accesible.

## Correr localmente

```bash
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Deploy en Vercel

Importá el repo en [vercel.com/new](https://vercel.com/new) — no requiere configuración extra ni variables de entorno.

## Personalización

- **Productos**: editá `lib/products.ts` (datos genéricos pensados para reemplazar por cualquier rubro).
- **Tema por defecto**: `lib/theme.ts` (`defaultTheme`, paletas y fuentes disponibles).
- **Colores base y modo oscuro**: `app/globals.css`.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · pnpm
