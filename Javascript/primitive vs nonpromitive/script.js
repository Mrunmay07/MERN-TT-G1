// Primitive

/* let userName1 = 'Akash' // 123
let userName2 = userName1; // 124
userName2 = 'Ansh'
console.log(userName2)
console.log(userName1) */

// Non Primitive
// 123
let user1 = {
    firstName : 'Akash',
    lastName : 'Singh'
}
//123
let user2 = user1; 
user2.firstName = 'Ansh'
console.log(user2)
console.log(user1)