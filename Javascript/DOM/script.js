const card = document.querySelector('.card')
const button = document.querySelector('button')
const container = document.querySelector('.container')


// Event Listeners
let count = 1

button.addEventListener('click' , () => {
    count++;
   /*  card.classList.toggle('active') */
   const clonedCard = card.cloneNode(true)
   clonedCard.innerText = count
   container.appendChild(clonedCard)
   console.log(clonedCard)

})