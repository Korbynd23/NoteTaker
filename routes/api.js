const router = require('express') .Router()
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util')
const readFile = util.promisify(fs.readFile)

function getNotes() {
    return readFile('db/db.json', 'utf-8').then(rawNotes => {
      let parsedNotes = [].concat(JSON.parse(rawNotes))
      return parsedNotes;
    })
  }
  // GET route for retrieving all the notes {REF - 11.1.21.serverJS.62}
  router.get('/api/notes', (req, res) => {
    getNotes().then(data => res.json(data))
  })
  
  // POST route for a new note  {REF - 11.1.21.serverJS.68}
  router.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`)
  
    const { title, text } = req.body;
  
    const addNote = {
      title,
      text,
      id: uuidv4(),
    };
  
    getNotes().then(oldNotes => {
      let newNotes = [...oldNotes, addNote]
      fs.writeFile('./db/db.json', JSON.stringify(newNotes, null, 4), (err) => {
        res.json({msg:"ok"});
        console.log(`Note added successfully`)
      })
    })
  });

router.delete('/api/notes/:id', (req, res) => {
    getNotes().then(oldNotes => {
        let filteredNotes = oldNotes.filter(note => note.id !== req.params.id)
        console.log(filteredNotes)
        fs.writeFile('./db/db.json', JSON.stringify(filteredNotes, null, 4), (err) => {
            res.json({msg:"ok"});
          })
    })
})

  module.exports = router