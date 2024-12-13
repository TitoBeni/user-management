const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuració de MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // usuari de MySQL
  password: 'Nosetio69', // contrasenya de MySQL
  database: 'usuarisDB' // nom de la base de dades
});

connection.connect((err) => {
  if (err) {
    console.error('Error de connexió a MySQL:', err.stack);
    return;
  }
  console.log('Connectat a MySQL com id ' + connection.threadId);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta per obtenir usuaris
app.get('/api/usuaris', (req, res) => {
  connection.query('SELECT * FROM usuaris', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ruta per afegir un o més usuaris
app.post('/api/usuaris', (req, res) => {
  const usuaris = req.body; // Obtenim el cos de la petició, que pot ser un array d'usuaris

  if (Array.isArray(usuaris)) {
    // Si és un array, recorrem cada usuari i els inserim individualment
    const queries = usuaris.map((usuari) => {
      const { nom, cognoms, email, dni } = usuari;
      return new Promise((resolve, reject) => {
        connection.query(
          'INSERT INTO usuaris (nom, cognoms, email, dni) VALUES (?, ?, ?, ?)',
          [nom, cognoms, email, dni],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results.insertId);
            }
          }
        );
      });
    });

    // Esperem que totes les promeses es compleixin
    Promise.all(queries)
      .then((resultats) => {
        res.status(201).json({ message: 'Usuaris afegits', ids: resultats });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    // Si només hi ha un usuari, utilitzem la lògica original
    const { nom, cognoms, email, dni } = usuaris;
    connection.query(
      'INSERT INTO usuaris (nom, cognoms, email, dni) VALUES (?, ?, ?, ?)',
      [nom, cognoms, email, dni],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuari afegit', id: results.insertId });
      }
    );
  }
});

// Ruta per obtenir un usuari per DNI
app.get('/api/usuaris/:dni', (req, res) => {
  const dni = String(req.params.dni);
  console.log('DNI rebut:', dni); // Depurar el DNI rebut
  
  connection.query(
    'SELECT * FROM usuaris WHERE dni = ?',
    [dni],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log('Resultats obtinguts:', results); // Depurar els resultats de la consulta
      if (results.length > 0) {
        res.json(results[0]); // Retorna només el primer usuari trobat
      } else {
        res.status(404).json({ message: 'Usuari no trobat' });
      }
    }
  );
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en marxa a http://localhost:${port}`);
});
