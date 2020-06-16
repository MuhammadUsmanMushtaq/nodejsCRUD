const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pak123",
  database: "notesdb",
});

//Connect
db.connect((err) => {
  if (!err) console.log("notesdb is connected..");
  else
    console.log(
      "notesdb  connection failed \n Error:" + JSON.stringify(err, undefined, 2)
    );
});

// Set Server
app.listen("4000", () => {
  console.log("sever running on 4000");
});

//Get all notes
app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get specific note
app.get("/notes/:id", (req, res) => {
  db.query(
    "SELECT * FROM notes WHERE notesID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete note
app.delete("/notes/:id", (req, res) => {
  db.query(
    "DELETE FROM notes WHERE notesID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Note Deleted");
      else console.log(err);
    }
  );
});

//Add new note
app.post("/notes", (req, res) => {
  let post = { notesID: "4", Title: "Note four", Description: "The Myth" };
  db.query("INSERT INTO notes SET ?", post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Note added...");
  });
});

//Update note
app.put("/notes/:id", (req, res) => {
  let newTitle = "Note one";
  db.query(
    `UPDATE notes SET Title = '${newTitle}' WHERE notesID = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Note updated...");
    }
  );
});
