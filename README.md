# Next.js Dashboard Demo

Dashboard de transacciones construido con Next.js 15.

## 🚀 Características

- ✅ Consumo de API REST
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
git clone https://github.com/ginnaaceror/nextjs-dashboard-demo.git

# Entrar al directorio
cd nextjs-dashboard-demo

# Instalar dependencias
pnpm install
```

## ▶️ Ejecución

```bash
# Modo desarrollo
pnpm dev

# El proyecto estará disponible en http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.js              # Página principal
│   ├── layout.js            # Layout global
│   ├── loading.js           # Estado de carga
│   └── globals.scss         # Estilos globales
├── components/
│   ├── Dashboard.jsx        # Componente principal del dashboard
│   ├── DateFilter.jsx       # Filtro de fechas
│   ├── ErrorBoundary.jsx    # Manejo de errores
│   ├── FilterPanel.jsx      # Panel de filtros
│   ├── NavBar.jsx           # Barra de navegación
│   ├── SearchBar.jsx        # Barra de búsqueda
│   ├── TransactionCard.jsx  # Tarjeta de transacción (móvil)
│   ├── TransactionModal.jsx # Modal de detalles de transacción
│   └── TransactionTable.jsx # Tabla de transacciones (desktop)
├── lib/
│   ├── api.js               # Funciones para consumir la API
│   └── config.js            # Configuración centralizada
├── styles/
│   └── colors.scss          # Variables de colores
└── utils/
    ├── filters.js           # Utilidades de filtrado
    ├── format.js            # Utilidades de formato
    └── transactionIcons.jsx # Iconos de transacciones

public/
├── bancolombia_logo.svg     # Logos de métodos de pago
├── bold_logo_white.svg
├── daviplata_logo.svg
├── mastercard_logo.svg
├── nequi_logo.svg
├── pse_logo.svg
├── terminal-contactless.svg
├── visa_logo.svg
└── favicon.png
```

## 🌐 Deploy

El proyecto está desplegado en Vercel:

**[Ver Demo en Vivo](https://nextjs-dashboard-demo-ten-liard.vercel.app/)** _(Actualizar después del deploy)_
