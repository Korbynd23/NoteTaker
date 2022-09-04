const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => res.send(__dirname, 'index.html'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET route for retrieving all the notes {REF - 11.1.21.serverJS.62}

// POST route for a new note  {REF - 11.1.21.serverJS.68}
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`)
  
  const {title, text} = req.body;
  
  const addNote = {
    title,
    text,
    note_id: uuidv4(),
  };
  
  fs.readFile('./db/db.json', 'utf-8', (err,data) => {
    const notesJson = JSON.parse(data);
    notesJson.push(addNote);
    fs.writeFile('./db/db.json', JSON.stringify(notesJson, null, 4), (err) => {
      res.json(notesJson);
      console.log(`Note added successfully 🚀`)
    });
  });
});


app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);


// app.get('/api/notes', (req, res) => fs.readFile('./db.db.json', 'utf-8', (err, data) => res.json(JSON.parse(data))));