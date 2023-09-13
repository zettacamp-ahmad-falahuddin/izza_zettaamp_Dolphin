const express = require('express');

const app = express();

const buku = [
  {
    name: 'Pulang',
    price: 50000,
  },

  {
    name: 'Pergi',
    price: 75000,
  },
];

async function purchase(book, purchased, stock, discountPercentage, taxPercentage, termMonths, additionalPrice = 1000) {
  const bookName = book.name;
  const bookPrc = book.price;

  const prcAftDsc = ((100 - discountPercentage) / 100) * bookPrc;
  const prcAftTax = ((100 + taxPercentage) / 100) * prcAftDsc;

  const term = [];

  const currentDate = new Date();

  for (let i = 1; i <= termMonths; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate());
    term.push({
      date: nextMonthDate.toDateString(),
      payment: purchased < stock ? parseInt((1 / termMonths) * purchased * prcAftTax) : parseInt((1 / termMonths) * stock * prcAftTax),
    });
  }

  const payments = term.map((e) => e.payment);
  const sum = payments.reduce((accumulator, currentValue) => accumulator + currentValue);
  const totalPrice = parseInt(purchased < stock ? purchased * prcAftTax : stock * prcAftTax);

  if (sum !== totalPrice) {
    const diff = totalPrice - sum;
    term[1].payment += diff;
  }

  [month1, ...otherMonths] = term;

  copyOfInitialStock = stock;

  stock -= purchased;

  if (stock <= 0) {
    stock = 0;
    console.log('out of stock, cannot be purchased again');
    console.log(`the book ${bookName} price is, ${parseInt(copyOfInitialStock * prcAftTax)}`);
  } else {
    console.log(`the book ${bookName} price is', ${parseInt(purchased * prcAftTax)}`);
    console.log('can be purchased again');
  }

  console.log('stock now:', stock);

  for (let i = 0; i < termMonths; i++) {
    term[i].addtitionalPrice = additionalPrice;
  }

  console.log(`if you would to use credit for ${termMonths} months:`);

  console.log(`the next 1 month due is`, month1);

  console.log(`the next other months due in array is`, otherMonths);

  return term;
}

async function endpoint() {
  for (let i = 0; i < 5; i++) {
    console.log('iterasi', i);
    await (function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    })(2000);
  }
}

app.use(express.json());

app.use((req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader) {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  const auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user == 'admin' && pass == 'password') {
    // If Authorized user
    next();
  } else {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
});

app.get('/', (_, res) => {
  console.log('Selamat datang, wahai list buku ada di response');

  res.json(buku);
});

app.post('/', async (req, res) => {
  const book = req.body.book;
  const purchased = req.body.purchased;
  const stock = req.body.stock;
  const discountPercentage = req.body.discountPercentage;
  const taxPercentage = req.body.taxPercentage;
  const termMonths = req.body.termMonths;
  const additionalPrice = req.body.additionalPrice;
  const dateToPay = req.body.dateToPay;

  const hasil = await purchase(book[0], purchased, stock, discountPercentage, taxPercentage, termMonths, additionalPrice);

  const list_term_amount = [...new Set(hasil.map((e) => e.payment))];

  const list_terms = new Map();
  hasil.map((e) => list_terms.set(e.date, e));

  const date_to_pay = new Date(dateToPay.year, dateToPay.month - 1, dateToPay.date);
  const term_to_pay = list_terms.get(date_to_pay.toDateString());

  const respondObject = {
    list_term_amount: list_term_amount,
    list_terms: Array.from(list_terms.entries()),
    term_to_pay: term_to_pay,
  };

  res.json(respondObject);
});

app.get('/endpoint1', async (req, res) => {
  console.log('Selamat datang, wahai ini adalah endpoint1');

  await endpoint();
  res.send('selamat looping telah selesai');
  console.log('proses selesai');
});

app.get('/endpoint2', (req, res) => {
  console.log('Selamat datang, wahai ini adalah endpoint2');

  endpoint();
  res.send('selamat looping telah selesai');
  console.log('proses selesai');
});

app.listen(3000);
