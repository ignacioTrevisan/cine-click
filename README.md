# CineClick

Plataforma de gestión y visualización de información de películas, ideal para salas de cine que buscan administrar horarios y categorías como próximos estrenos y nuevas producciones. Este proyecto está diseñado como parte de un portafolio de proyectos para demostrar habilidades con **Next.js**, **Prisma**, y un stack moderno de desarrollo.

---

## Características

- Gestión de información sobre películas, incluyendo categorías como:
  - Transmisiones actuales.
  - Próximos estrenos ("Movies Soon").
  - Nuevas producciones ("New Releases").
- Generación automática de transmisiones por día y teatro.
- Uso de Prisma como ORM para interacción con la base de datos.
- Implementación de un sistema robusto de seeds para popular la base de datos con información inicial.
- Integración con PayPal para la compra de tickets.

---

## Tecnologías principales

- **Frontend**: Next.js
- **Backend**: Node.js con Prisma
- **Base de datos**: PostgreSQL (Dockerized)
- **Infraestructura**: Docker para contenedorización
- **ORM**: Prisma
- **Pagos**: PayPal

---

## Instrucciones para desarrollo

### Requisitos previos

Asegúrate de tener instalados los siguientes elementos en tu entorno:

- Node.js v16+
- Docker
- npm

### Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/ignacioTrevisan/cine-click
   cd CINE-CLICK
   ```

2. Crea una copia del archivo de plantilla de entorno y ajusta las variables:
   ```bash
   cp .env.template .env
   ```

   Modifica el archivo `.env` con las credenciales necesarias.

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Levanta la base de datos con Docker:
   ```bash
   docker compose up -d
   ```

5. Llena la base de datos con datos iniciales:
   ```bash
   npm run seed
   ```

6. Corre el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Instrucciones para producción

1. Genera el build del proyecto:
   ```bash
   npm run build
   ```

2. Corre el servidor en modo producción:
   ```bash
   npm start
   ```

Asegúrate de configurar correctamente las variables de entorno en el archivo `.env` para producción.

---

## Scripts disponibles

- **`npm run dev`**: Levanta el proyecto en modo desarrollo.
- **`npm run build`**: Genera un build optimizado para producción.
- **`npm start`**: Corre el proyecto en modo producción.
- **`npm run seed`**: Llena la base de datos con información inicial.

---

## Notas adicionales

- El proyecto incluye un seed automático para crear salas, películas y sus categorías, pero es importante limpiar las tablas previamente para evitar datos duplicados.
- El archivo `.env` debe incluir configuraciones específicas como:
  ```env
  DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
  PAYPAL_CLIENT_ID=<tu-client-id-de-paypal>
  PAYPAL_SECRET=<tu-secret-de-paypal>
  ```

---

Si necesitas más información o tienes dudas sobre la configuración, no dudes en contactarme a Nachotizii988@gmail.com.

