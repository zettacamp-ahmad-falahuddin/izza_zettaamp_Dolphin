const mongoose = require('mongoose');
const express = require('express');

const app = express();

const {
  readAllDocumentsBook,
  readManyDocumentsBook_day6,
  readManyDocumentsBook_day7,
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
} = require('./bookFunction/bookMongo.function');

const Book = require('./models/Book.model');

const booksList = [
  {
    book_name: 'Filosofi Teras',
    book_price: 50000,
    book_genre: 'Self Development',
  },
  {
    book_name: 'Atomic Habits',
    book_price: 60000,
    book_genre: 'Self Development',
  },
  {
    book_name: 'Pulang',
    book_price: 65000,
    book_genre: 'Drama',
  },
  {
    book_name: 'Pergi',
    book_price: 100000,
    book_genre: 'Drama',
  },
  {
    book_name: 'Komet',
    book_price: 90000,
    book_genre: 'Science Fiction',
  },
  {
    book_name: 'Prisoner of Azkaban',
    book_price: 95000,
    book_genre: 'Mystery',
  },
  {
    book_name: 'Chamber of Secrets',
    book_price: 75000,
    book_genre: 'Mystery',
  },
  {
    book_name: '1001 Malam',
    book_price: 85000,
    book_genre: 'Wisdom',
  },
  {
    book_name: 'The Wall',
    book_price: 80000,
    book_genre: 'Horror',
  },
];

const booksList1 = [
  {
    book_name: 'Introvert',
    book_price: 57000,
    book_genre: 'Self Development',
  },
  {
    book_name: 'Deathly Hallows',
    book_price: 88000,
    book_genre: 'Mystery',
  },
  {
    book_name: 'Nasrudin',
    book_price: 65000,
    book_genre: 'Wisdom',
  },
  {
    book_name: 'Matahari',
    book_price: 90000,
    book_genre: 'Science Fiction',
  },
  {
    book_name: 'Negeri Para Bedebah',
    book_price: 75000,
    book_genre: 'Drama',
  },
  {
    book_name: 'Historia',
    book_price: 85000,
    book_genre: 'Historical',
  },
  {
    book_name: 'World Aircraft',
    book_price: 81000,
    book_genre: 'Historical',
  },
];

const booksList2 = [
  {
    book_name: 'Selena',
    book_price: 79000,
    book_genre: 'Science Fiction',
  },
  {
    book_name: 'Introduction to Thermal System Engineering',
    book_price: 90000,
    book_genre: 'Engineering',
  },
  {
    book_name: 'Dynamics',
    book_price: 65000,
    book_genre: 'Engineering',
  },
  {
    book_name: 'Bedebah di Ujung Tanduk',
    book_price: 100000,
    book_genre: 'Drama',
  },
  {
    book_name: 'Statics',
    book_price: 90000,
    book_genre: 'Engineering',
  },
  {
    book_name: 'Negeri di Ujung Tanduk',
    book_price: 95000,
    book_genre: 'Drama',
  },
  {
    book_name: 'Orbital Mechanics',
    book_price: 75000,
    book_genre: 'Engineering',
  },
  {
    book_name: 'Fundamental of Aerodynamics',
    book_price: 85000,
    book_genre: 'Engineering',
  },
  {
    book_name: 'Fluid Mechanics',
    book_price: 80000,
    book_genre: 'Engineering',
  },
];

const booksList3 = [
  {
    book_name: 'Kanban',
    book_price: 98000,
    book_genre: 'Self Development',
  },
  {
    book_name: 'They',
    book_price: 93000,
    book_genre: 'Horror',
  },
];

const booksList4 = [
  {
    book_name: 'Bumi',
    book_price: 50000,
    book_genre: 'Science Fiction',
  },
  {
    book_name: 'Sagaras',
    book_price: 77000,
    book_genre: 'Science Fiction',
  },
  {
    book_name: 'Nebula',
    book_price: 60000,
    book_genre: 'Science Fiction',
  },
];

const {
  readAllDocumentsBookshelf,
  readManyDocumentsBookshelvesbybooks_id,
  readManyDocumentsBookshelvesbybooks_idthenUnwindbooks_idthenPopulate,
  readManyDocumentsBookshelveslookup,
  readOneDocumentBookshelfby_id,
  addManyDocumentsBookshelves,
  addOneDocumentBookshelf,
  updateOneDocumentBookshelfPush,
  updateOneDocumentBookshelfPull,
  deleteAllDocumentsBookshelves,
  deleteManyDocumentsBookshelvesbybooks_id,
  deleteOneDocumentBookshelf,
} = require('./bookshelfFunction/bookshelfMongo.function');

const Bookshelf = require('./models/Bookshelf.model');

