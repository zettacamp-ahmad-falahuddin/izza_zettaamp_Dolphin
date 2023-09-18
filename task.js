const mongoose = require('mongoose');
const express = require('express');

const {
  readAllDocumentsBook,
  readManyDocumentsBooksbypriceRange,
  readOneDocumentBookbybook_name,
  addManyDocumentsBook,
  addOneDocumentBook,
  updateOneDocumentBook,
  deleteAllDocumentsBook,
  deleteManyDocumentsBooksbyprice,
  deleteOneDocumentBook,
} = require('./bookFunction/bookMongo.function');

const Book = require('./models/Book.model');

const app = express();

const booksList = [
  {
    _id: 1,
    book_name: 'Filosofi Teras',
    book_price: 50000,
  },
  {
    _id: 2,
    book_name: 'Atomic Habits',
    book_price: 60000,
  },
  {
    _id: 3,
    book_name: 'Pulang',
    book_price: 65000,
  },
  {
    _id: 4,
    book_name: 'Pergi',
    book_price: 100000,
  },
  {
    _id: 5,
    book_name: 'Komet',
    book_price: 90000,
  },
  {
    _id: 6,
    book_name: 'Prisoner of Azkaban',
    book_price: 95000,
  },
  {
    _id: 7,
    book_name: 'Chamber of Secrets',
    book_price: 75000,
  },
  {
    _id: 8,
    book_name: '1001 Malam',
    book_price: 85000,
  },
  {
    _id: 9,
    book_name: 'The Wall',
    book_price: 80000,
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
        // await Book.insertMany(booksList);
      } catch (error) {
        return error.message;
      }
      console.log('Berhasil terkoneksi mongodb');
    })
    .catch((err) => console.log(err.message));
}

connectMongoDB();

app.use(express.json());

///////////////////////////////////////// BOOK /////////////////////////////////////

app.get('/books', async (_, res) => {
  console.log('Selamat datang, wahai list book di response');

  const books = await readAllDocumentsBook();

  res.json(books);
});

app.get('/books/bypriceRange', async (req, res) => {
  console.log('Selamat datang, wahai list book di response');

  const { priceBottom, priceTop } = req.body;

  const books = await readManyDocumentsBooksbypriceRange(priceBottom, priceTop);

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

app.get('/test', async (_, res) => {
  console.log('Selamat datang, wahai populate di request');

  const users_books = User.aggregate()
    .lookup({
      from: 'books',
      localField: 'favourite_books_id',
      foreignField: '_id',
      as: 'favourite_books',
    })
    .exec((error, result) => {
      if (error) {
        console.log('error - ', error);
      } else {
        res.json(result);
      }
    });
});

app.listen(3000);

// const {
//   readAllDocumentsUser,
//   readManyDocumentsUsersbyfavourite_books_id,
//   readOneDocumentUserbyuser_name,
//   addManyDocumentsUser,
//   addOneDocumentUser,
//   updateOneDocumentUser,
//   deleteAllDocumentsUser,
//   deleteManyDocumentsUsersbyfavourite_books_id,
//   deleteOneDocumentUser,
// } = require('./userFunction/userMongo.function');

// const User = require('./models/User.model');

// const usersList = [
//   {
//     user_name: 'Izza',
//     favourite_books_id: [1, 4, 7, 9],
//   },
//   {
//     user_name: 'Bayu',
//     favourite_books_id: [2, 3],
//   },
//   {
//     user_name: 'Edo',
//     favourite_books_id: [4, 5, 9],
//   },
//   {
//     user_name: 'Daffa',
//     favourite_books_id: [6, 8],
//   },
// ];

///////////////////////////////////////// USER /////////////////////////////////////

// app.get('/', async (_, res) => {
//   console.log('Selamat datang, wahai list user dan buku di response');

//   const users_and_books = {
//     users: usersList,
//     books: booksList,
//   };

//   res.json(users_and_books);
// });

// app.get('/users', async (_, res) => {
//   console.log('Selamat datang, wahai list user di response');

//   const users = await readAllDocumentsUser();

//   res.json(users);
// });

// app.get('/users/byfavourite_books_id', async (req, res) => {
//   console.log('Selamat datang, wahai list user di response');

//   const { favourite_books_id } = req.body;

//   const users = await readManyDocumentsUsersbyfavourite_books_id(favourite_books_id);

//   res.json(users);
// });

// app.get('/user/byuser_name', async (req, res) => {
//   console.log('Selamat datang, wahai user di response');

//   const { user_name } = req.body;

//   const user = await readOneDocumentUserbyuser_name(user_name);

//   res.json(user);
// });

// app.post('/users/addUsers', async (req, res) => {
//   console.log('Selamat datang, wahai tambahkan list user di request');

//   const { usersList } = req.body;

//   const users = await addManyDocumentsUser(usersList);

//   res.json(users);
// });

// app.post('/user/addUser', async (req, res) => {
//   console.log('Selamat datang, wahai tambahkan user di request');

//   const { user_name, favourite_books_id } = req.body;

//   const user = await addOneDocumentUser(user_name, favourite_books_id);

//   res.json(user);
// });

// app.post('/user/updateUser', async (req, res) => {
//   console.log('Selamat datang, wahai update user di request');

//   const { user_name, user_name_set, favourite_books_id_set } = req.body;

//   const user = await updateOneDocumentUser(user_name, user_name_set, favourite_books_id_set);

//   res.json(user);
// });

// app.post('/users/deleteUsers', async (_, res) => {
//   console.log('Selamat datang, wahai delete users di request');

//   const users = await deleteAllDocumentsUser();

//   res.json(users);
// });

// app.post('/users/deleteUsersbyfavourite_books_id', async (req, res) => {
//   console.log('Selamat datang, wahai delete users di request');

//   const { favourite_books_id } = req.body;

//   const users = await deleteManyDocumentsUsersbyfavourite_books_id(favourite_books_id);

//   res.json(users);
// });

// app.post('/user/deleteUser', async (req, res) => {
//   console.log('Selamat datang, wahai delete users di request');

//   const { user_name } = req.body;

//   const user = await deleteOneDocumentUser(user_name);

//   res.json(user);
// });
