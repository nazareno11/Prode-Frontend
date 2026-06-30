# Prode Frontend

Frontend del Prode del Mundial, hecho en React + Vite. Consume la API REST del backend (Spring Boot), que es donde está la documentación principal del proyecto (endpoints, modelos, reglas de negocio).

## Stack

- React 19 + Vite
- React Router
- Axios
- react-icons

## Requisitos

- Node.js 18+
- El backend corriendo en `http://localhost:8080` (ver `src/api/axios.js` si necesitás cambiar la URL base)

## Instalación

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Scripts

- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npm run preview` — preview del build
- `npm run lint` — linting

## Estructura

```
src/
├── api/            # servicios que llaman a la API (axios)
├── components/     # componentes reutilizables (MatchCard, ProfileCard, Navbar, etc)
├── context/        # AuthContext
├── hooks/          # useAuth
├── layouts/        # MainLayout
├── pages/          # vistas por ruta (partidos, grupos, pronósticos, perfil, ranking)
├── routes/         # PrivateRoute / PublicRoute
└── styles/         # estilos globales y variables
```

## Funcionalidades principales

- **Login / Registro** de usuarios
- **Partidos**: listado agrupado por grupo del torneo
- **Pronósticos**: crear/editar pronósticos de partidos `POR_JUGARSE` (bloqueados 30 min antes del inicio), consulta de "Mis Pronósticos" con filtro por estado
- **Grupos**: crear grupo, unirse con código de invitación, ranking por grupo
- **Perfil**: avatar, estadísticas del usuario, accesos rápidos a grupos y pronósticos

## Autenticación

El token JWT se guarda en `localStorage` y se envía automáticamente en cada request vía interceptor de Axios. Si el back devuelve `401`, la sesión se cierra y redirige a `/login`.