const bookshelvesList = [
  {
    _id: 1,
    books_id: [
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba5e'),
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba60'),
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba62'),
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba64'),
    ],
  },
  {
    _id: 2,
    books_id: [new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba65'), new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba61')],
  },
  {
    _id: 3,
    books_id: [
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba66'),
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba5f'),
      new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba60'),
    ],
  },
  {
    _id: 4,
    books_id: [new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba62'), new mongoose.Types.ObjectId('650a63519ac9d512d4a3ba63')],
  },
];

///////////////////////////////////////// CONNECT MONGODB /////////////////////////////////////

async function connectMongoDB() {
  await mongoose
    .connect('mongodb://localhost:27017/belajar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      try {
        // await Book.insertMany(booksList4);
        // await Bookshelf.insertMany(bookshelvesList);
      } catch (error) {
        return error.message;
      }
      console.log('Berhasil terkoneksi mongodb');
    })
    .catch((err) => console.log(err.message));
}

connectMongoDB();

app.use(express.json());

app.get('/', async (_, res) => {
  console.log('Selamat datang, wahai list bookshelf dan buku di response');

  const bookshelves_and_books = {
    bookshelves: bookshelvesList,
    books: booksList,
  };

  res.json(bookshelves_and_books);
});

///////////////////////////////////////// BOOK /////////////////////////////////////

app.get('/books', async (_, res) => {
  console.log('Selamat datang, wahai list book di response');

  const books = await readAllDocumentsBook();

  res.json(books);
});

app.get('/books/day6', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { book_genre, rating } = req.body;

  const books = await readManyDocumentsBook_day6(book_genre, rating);

  res.json(books);
});

app.get('/books/day7', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { count, page } = req.body;

  const books = await readManyDocumentsBook_day7(count, page);

  res.json(books);
});

app.get('/books/bypriceRange', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { priceBottom, priceTop } = req.body;

  const books = await readManyDocumentsBooksbypriceRange(priceBottom, priceTop);

  res.json(books);
});

app.get('/books/bysomeFields', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { book_name, book_price, book_genre } = req.body;

  const books = await readManyDocumentsBooksbysomeFields(book_name, book_price, book_genre);

  res.json(books);
});

app.get('/books/byaddFields', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { priceBottom, field_name, field_value } = req.body;

  const book = await readManyDocumentsBooksbyaddFields(priceBottom, field_name, field_value);

  res.json(book);
});

app.get('/books/byGenre', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { book_genre } = req.body;

  const books = await readManyDocumentsBooksbybook_genreMatch(book_genre);

  res.json(books);
});

app.get('/books/sortbyPriceCheapest', async (_, res) => {
  console.log('Selamat datang, wahai list book di response');

  const books = await readManyDocumentsBooksbybook_priceCheapest();

  res.json(books);
});

app.get('/books/concatNameGenre', async (_, res) => {
  console.log('Selamat datang, wahai list book di response');

  const books = await readManyDocumentsBooksbybook_nameConcatbook_genre();

  res.json(books);
});

app.get('/book/bybook_name', async (req, res) => {
  console.log('Selamat datang, wahai book di response');

  const { book_name } = req.body;

  const book = await readOneDocumentBookbybook_name(book_name);

  res.json(book);
});

app.post('/books/addBooks', async (req, res) => {
  console.log('Selamat datang, wahai tambahkan list book di request');

  const { booksList } = req.body;

  const books = await addManyDocumentsBook(booksList);

  res.json(books);
});

app.post('/book/addBook', async (req, res) => {
  console.log('Selamat datang, wahai tambahkan book di request');

  const { _id, book_name, book_price } = req.body;

  const book = await addOneDocumentBook(_id, book_name, book_price);

  res.json(book);
});

app.post('/book/updateBook', async (req, res) => {
  console.log('Selamat datang, wahai update book di request');

  const { book_name, book_name_set, book_price_set } = req.body;

  const book = await updateOneDocumentBook(book_name, book_name_set, book_price_set);

  res.json(book);
});

app.post('/books/deleteBooks', async (_, res) => {
  console.log('Selamat datang, wahai delete books di request');

  const books = await deleteAllDocumentsBook();

  res.json(books);
});

app.post('/books/deleteBooksbyprice', async (req, res) => {
  console.log('Selamat datang, wahai delete books di request');

  const { priceBottom, priceTop } = req.body;

  const books = await deleteManyDocumentsBooksbyprice(priceBottom, priceTop);

  res.json(books);
});

app.post('/book/deleteBook', async (req, res) => {
  console.log('Selamat datang, wahai delete books di request');

  const { book_name } = req.body;

  const book = await deleteOneDocumentBook(book_name);

  res.json(book);
});

