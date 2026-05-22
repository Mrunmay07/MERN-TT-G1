import EventEmmiter from "node:events"

// EventEmmitter
const emitter = new EventEmmiter() //Object
console.log(emitter)

emitter.on('hello' , () => {
    console.log('Event 1 emitted')
})

// EventListener // Event Handler
emitter.on('hello' , () => {
    console.log('Event 2 emitted')
})

emitter.on('random' , () => {
    console.log('Random called')
})

emitter.emit('hello') // EventEmitter
emitter.emit('random')

console.log('Hello')
