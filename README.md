# Dashboard Landing Demo

Un panel de control moderno e interactivo construido con **Next.js 16**, **React 19**, **Tailwind CSS 4** y **HeroUI**. Proyecto de demostración con datos simulados en tiempo real, diseñado para mostrar métricas de ventas, pedidos, usuarios y actividad reciente con una experiencia visual pulida.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-package%20manager-F69220?logo=pnpm)

---

## Características

- **Métricas clave en tiempo real**: ingresos, usuarios activos, pedidos y tasa de conversión con variaciones porcentuales.
- **Simulación de datos vivos**: genera pedidos y actividades automáticamente cada pocos segundos.
- **Tabla interactiva de pedidos**: ordenar, filtrar, cambiar estado y eliminar filas.
- **Gráficos de rendimiento**: comparación de períodos (semana, mes, trimestre, año).
- **Top de productos y registro de actividad**.
- **Interfaz moderna**: gradientes, glassmorphism, animaciones suaves y modo oscuro automático gracias a HeroUI.
- **Diseño responsive**: adaptable a escritorio, tablet y móvil.

---

## Stack tecnológico

| Tecnología        | Uso                                      |
|-------------------|------------------------------------------|
| Next.js 16        | Framework de React con App Router        |
| React 19          | Librería de UI                           |
| Tailwind CSS 4    | Estilos utilitarios                      |
| HeroUI            | Componentes de interfaz                  |
| Zustand + Immer   | Estado global inmutable                  |
| Framer Motion     | Animaciones                              |
| Lucide React      | Iconografía                              |
| pnpm              | Gestión de dependencias                  |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [pnpm](https://pnpm.io/) instalado

---

## Instalación y uso

1. Cloná o descargá el repositorio:

```bash
cd dashboard-landing
```

2. Instalá las dependencias:

```bash
pnpm install
```

3. Ejecutá el servidor de desarrollo:

```bash
pnpm dev
```

4. Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

Si el puerto 3000 está ocupado, Next.js usará automáticamente otro disponible (por ejemplo, el 3001).

---

## Scripts disponibles

| Script          | Descripción                              |
|-----------------|------------------------------------------|
| `pnpm dev`      | Inicia el servidor de desarrollo         |
| `pnpm build`    | Genera la compilación de producción      |
| `pnpm start`    | Inicia el servidor de producción         |
| `pnpm lint`     | Ejecuta ESLint sobre el proyecto         |

---

## Estructura del proyecto

```
dashboard-landing/
├── app/
│   ├── components/         # Componentes de la interfaz
│   │   ├── Dashboard.js
│   │   ├── DemoControls.js
│   │   ├── AddOrderModal.js
│   │   └── OrderDetailsModal.js
│   ├── store/              # Estado global con Zustand
│   │   └── dashboardStore.js
│   ├── Providers.js        # Proveedores de HeroUI
│   ├── layout.js           # Layout raíz
│   └── page.js             # Página principal
├── public/                 # Archivos estáticos
├── package.json            # Dependencias y scripts
├── next.config.js          # Configuración de Next.js
├── tailwind.config.js      # Configuración de Tailwind
└── postcss.config.mjs      # Configuración de PostCSS
```

---

## Notas importantes

- Los datos del dashboard son **generados localmente** para efectos de demostración. No requiere base de datos ni API externa.
- La simulación en vivo comienza automáticamente al cargar la página y puede controlarse o pausarse desde los controles de la interfaz.
- Si experimentás errores de caché de Turbopack durante el desarrollo, ejecutá `rm -rf .next` y volvé a correr `pnpm dev`.

---

## Licencia

Este proyecto es una demo de fines educativos y de presentación. Podés usarlo, modificarlo y adaptarlo libremente para tus propios proyectos.

---

Desarrollado como ejemplo de un dashboard moderno con React y Next.js.
# dashboard-demo
