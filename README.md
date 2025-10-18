# Next.js Dashboard Demo

Dashboard de transacciones construido con Next.js 15.

## 🚀 Características

- ✅ Consumo de API REST
- ✅ Manejo profesional de errores
- ✅ Server Components de Next.js 15
- ✅ Diseño responsive con Tailwind CSS
- ✅ Arquitectura modular y escalable

## 🛠️ Tecnologías

- **Next.js 15.5.6** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **Tailwind CSS 4** - Framework de estilos
- **JavaScript** - Lenguaje de programación

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nextjs-dashboard-demo.git

# Entrar al directorio
cd nextjs-dashboard-demo

# Instalar dependencias
pnpm install
# o
npm install
```

## ▶️ Ejecución

```bash
# Modo desarrollo
pnpm dev
# o
npm run dev

# El proyecto estará disponible en http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.js           # Página principal
│   ├── layout.js         # Layout global
│   └── globals.css       # Estilos globales
├── lib/
│   ├── api.js           # Funciones para consumir la API
│   └── config.js        # Configuración centralizada
└── components/
    └── ErrorBoundary.jsx # Componente de manejo de errores
```

## 🏗️ Arquitectura

### Server Components

El proyecto utiliza **Server Components** de Next.js 15 para:

- Mejor rendimiento (fetch en el servidor)
- Menos JavaScript enviado al cliente
- SEO optimizado

### Separación de responsabilidades

- **`api.js`** - Lógica de peticiones HTTP
- **`config.js`** - Configuración centralizada
- **`ErrorBoundary.jsx`** - UI de errores
- **`page.js`** - Orquestación y renderizado

### Manejo de errores

- Try/catch en Server Components
- Mensajes de error claros al usuario
- Fallback UI cuando la API falla

## 🎨 Decisiones de Diseño

1. **Server Components por defecto** - Más rápido y eficiente
2. **Client Components solo cuando es necesario** - ErrorBoundary usa "use client" para interactividad
3. **Tailwind CSS** - Estilos consistentes y mantenibles
4. **Configuración modular** - Fácil de cambiar URLs y parámetros

## 🌐 Deploy

El proyecto está desplegado en Vercel:

**[Ver Demo en Vivo](https://tu-proyecto.vercel.app)** _(Actualizar después del deploy)_
