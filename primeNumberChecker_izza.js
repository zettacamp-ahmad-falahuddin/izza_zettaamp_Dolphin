/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */
function isPrime(n) {
    if (n === 1) {
        return false;
    }

    canDivideCounter = 0;

    for (let i = 2; i < Math.sqrt(n)+1; i++) {
        if (n%i == 0) {
            canDivideCounter = 1;
            break;
        }
    }

    if (canDivideCounter === 0) {
        return true;
    } else {
        return false;
    }
  }
  
  console.log(isPrime(11));
  console.log(isPrime(47));