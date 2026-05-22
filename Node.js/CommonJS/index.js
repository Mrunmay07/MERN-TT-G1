/* const sum = require('./sum.js')  
const product = require('./product') 


console.log('Hello CommonJS')
console.log(sum(3 , 4))
console.log(product(3 , 3))

 */

const res = await fetch("https://dummyjson.com/products");
const data = await res.json();
console.log(data);


