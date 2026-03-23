// Promises are objects that tells the eventual completion or failure of any asynchronous task

const p  = new Promise((resolve , reject) => {
    resolve('hello')
})

p.then((data) => {
    return data.toUpperCase();
})
.then((data2) => {
    console.log(data2)
})
.catch(() => {
    console.log('Promise rejected')
})

console.log(p)

const user = {
    firstName : 'Ansh'

}
