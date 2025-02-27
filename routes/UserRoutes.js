const express = require("express");
const Book = require("../model/UserModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book Not Found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const { title, artist, genre, year, price } = req.body;
  const book = new Book({
    title,
    artist,
    genre,
    year,
    price,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { title, artist, genre, year, price } = req.body;
    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, artist, genre, year, price },
      { new: true, runValidators: true }
    );
    if (!updateBook) return res.status(404).json({ message: "Book Not Found" });
    res.status(201).json(updateBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    if (!deleteBook) return res.status(404).json({ message: "Book not found" });
    res.status(201).json({ message: "Book deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;