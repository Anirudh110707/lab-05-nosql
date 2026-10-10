// Step 2: switch to bookstore database
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
db.authors.find()
db.books.find()

// Step 6: insert two new books
db.books.insertOne({
  title: "The Hobbit",
  published_year: 1937,
  author_ids: ["author_004"]
})

db.books.insertOne({
  title: "Coraline",
  published_year: 2002,
  author_ids: ["author_002"]
})

// Step 7: add missing authors
db.authors.insertOne({
  _id: "author_004",
  name: "J. R. R. Tolkien",
  nationality: "British",
  bio: {
    short: "English writer and scholar.",
    long: "J. R. R. Tolkien was an English writer, academic, and philologist best known for The Hobbit and The Lord of the Rings."
  }
})

// Step 8: filter books by a list of authors
db.books.find({
  author_ids: {
    $in: ["author_002", "author_004"]
  }
})