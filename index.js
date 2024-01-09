import express from "express";
import { db } from "./config/configuracion_firebase.js";
const app = express();

app.listen("8000", (req, res) => {
  console.log("Aplicacion iniciada en localhost://8000");
});

app.set("views", "./vistas");
app.set("view engine", "ejs");

app.use(express.static("./estilos"));
app.use(express.urlencoded({ extended: true }));


// Get de todos los libros
app.get("/", async (req, res) => {
  try {
    const librosRef = db.collection('libros');
    const querySnapshot = await librosRef.get();
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    }));
    res.render("index", { libros: books });
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
});

// Get de books por id
app.get("/libro/:id", async (req, res) => {
  const id = req.params.id;
  try {
 
    const docRef = db.collection('libros').doc(id);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const book = {
        id: id,
        ...docSnap.data()
        
      };
      console.log(book); 
      res.render("libro", { book }); 
    } else {
      console.log("No such document!");
      res.status(404).send('Not Found');
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    res.status(500).send('Server Error');
  }
});

// Post para agregar un libro
app.post("/agregar", async (req, res) => {
  const book = {
    bookName: req.body.Name,
    bookAuthor: req.body.Author,
  };
  try {
    const docRef = await db.collection('libros').add(book);
    console.log("Document written with ID: ", docRef.id);
    res.redirect("/");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Delete para borrar un libro
app.get("/borrar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.collection('libros').doc(id).delete();
    console.log("Document deleted with ID: ", id);
    res.redirect("/");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
});

// Edit para editar la base de datos
app.get("/editar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const docRef = db.collection('libros').doc(id);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const book = {
        id: id,
        ...docSnap.data()
      };
      res.render("editar", { book }); 
    } else {
      console.log("No such document!");
      res.status(404).send('Not Found');
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    res.status(500).send('Server Error');
  }
});

// Post para mandar lo editado
app.post("/actualizar/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBook = {
    bookName: req.body.Name,
    bookAuthor: req.body.Author,
  };
  try {
    const docRef = db.collection('libros').doc(id);
    await docRef.update(updatedBook);
    console.log("Document updated with ID: ", id);
    res.redirect("/");
  } catch (e) {
    console.error("Error updating document: ", e);
    res.status(500).send('Server Error');
  }
});
