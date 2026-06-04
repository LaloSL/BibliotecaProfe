# Gestor de Bibliotecas Comunitarias

## Descripción general

Los alumnos desarrollarán una pequeña aplicación web para gestionar el préstamo de libros en una biblioteca barrial. El sistema tendrá usuarios (socios de la biblioteca), libros y préstamos. Deberán modelar las relaciones entre estas entidades y permitir consultas relacionadas.

## Entidades principales (tablas)

### Usuarios

- **id**
- **nombre**
- **dni**
- **fecha_registro**

### Libros

- **id**
- **titulo**
- **autor**
- **anio_publicacion**
- **categoria**
- **isbn**

### Préstamos

- **id**
- **usuarioId** (FK a Usuarios)
- **libroId** (FK a Libros)
- **fecha_prestamo**
- **fecha_devolucion**

## Funcionalidades requeridas

- Listar todos los libros disponibles.
- Registrar nuevos usuarios y libros.
- Registrar un préstamo (relacionando usuario y libro).
- Listar todos los préstamos activos.
- Ver los préstamos de un usuario en particular.
- Consultar cuántos libros tiene prestados un usuario.
- Marcar la devolución de un libro.

## Tecnologías a aplicar

- **Node.js + Express:** backend y rutas.
- **Sequelize:** modelos, relaciones (`belongsTo`, `hasMany`), consultas.
- **SQL:** comprensión del modelo relacional (pueden ver el SQL generado por Sequelize). Mediante MYSQL
- **PUG:** vistas simples para mostrar listados y formularios.
- **CSS (opcional):** para estilizar las vistas (si quieren).

---

## Cómo ejecutar el proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/ignacioOrellano/biblioteca-app.git
   ```
2. Ingresa al directorio del proyecto:
   ```bash
   cd biblioteca-app
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura la base de datos MySQL y actualiza los datos de conexión en `models/db.js` si es necesario.
5. Sincroniza la base de datos y carga datos de ejemplo (opcional):
   ```bash
   node seeders/seed.js
   ```
6. Inicia la aplicación:
   ```bash
   npm run start
   ```
7. Accede a la app en tu navegador en [http://localhost:3000](http://localhost:3000)
