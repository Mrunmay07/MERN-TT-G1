// JS -> single threaded language
// Asynchronous code
// setTimeout
/* setTimeout(() => {
    console.log('hello 1')
} , 3000)

// Synchronous JS
console.log('Hello 3')


setTimeout(() => {
    console.log('hello 2')
} , 2000) */

// setInterval

const timerId = setInterval(() => {
    console.log('hello world')
} , 3000)
console.log(timerId)

// clearTimeout(timerId)