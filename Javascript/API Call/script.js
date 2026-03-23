const api = fetch('https://dummyjson.com/products/2')
api.then((data) => {
   return data.json()
})
.then((data2) => {
    console.log(data2)
})