function purchase(book, purchased, stock, discountPercentage, taxPercentage) {
    
    const bookName = book.name;
    // const isTradable = book.isTradable;
    const bookPrc = book.price
    
    const prcAftDsc = (100 - discountPercentage)/100*bookPrc;
    const prcAftTax = (100 + taxPercentage)/100*prcAftDsc;
    
    // if (isTradable) {
    //     console.log(`the discount is ${dscPrct}%`);
    //     console.log(`the book "${bookName}" price after discount is ${prctPrcAftDsc}`);
    //     console.log(`the discount is ${taxPrct}%`);
    //     console.log(`the book "${bookName}" price after discount is ${parseInt(prctPrcAftTax)}`);
    // } else {
    //     console.log('book cannot be bought');
    // }

    for (let i = 1; i <= purchased; i++) {
        stock -= 1;
        if (stock === 0) {
            console.log('out of stock, cannot be purchased again');
            console.log('the book price is', parseInt(i*prcAftTax));
            break;
        }
    }
    
    if (stock > 0) {
        console.log('the book price is', parseInt(purchased*prcAftTax));
        console.log('can be purchased again');
    }

    console.log('stock now:', stock);
}

const pulang = {
    name: "Pulang",
    // isTradable: true,
    price: 50000,
}

purchase(pulang, 11, 10, 5, 10);