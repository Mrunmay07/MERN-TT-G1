import crypto from "node:crypto"

const message = "Hello world"

const hashedMessage = crypto.createHash("sha256").update(message).digest("hex")

console.log(hashedMessage)