const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware de journalisation avec morgan (optionnel)
const morgan = require('morgan');
app.use(morgan('combined'));

// Middleware pour la journalisation personnalisée
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile('visits1.log', logEntry, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de logs', err);
        }
    });
    next();
});

// Route pour la page d'accueil
app.get('/home', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil');
});

// Route pour la page d'aide
app.get('/help', (req, res) => {
    res.send('Voici l\'aide que vous avez demandée');
});

// Démarrage du serveur
app.listen(port, '192.168.229.131', () => {
    console.log(`Serveur démarré sur http://192.168.229.131:${port}`);
});

