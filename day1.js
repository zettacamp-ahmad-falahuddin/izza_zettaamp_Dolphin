//1
let book = "Pulang";
const update = 2;

book = "Pergi";
console.log('book', book);
// update = 5;
// console.log('update', update);


//2
let another = book + update;
console.log('another', another);

another = true + 7.56 + book + update;
console.log('another', another);

another = book + true + 7.56 + update;
console.log('another', another);

another = true + 7.56 + update;
console.log('another', another);

another = true + 7.56 + update + book;
console.log('another', another);

another = update + book + true + 7.56;
console.log('another', another);


//*
a = 7.6;
console.log('a', a);

a = true;
console.log('a', a);

let nama;
// const ra; //ga bisa deklarasi

//**
let arr = [3.6,2,'hello',7];
console.log('arr', arr);

let cls = {
    number : 3,
    name: 'hello',
    point: 5.6,
}
console.log('cls', cls);