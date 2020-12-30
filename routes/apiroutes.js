var path = require("path");
var fs = require('fs')

const noteData = []

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
       if (err) throw err;
       console.log(data)
       noteData.push(data) 
       res.json(noteData)
   })   

  });
  
  
  
  app.post("/api/notes", function(req, res) {
    
    var newNote = JSON.stringify(req.body);
  
    console.log(newNote);
    fs.appendFile(path.join(__dirname, "../db/db.json"), `[${newNote}]`, (err) => {
      if (err) throw err;
      console.log("Note saved successfully!")
      res.json(newNote)
    });
    
  });
}
