const express = require ("express");
const booksRouter = require("./routes/UserRoutes")

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

app.use('/books', booksRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Books Management API');
  });

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})