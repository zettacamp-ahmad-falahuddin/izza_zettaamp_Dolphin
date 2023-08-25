function purchase(book, discountPercentage, taxPercentage) {
    
    const bookName = book.name;
    const isTradable = book.isTradable;
    const bookPrc = book.price
    
    const prcAftDsc = (100 - discountPercentage)/100*bookPrc;
    const prcAftTax = (100 + taxPercentage)/100*prcAftDsc;
    
    if (isTradable) {
        console.log(`the discount is ${discountPercentage}%`);
        console.log(`the book "${bookName}" price after discount is ${prcAftDsc}`);
        console.log(`the tax is ${taxPercentage}%`);
        console.log(`the book "${bookName}" price after tax is ${parseInt(prcAftTax)}`);
    } else {
        console.log('book cannot be bought');
    }
}

const pulang = {
    name: "Pulang",
    isTradable: true,
    price: 50000,
}

purchase(pulang, 10, 10);