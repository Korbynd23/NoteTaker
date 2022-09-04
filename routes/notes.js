const notes = require('express').Router();
const {
  readFromFile,
//   readAndAppend,
//   writeToFile,
} = require('../helpers/fsUtils');

// // GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
tips.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text, id } = req.body;
  
    if  (req.body) {
      const addNote = {
        title,
        text,
        id: uuidv4(),
    };
  
    readAndAppend(addNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = notes