var path = require("path");
var fs = require('fs')

const noteData = []
const randomID = ['1', '2','3', '4', '5', '6', '7', '8', '9', '0']
module.exports = function(app) {

app.get("/api/notes", function(req, res) {
  
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
      
      var notes= JSON.parse(data) 
      for( i = 0; i < notes.length; i ++){
      noteData.push(notes[i])
      }
      return res.send(noteData)
      
  })   

});

app.get("/api/notes/:id", function(req, res) {
    var selectedID = req.params.id
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
      if (err) throw err;
       
      var notes= JSON.parse(data) 
    
      selectedNote = notes.filter(note => note.id === selectedID)
      return res.send(selectedNote)
  
   })   

});


  
  
  
  app.post("/api/notes", function(req, res) {
    var noteID = idGenerator()
    var newNote = {
      title: req.body.title,
      text: req.body.text,
      id: noteID } ;
    
    console.log(newNote);
    noteData.push(newNote)
    
    var postedNotes = JSON.stringify(noteData)

    fs.writeFile(path.join(__dirname, "../db/db.json"), postedNotes, (err) => {
      if (err) throw err;
      console.log("Note saved successfully!")
      return res.json(newNote)
    });
    
  });
}

function idGenerator () {
  var noteID = ''
 for (i = 0; i < 5; i ++){
  var randomNum = Math.floor(Math.random() * 10)
  noteID += randomNum
 }
 console.log(noteID)
 return noteID
}


