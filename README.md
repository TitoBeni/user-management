# user-management

Aquesta aplicació és una solució completa per gestionar usuaris, creada amb Ionic i Angular per al frontend, Node.js i Express per a l'API, i MySQL per a la base de dades.

## Requisits

Per executar aquest projecte localment, assegura't que tens instal·lades les següents eines:

- **Node.js** (versió 14 o superior): [Descarrega Node.js](https://nodejs.org/)
- **MySQL**: [Descarrega MySQL](https://dev.mysql.com/downloads/installer/)
- **Ionic CLI**: Si no tens Ionic instal·lat, pots instal·lar-lo amb el següent comandament al terminal: npm install -g @ionic/cli
- **Repositori**: git clone https://github.com/TitoBeni/user-management.git

## Configura la base de dades

- A MySQL dins la propia instancia, crear la base de dades:

  `CREATE DATABASE usuarisDB;
  USE usuarisDB;`

  `CREATE TABLE usuaris (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    cognoms VARCHAR(100),
    email VARCHAR(100),
    dni VARCHAR(20)
  );`

- Dins la carpeta de la API, canviar credencials al fitxer index.js:

  `module.exports = {
    host: 'localhost',
    user: 'root', // El teu usuari MySQL
    password: '',  // La teva contrasenya
    database: 'usuarisDB',  // El nom de la base de dades
  };`

## Inicia la API (Node.js + Express)

- Accedeix a la carpeta del backend/api (on tens la API):

`cd ruta/a/la/carpeta/api`

- Instal·la les dependències: Si és la primera vegada que treballes amb aquest projecte o si has afegit noves dependències, executa:

`npm install`

- Inicia el servidor de l'API:

`node index.js`

- El servidor API s'iniciarà normalment a http://localhost:3000, però si has canviat el port a la configuració, assegura't de mirar el missatge de la terminal per saber en quin port s'executa.

## Inicia la aplicació (Ionic + Angular)

- Accedeix a la carpeta del frontend/user-management (on tens el projecte de Ionic + Angular):

`cd /camí/del/projecte/frontend`

- Instal·la les dependències (si no ho has fet prèviament):

`npm install`

- Inicia l'aplicació frontend:

`ionic serve`

- Això iniciarà un servidor de desenvolupament que normalment podràs accedir a través de http://localhost:8100.






