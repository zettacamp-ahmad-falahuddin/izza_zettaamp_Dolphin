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

async function purchase(purchased, book, stock, discountPercentage, taxPercentage, termMonths, additionalPrice = 1000) {
  const bookName = book.name;
  const bookPrc = book.price;

  const prcAftDsc = ((100 - discountPercentage) / 100) * bookPrc;
  const prcAftTax = ((100 + taxPercentage) / 100) * prcAftDsc;

  const term = [];

  for (let i = 0; i < termMonths; i++) {
    term.push({
      date: i + 1 > 1 ? `on ${i + 1} next ${i + 1} months` : `on ${i + 1} next ${i + 1} month`,
      payment: purchased < stock ? parseInt((1 / termMonths) * purchased * prcAftTax) : parseInt((1 / termMonths) * stock * prcAftTax),
    });
  }

  [month1, ...otherMonths] = term;

  copyOfInitialStock = stock;

  stock -= purchased;

  if (stock <= 0) {
    stock = 0;
    console.log('out of stock, cannot be purchased again');
    console.log(`the book ${bookName} price is, ${parseInt(copyOfInitialStock * prcAftTax)}`);
  } else {
    console.log(`the book ${bookName} price is', parseInt(purchased * prcAftTax)`);
    console.log('can be purchased again');
  }

  console.log('stock now:', stock);

  console.log('due to policy we add additional price when using credit, please wait for the calculations...');

  for (let i = 0; i < termMonths; i++) {
    term[i].addtitionalPrice = additionalPrice;
  }

  // await (function (ms) {
  //   return new Promise((res) => setTimeout(res, ms));
  // })(2000);

  console.log(`if you would to use credit for ${termMonths} months:`);

  console.log(`the next 1 month due is`, month1);

  console.log(`the next other months due in array is`, otherMonths);

  return term;
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
  const purchased = req.body.purchased;
  const book = req.body.book;
  const stock = req.body.stock;
  const discountPercentage = req.body.discountPercentage;
  const taxPercentage = req.body.taxPercentage;
  const termMonths = req.body.termMonths;
  const additionalPrice = req.body.additionalPrice;

  const hasil = await purchase(purchased, book[0], stock, discountPercentage, taxPercentage, termMonths, additionalPrice);
  
  res.json(hasil);
  
  // hasil.then((response) => res.json(response));
});

app.listen(3000);
