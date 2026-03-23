const container = document.querySelector(".container");

fetch("https://dummyjson.com/products")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const products = data.products;
    console.log(products)
    products.forEach((product) => {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.innerHTML = `
             <img src=${product.images[0]} alt="">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <b>Rating : ${product.rating}</b>
            <button>Add to Card</button>
        `;
      container.appendChild(newCard);
    });
  });
