Integrantes:

Felipe Piña:
        Backend

Marcelo Comisso:
        Frontend

Avengers API & Frontend
API y frontend en React para gestionar un club de fans de los Avengers. Permite agregar nuevos Avengers con sus datos y habilidades, validar formularios, y mostrar la lista.
## Vista previa


### 📃 Lista de Avengers

![Lista1](./frontend/public/Avengers-list%201.jpg)

![Lista2](./frontend/public/Avengers-list%202.jpg)

![Formulario](./frontend/public/Avengers-form.jpg)


Tecnologías
Backend: Node.js + Prisma + MySQL (o base de datos relacional)

Frontend: React + TypeScript + TailwindCSS

API llamada desde frontend para crear Avengers

Instalación y puesta en marcha
Backend
Clonar el repositorio y entrar en la carpeta backend.

Instalar dependencias:


Configurar conexión a base de datos en .env (MySQL o la que uses).

Ejecutar migraciones con Prisma para crear las tablas:


npx prisma migrate dev --name init
Levantar el servidor:


npm run dev
El backend estará corriendo por defecto en http://localhost:3000.

Frontend
Entrar en la carpeta frontend.

Instalar dependencias:


npm install
Levantar la app React:


npm start
La app abrirá en http://localhost:5173/.

Funcionalidades actuales
Formulario para crear un nuevo Avenger con:

Nombre real

Alias

Actor que lo interpreta

Descripción

Habilidades (campo texto que se convierte en array)

Validación básica de formulario para campos obligatorios.

Envío al backend del Avenger con habilidades como array.

Estructura principal
/backend: servidor API con Prisma y Node.js

/frontend: app React con componentes:

AvengerForm (formulario para crear Avengers)

AvengerListt (lista de Avengers)

