

// for of loop
/* for(let fruit of fruits){
    console.log(fruit)
}
 */
// for in loop
/* const users = {
    firstName : 'Pratham',
    lastName : 'Kumar'
}

for(let user in users){
    console.log(users[user])
} */


// Array Method
// forEach() // Higher Order functioin
const fruits = ['apple' , 'mango' , 'banana' , 'orange']

const result = fruits.forEach((fruit , i) => {
    console.log(fruit , i)
    return 'Hello world'
})
console.log(result)
//Array Method
// Higher Order function
// undefined