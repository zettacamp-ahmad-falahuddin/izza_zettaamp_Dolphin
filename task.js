function purchase(purchased, book, stock, discountPercentage, taxPercentage, termMonths) {
    
    const bookName = book.name;
    console.log('bookName', bookName);
    const bookPrc = book.price
    
    const prcAftDsc = (100 - discountPercentage)/100*bookPrc;
    const prcAftTax = (100 + taxPercentage)/100*prcAftDsc;
    
    const term = [];
    
    for (let i = 0; i < termMonths; i++) {
        term.push({
            date: (i+1 > 1) ? `on ${i+1} next ${i+1} months` : `on ${i+1} next ${i+1} month`,
            payment: (purchased < stock) 
                ? parseInt((1/termMonths)*purchased*prcAftTax) 
                : parseInt((1/termMonths)*stock*prcAftTax),
        });
    }

    [month1, ...otherMonths] = term

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
    
    console.log(`${bookName} stock now:, ${stock}`);

    console.log(`if you would to use credit for ${termMonths} months:`);

    console.log(`the next 1 month due is`, month1);

    console.log(`the next other months due in array is`, otherMonths);
}

const buku = [
    
    {
        name: "Pulang",
        price: 50000,
    },

    {
        name: "Pergi",
        price: 75000,
    },

]

purchase(10, buku[0], 6, 5, 10, 13);