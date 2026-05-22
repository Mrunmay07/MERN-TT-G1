/* import product from "./math.js" // 5s 
import {sum , sub} from "./math.js" // 2s 

console.log('Hello ES6 Modules')

console.log(product(4,4))
console.log(sum(2, 2))
console.log(sub(4 , 2)) */


const res = await fetch("https://dummyjson.com/products");
const data = await res.json();
console.log(data);
