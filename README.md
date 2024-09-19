# net-clone
Net Clone - Pelis Wok 🎬🍿

Este es un clon básico de Netflix construido utilizando Ionic y Angular, con la autenticación y la base de datos gestionadas a través de Firebase y Firestore.

- Tabla de contenidos
- Requisitos Previos
- Instalación
- Configuración de Firebase
- Despliegue
- Usuarios de Prueba
- Funcionalidades Implementadas
- Licencia

Requisitos Previos
Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- Node.js: Descargar Node.js

- Ionic CLI: Puedes instalar Ionic CLI ejecutando el siguiente comando:

npm install -g @ionic/cli

- Angular CLI: Puedes instalar Angular CLI ejecutando:

npm install -g @angular/cli

- Firebase CLI (Opcional, si necesitas utilizar Firebase Hosting):

npm install -g firebase-tools

Instalación


- Clona este repositorio en tu máquina local:

git clone https://github.com/luispiedrahita258/net-clone.git

- Accede al directorio del proyecto:

cd net-clone

Instala las dependencias necesarias:

npm install

Configuración de Firebase
La aplicación utiliza Firebase para la autenticación y Firestore para la base de datos. Para configurar tu propio proyecto de Firebase:

- Crea un proyecto en Firebase Console.

- Activa Firestore en la sección "Firestore Database".

- Habilita los métodos de autenticación que desees (correo/contraseña, Google, Facebook, etc.) en la sección "Authentication" de Firebase Console.

- Genera el archivo firebaseConfig desde Firebase Console en la sección de "Project Settings".

- Crea un archivo src/environments/environment.ts y añade tu configuración de Firebase:

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO_AUTH",
    projectId: "TU_ID_PROYECTO",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};

- Para correr el proyecto en modo de desarrollo:

ionic serve

- Para generar el build de producción:

ionic build --prod

- (Opcional) Si deseas desplegar en Firebase Hosting, puedes ejecutar los siguientes pasos:

- Inicia sesión en Firebase:

firebase login

- Inicializa Firebase en tu proyecto:

firebase init

- Selecciona Hosting y configura el directorio de despliegue como www (o el que hayas definido).

- Finalmente, despliega el proyecto:

firebase deploy

- Usuarios de Prueba
- A continuación se proporcionan los usuarios de prueba que puedes usar para iniciar sesión en la aplicación. La autenticación está gestionada con Firebase Authentication.

Usuario	Correo Electrónico	Contraseña	Rol
Admin	pruebas4@gmail.com	123456	admin
Usuario Normal 1	prueba@gmail.com	12345678	user
Usuario Normal 2	prueba1@gmail.com	123456	user
Usuario Normal 3	prueba2@gmail.com	123456	user
Usuario Normal 4	prueba3@gmail.com	123456	user

- El administrador (pruebas4@gmail.com) tiene permisos adicionales, como la capacidad de añadir nuevas películas.

- Funcionalidades Implementadas

- Autenticación con Firebase:

- Registro e inicio de sesión mediante correo y contraseña.
- Recuperación de contraseña.
- Soporte para autenticación mediante Google (opcional, configurable en Firebase).

- Base de Datos Firestore:

- Colección de usuarios, que almacena la información básica y el rol de cada usuario.
- Colección de películas, con título, sinopsis, imagen, y categoría.

- Interfaz Estilo Netflix:

- Carrusel de películas categorizadas (Acción, Comedia, Drama).
- Barra de búsqueda que permite encontrar películas por título.
- Página de detalles de cada película que muestra la sinopsis, el elenco y más información relevante.
- Posibilidad de marcar y desmarcar películas como favoritas.

Diseño Responsivo:

- La aplicación es completamente responsiva, adaptándose a dispositivos móviles, tablets y pantallas de escritorio.

- Licencia
- Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

- Contribuciones
- Si encuentras algún problema o tienes sugerencias, no dudes en abrir un "issue" o enviar un "pull request".
