const mongoose = require('mongoose');
const Bookshelf = require('../models/Bookshelf.model');

///////////////////////////////////////// READ MANY DOCUMENTS Bookshelf /////////////////////////////////////

async function readAllDocumentsBookshelf() {
  const bookshelves = await Bookshelf.find({});
  return bookshelves;
}

async function readManyDocumentsBookshelvesbybooks_id(books_id) {
  try {
    const bookshelves = await Bookshelf.find({
      books_id: { $in: books_id.map((e) => new mongoose.Types.ObjectId(e)) },
    });
    return bookshelves;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// READ ONE DOCUMENT Bookshelf /////////////////////////////////////

async function readOneDocumentBookshelfby_id(_id) {
  const bookshelf = await Bookshelf.find({
    _id: _id,
  });
  return bookshelf;
}

///////////////////////////////////////// ADD MANY DOCUMENTS Bookshelf /////////////////////////////////////

async function addManyDocumentsBookshelves(BookshelfsList) {
  try {
    const bookshelves = await Bookshelf.insertMany(
      BookshelfsList.map(
        (e) =>
          new Object({
            _id: e._id,
            books_id: e.books_id.map((e) => new mongoose.Types.ObjectId(e)),
          })
      )
    );
    return bookshelves;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// ADD ONE DOCUMENT Bookshelf /////////////////////////////////////

async function addOneDocumentBookshelf(_id, books_id) {
  try {
    const bookshelf = await Bookshelf.create({
      _id: _id,
      books_id: books_id.map((e) => new mongoose.Types.ObjectId(e)),
    });
    return bookshelf;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// UPDATE ONE DOCUMENT Bookshelf /////////////////////////////////////

async function updateOneDocumentBookshelfPush(_id, books_id_push) {
  try {
    const bookshelf = await Bookshelf.updateOne(
      {
        _id: _id,
      },
      {
        $push: {
          books_id: {
            $each: books_id_push.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return bookshelf;
  } catch (error) {
    return error.message;
  }
}

async function updateOneDocumentBookshelfPull(_id, books_id_pull) {
  try {
    const bookshelf = await Bookshelf.updateOne(
      {
        _id: _id,
      },
      {
        $pull: {
          books_id: {
            $in: books_id_pull.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      }
    );
    return bookshelf;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// DELETE MANY DOCUMENTS Bookshelf /////////////////////////////////////

async function deleteAllDocumentsBookshelves() {
  const bookshelves = await Bookshelf.deleteMany({});
  return bookshelves;
}

async function deleteManyDocumentsBookshelvesbybooks_id(books_id) {
  try {
    const bookshelves = await Bookshelf.deleteMany({
      books_id: { $in: books_id.map((e) => new mongoose.Types.ObjectId(e)) },
    });
    return bookshelves;
  } catch (error) {
    return error.message;
  }
}

///////////////////////////////////////// DELETE ONE DOCUMENT Bookshelf /////////////////////////////////////

async function deleteOneDocumentBookshelf(_id) {
  const bookshelf = await Bookshelf.deleteOne({
    _id: _id,
  });
  return bookshelf;
}

module.exports = {
  readAllDocumentsBookshelf,
  readManyDocumentsBookshelvesbybooks_id,
  readOneDocumentBookshelfby_id,
  addManyDocumentsBookshelves,
  addOneDocumentBookshelf,
  updateOneDocumentBookshelfPush,
  updateOneDocumentBookshelfPull,
  deleteAllDocumentsBookshelves,
  deleteManyDocumentsBookshelvesbybooks_id,
  deleteOneDocumentBookshelf,
};
