const book1_prc = 500000;
const book2_prc = 510000;

(book1_prc > book2_prc) 
? console.log('buku1 lebih mahal') 
: console.log('buku 2 lebih mahal');

avg = (book1_prc + book2_prc)/2;
console.log('avg', avg);

(avg > 500000) 
? console.log('Expensive') 
: console.log('Cheap');