/////////////////////////////////////// BOOKSHELF /////////////////////////////////////

app.get('/bookshelves', async (_, res) => {
  console.log('Selamat datang, wahai list bookshelf di response');

  const bookshelves = await readAllDocumentsBookshelf();

  res.json(bookshelves);
});

app.get('/bookshelves/bybooks_id', async (req, res) => {
  console.log('Selamat datang, wahai list bookshelf di response');

  const { books_id } = req.body;

  const bookshelves = await readManyDocumentsBookshelvesbybooks_id(books_id);

  res.json(bookshelves);
});

app.get('/bookshelves/bybooks_idthenUnwindbooks_idthenPopulate', async (req, res) => {
  console.log('Selamat datang, wahai list bookshelf di response');

  const { books_id } = req.body;

  const bookshelves = await readManyDocumentsBookshelvesbybooks_idthenUnwindbooks_idthenPopulate(books_id);

  res.json(bookshelves);
});

app.get('/bookshelves/lookup', async (_, res) => {
  console.log('Selamat datang, wahai list bookshelf di response');

  const bookshelves = await readManyDocumentsBookshelveslookup();

  res.json(bookshelves);
});

app.get('/bookshelf/bybookshelf_id', async (req, res) => {
  console.log('Selamat datang, wahai bookshelf di response');

  const { _id } = req.body;

  const bookshelf = await readOneDocumentBookshelfby_id(_id);

  res.json(bookshelf);
});

app.post('/bookshelves/addbookshelves', async (req, res) => {
  console.log('Selamat datang, wahai tambahkan list bookshelf di request');

  const { bookshelvesList } = req.body;

  const bookshelves = await addManyDocumentsBookshelves(bookshelvesList);

  res.json(bookshelves);
});

app.post('/bookshelf/addbookshelf', async (req, res) => {
  console.log('Selamat datang, wahai tambahkan bookshelf di request');

  const { _id, books_id } = req.body;

  const bookshelf = await addOneDocumentBookshelf(_id, books_id);

  res.json(bookshelf);
});

app.post('/bookshelf/updatebookshelf', async (req, res) => {
  console.log('Selamat datang, wahai update bookshelf di request');

  const { _id, books_id_push, books_id_pull } = req.body;

  if (books_id_pull === undefined) {
    const bookshelf = await updateOneDocumentBookshelfPush(_id, books_id_push, books_id_pull);
    res.json(bookshelf);
  } else if (books_id_push === undefined) {
    const bookshelf = await updateOneDocumentBookshelfPull(_id, books_id_push, books_id_pull);
    res.json(bookshelf);
  } else if (books_id_pull !== undefined && books_id_push !== undefined) {
    let bookshelf = await updateOneDocumentBookshelfPush(_id, books_id_push, books_id_pull);
    const message1 = bookshelf;
    bookshelf = await updateOneDocumentBookshelfPull(_id, books_id_push, books_id_pull);

    res.json({
      push: message1,
      pull: bookshelf,
    });
  }
});

app.post('/bookshelves/deletebookshelves', async (_, res) => {
  console.log('Selamat datang, wahai delete bookshelves di request');

  const bookshelves = await deleteAllDocumentsBookshelves();

  res.json(bookshelves);
});

app.post('/bookshelves/deletebookshelvesbybooks_id', async (req, res) => {
  console.log('Selamat datang, wahai delete bookshelves di request');

  const { books_id } = req.body;

  const bookshelves = await deleteManyDocumentsBookshelvesbybooks_id(books_id);

  res.json(bookshelves);
});

app.post('/bookshelf/deletebookshelf', async (req, res) => {
  console.log('Selamat datang, wahai delete bookshelves di request');

  const { _id } = req.body;

  const bookshelf = await deleteOneDocumentBookshelf(_id);

  res.json(bookshelf);
});

app.get('/test', async (_, res) => {
  console.log('Selamat datang, wahai populate di request');

  const bookshelves_books = Bookshelf.aggregate()
    .lookup({
      from: 'books',
      localField: 'books_id',
      foreignField: '_id',
      as: 'books',
    })
    .exec((error, result) => {
      if (error) {
        console.log('error - ', error);
      } else {
        res.json(result);
      }
    });
});

app.get('/test1', async (_, res) => {
  console.log('Selamat datang, wahai populate di request');

  const bookshelves = await Bookshelf.find({
    books_id: [4],
  });

  res.json(bookshelves);
});

app.get('/test2', async (_, res) => {
  console.log('Selamat datang, wahai populate di request');

  const bookshelves_books = await Bookshelf.find({}).populate('books_id');
  res.json(bookshelves_books);
});

app.listen(3000);
