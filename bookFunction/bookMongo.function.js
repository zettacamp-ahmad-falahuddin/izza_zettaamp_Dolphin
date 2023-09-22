const Book = require('../models/Book.model');

///////////////////////////////////////// READ MANY DOCUMENTS BOOK /////////////////////////////////////

async function readAllDocumentsBook() {
  const books = await Book.find({});
  return books;
}

async function readManyDocumentsBook_day6(book_genre, rating) {
  const books = Book.aggregate([
    {
      $match: {
        book_genre: book_genre,
      },
    },
    {
      $addFields: {
        rating: rating,
      },
    },
    {
      $project: {
        book_name: 1,
        book_price: 1,
        boook_name_genre_rating: {
          $concat: ['$book_name', ' - ', '$book_genre', ' - ', '$rating'],
        },
      },
    },
    {
      $sort: {
        book_price: 1,
      },
    },
  ]);
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

async function readManyDocumentsBooksbysomeFields(book_name, book_price, book_genre) {
  try {
    if (book_name === undefined && book_price === undefined && book_genre === undefined) {
      const books = Book.aggregate([
        {
          $project: { _id: 1 },
        },
      ]);
      return books;
    } else if (book_name === undefined) {
      const books = Book.aggregate([
        {
          $project: { book_name: 0 },
        },
      ]);
      return books;
    } else if (book_price === undefined) {
      const books = Book.aggregate([
        {
          $project: { book_price: 0 },
        },
      ]);
      return books;
    } else if (book_genre === undefined) {
      const books = Book.aggregate([
        {
          $project: { book_genre: 0 },
        },
      ]);
      return books;
    }
  } catch (error) {
    return error.message;
  }
}

async function readManyDocumentsBooksbyaddFields(priceBottom, field_name = 'label', field_value = 'Expensive') {
  const books = Book.aggregate([
    {
      $match: {
        book_price: { $gte: priceBottom },
      },
    },
    {
      $addFields: {
        [`${field_name}`]: field_value,
      },
    },
    {
      $project: {
        book_name: 1,
        [`${field_name}`]: field_value,
      },
    },
  ]);
  return books;
}

async function readManyDocumentsBooksbybook_genreMatch(book_genre) {
  const books = Book.aggregate([
    {
      $match: {
        book_genre: book_genre,
      },
    },
  ]);
  return books;
}

async function readManyDocumentsBooksbybook_priceCheapest() {
  const books = Book.aggregate([
    {
      $sort: {
        book_price: 1,
      },
    },
  ]);
  return books;
}

async function readManyDocumentsBooksbybook_nameConcatbook_genre() {
  const books = Book.aggregate([
    {
      $project: {
        _id: 1,
        boook_name_genre: {
          $concat: ['$book_name', ' - ', '$book_genre'],
        },
      },
    },
  ]);
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
  if (book_name_set === undefined || book_price_set === undefined) return ' book_name_set, book_price_set cannot be null';

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
  readManyDocumentsBook_day6,
  readManyDocumentsBooksbypriceRange,
  readManyDocumentsBooksbysomeFields,
  readManyDocumentsBooksbyaddFields,
  readManyDocumentsBooksbybook_genreMatch,
  readManyDocumentsBooksbybook_priceCheapest,
  readManyDocumentsBooksbybook_nameConcatbook_genre,
  readOneDocumentBookbybook_name,
  addManyDocumentsBook,
  addOneDocumentBook,
  updateOneDocumentBook,
  deleteAllDocumentsBook,
  deleteManyDocumentsBooksbyprice,
  deleteOneDocumentBook,
};
