import bcrypt from "bcrypt"

// register
const password = "12345"

const salt = await bcrypt.genSalt(10)

const storedPassword = await bcrypt.hash(password , salt)
// $2b$10$HeVpS3oJbaucRHL7hq77xO7ateMwoM7mpaf1i4T9yzyiwgBJZy4I.


// login 
// email , password -> 12345
const enteredPassword = "12345"

console.log(await bcrypt.compare(enteredPassword , storedPassword))