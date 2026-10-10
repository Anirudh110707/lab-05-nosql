#!/usr/bin/env python3

import logging
import os

from pymongo import MongoClient


# Read MongoDB credentials from environment variables.
MONGODB_ATLAS_URL = os.getenv("MONGODB_ATLAS_URL")
MONGODB_ATLAS_USER = os.getenv("MONGODB_ATLAS_USER")
MONGODB_ATLAS_PWD = os.getenv("MONGODB_ATLAS_PWD")


def main():
    """Connect to MongoDB and print books for selected authors."""

    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s: %(message)s"
    )

    client = None

    try:
        # Connect to MongoDB Atlas.
        client = MongoClient(
            MONGODB_ATLAS_URL,
            username=MONGODB_ATLAS_USER,
            password=MONGODB_ATLAS_PWD,
        )

        logging.info("Connected to MongoDB Atlas.")

        # Select database and collections.
        db = client["bookstore"]
        authors = db["authors"]
        books = db["books"]

        # Original authors plus the new author we added.
        author_ids = [
            "author_002",
            "author_003",
            "author_004",
        ]

        author_count = authors.count_documents(
            {"_id": {"$in": author_ids}}
        )

        print(f"\nAuthors: {author_count}\n")

        # Print each author and every linked book.
        for author in authors.find({"_id": {"$in": author_ids}}):
            print(author["name"])

            for book in books.find({"author_ids": author["_id"]}):
                print(
                    f'  {book["title"]} '
                    f'({book["published_year"]})'
                )

            print()

    except Exception as exc:
        logging.error("MongoDB error: %s", exc)

    finally:
        if client is not None:
            client.close()
            logging.info("MongoDB connection closed.")


if __name__ == "__main__":
    main()