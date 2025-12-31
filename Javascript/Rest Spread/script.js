/* const user1 = {
    firstName : 'Pratham'
} // 123
const user2 = {...user1} // 124
user2.firstName = 'Ansh'
console.log(user1)
 */
/* const arr1 = [1 , 2 , 3 ,4] // 123
const arr2 = [...arr1] // 124 */

//c = [30 , 40]
function sum(a , b , ...c){
    let total = a + b 
    for(let val of c){
        total+= val
    }
    return total
}

const result = sum(10 , 20 , 30 , 40)
console.log(result)