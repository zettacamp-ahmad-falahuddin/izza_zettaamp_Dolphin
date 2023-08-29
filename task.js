function purchase(book, purchased, stock, discountPercentage, taxPercentage, termMonths) {
    
    const bookName = book.name;
    // const isTradable = book.isTradable;
    const bookPrc = book.price
    
    const prcAftDsc = (100 - discountPercentage)/100*bookPrc;
    const prcAftTax = (100 + taxPercentage)/100*prcAftDsc;
    
    const term = [];
    
    for (let i = 0; i < termMonths; i++) {
        term.push({
            date: (i+1 > 1) ? `on ${i+1} next ${i+1} months` : `on ${i+1} next ${i+1} month`,
            payment: (purchased < stock) ? parseInt((1/termMonths)*purchased*prcAftTax) : parseInt((1/termMonths)*stock*prcAftTax),
        });
    }

    [month1, ...otherMonths] = term
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
        console.log('out of stock, cannot be purchased again');
        console.log('the book price is', parseInt(copyOfInitialStock*prcAftTax));
    } else {
        console.log('the book price is', parseInt(purchased*prcAftTax));
        console.log('can be purchased again');
    }
    
    console.log('stock now:', stock);

    console.log(`if you would to use credit for ${termMonths} months:`);

    console.log(`the next 1 month due is`, month1);

    console.log(`the next other months due in array is`, otherMonths);
    // for (let i = 1; i < termMonths; i++) {
    //     console.log(`the due for next ${i} month is ${term[i]}`);
    // }

    // console.log('the credit due in array is', termPrc);
}

const buku = [
    
    {
        name: "Pulang",
        // isTradable: true,
        price: 50000,
    },

    {
        name: "Pergi",
        // isTradable: true,
        price: 75000,
    },

]

purchase(buku[0], 10, 6, 5, 10, 13);