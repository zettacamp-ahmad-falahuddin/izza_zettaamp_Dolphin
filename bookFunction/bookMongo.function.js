const Book = require('../models/Book.model');

///////////////////////////////////////// READ MANY DOCUMENTS BOOK /////////////////////////////////////

async function readAllDocumentsBook() {
  const books = await Book.find({});
  return books;
}

async function readManyDocumentsBooksbypriceRange(priceBottom, priceTop) {
  if (priceTop === undefined) {
    const books = await Book.find({
      book_price: { $gte: priceBottom },
    });
    return books;
  } else if (priceBottom === undefined) {
    const books = await Book.find({
      book_price: { $lte: priceTop },
    });
    return books;
  }
  const books = await Book.find({
    book_price: { $gte: priceBottom, $lte: priceTop },
  });
  return books;
}

///////////////////////////////////////// READ ONE DOCUMENT BOOK /////////////////////////////////////

async function readOneDocumentBookbybook_name(book_name) {
  const book = await Book.find({
    book_name: book_name,
  });
  return book;
}

///////////////////////////////////////// ADD MANY DOCUMENTS BOOK /////////////////////////////////////

async function addManyDocumentsBook(booksList) {
  try {
    const books = await Book.insertMany(booksList);
    return books;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// ADD ONE DOCUMENT BOOK /////////////////////////////////////

async function addOneDocumentBook(_id, book_name, book_price) {
  try {
    const book = await Book.create({
      _id: _id,
      book_name: book_name,
      book_price: book_price,
    });
    return book;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// UPDATE ONE DOCUMENT BOOK /////////////////////////////////////

async function updateOneDocumentBook(book_name, book_name_set, book_price_set) {
  if (book_name_set === undefined || book_price_set === undefined) 
    return ' book_name_set, book_price_set cannot be null';

  const book = await Book.updateOne(
    {
      book_name: book_name,
    },
    {
      $set: {
        book_name: book_name_set,
        book_price: book_price_set,
      },
    }
  );
  return book;
}

///////////////////////////////////////// DELETE MANY DOCUMENTS BOOK /////////////////////////////////////

async function deleteAllDocumentsBook() {
  const books = await Book.deleteMany({});
  return books;
}

async function deleteManyDocumentsBooksbyprice(priceBottom, priceTop) {
  if (priceTop === undefined) {
    const books = await Book.deleteMany({
      book_price: { $gte: priceBottom },
    });
    return books;
  } else if (priceBottom === undefined) {
    const books = await Book.deleteMany({
      book_price: { $lte: priceTop },
    });
    return books;
  }
  const books = await Book.deleteMany({
    book_price: { $gte: priceBottom, $lte: priceTop },
  });
  return books;
}

///////////////////////////////////////// DELETE ONE DOCUMENT BOOK /////////////////////////////////////

async function deleteOneDocumentBook(book_name) {
  const book = await Book.deleteOne({
    book_name: book_name,
  });
  return book;
}

module.exports = {
  readAllDocumentsBook,
  readManyDocumentsBooksbypriceRange,
  readOneDocumentBookbybook_name,
  addManyDocumentsBook,
  addOneDocumentBook,
  updateOneDocumentBook,
  deleteAllDocumentsBook,
  deleteManyDocumentsBooksbyprice,
  deleteOneDocumentBook,
};
