var path = require("path");
var fs = require('fs')

const noteData = []

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
       if (err) throw err;
       
       var notes= JSON.parse(data) 
       for( i = 0; i < notes.length; i ++){
        noteData.push(notes[i])
       }
       return res.json(noteData)
       
   })   

  });
  
  
  
  app.post("/api/notes", function(req, res) {
    
    var newNote = req.body;
    
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
