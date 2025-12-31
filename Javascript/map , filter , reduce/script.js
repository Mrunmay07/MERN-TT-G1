

// ['AKASH' , 'PRATHAM' , 'ANSH]
/* 
// [3 , 4 , 5 ,6 ,7]
const result = numbers.map((num) => {
    return num + 2
})
console.log(result)

const result2 = names.map((name) => {
    return name.toUpperCase()
})
console.log(result2) */



/* // [3 , 4 , 5]
const result = numbers.filter((num) => {
    return num > 2
})
console.log(result)


const names = ['akash' , 'pratham' , 'ansh']

// ['akash' , 'ansh']
const result2 = names.filter((name) => {
    return name.startsWith('a')
})
console.log(result2)
 */


const numbers = [1 , 2 , 3 , 4 ,5]
// 15 

// accumulator
// current


const result = numbers.reduce((acc , curr) => {
    return acc + curr
} , 10)
console.log(result)