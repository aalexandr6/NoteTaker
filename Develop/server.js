//mini project helped
const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
}
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}
);

app.get('/api/notes', (req, res) => {
    res.json(db);
}
);

app.post('/api/notes', (req, res) => {
    req.body.id = db.length.toString();
    const note = req.body;
    db.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(note);
}
);

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db.splice(id, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
}
);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
}
);

