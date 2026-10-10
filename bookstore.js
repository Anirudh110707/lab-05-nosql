
db = db.getSiblingDB("bookstore")


db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)


db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)


db.authors.find()
db.books.find()


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


db.authors.insertOne({
  _id: "author_004",
  name: "J. R. R. Tolkien",
  nationality: "British",
  bio: {
    short: "English writer and scholar.",
    long: "J. R. R. Tolkien was an English writer, academic, and philologist best known for The Hobbit and The Lord of the Rings."
  }
})


db.books.find({
  author_ids: {
    $in: ["author_002", "author_004"]
  }
})