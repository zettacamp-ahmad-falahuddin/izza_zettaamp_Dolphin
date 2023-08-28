function purchase(book, purchased, stock, discountPercentage, taxPercentage, termMonths) {
    
    const bookName = book.name;
    // const isTradable = book.isTradable;
    const bookPrc = book.price
    
    const prcAftDsc = (100 - discountPercentage)/100*bookPrc;
    const prcAftTax = (100 + taxPercentage)/100*prcAftDsc;
    
    const term = [];
    
    for (let i = 0; i < termMonths; i++) {
        term.push((1/termMonths));
    }

    const termDate = term.map((e) => parseInt(e*30));

    let termPrc;
    // if (isTradable) {
    //     console.log(`the discount is ${dscPrct}%`);
    //     console.log(`the book "${bookName}" price after discount is ${prctPrcAftDsc}`);
    //     console.log(`the discount is ${taxPrct}%`);
    //     console.log(`the book "${bookName}" price after discount is ${parseInt(prctPrcAftTax)}`);
    // } else {
    //     console.log('book cannot be bought');
    // }

    copyOfInitialStock = stock;
    
    stock -= purchased;
    
    if (stock <= 0) {
        stock = 0;
        termPrc = term.map((e) => parseInt(e*copyOfInitialStock*prcAftTax));
        console.log('out of stock, cannot be purchased again');
        console.log('the book price is', parseInt(copyOfInitialStock*prcAftTax));
    } else {
        termPrc = term.map((e) => parseInt(e*purchased*prcAftTax));
        console.log('the book price is', parseInt(purchased*prcAftTax));
        console.log('can be purchased again');
    }
    
    console.log('stock now:', stock);
    
    console.log(`if you would to use credit for ${termMonths} months:`);

    for (let i = 0; i < termMonths; i++) {
        console.log(`the due for next ${i+1} month is ${termPrc[i]} on ${termDate[i]}`);
    }
}

const pulang = {
    name: "Pulang",
    // isTradable: true,
    price: 50000,
}

purchase(pulang, 10, 6, 5, 10, 4);