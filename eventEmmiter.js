const EventEmmitter = require('events');

const customEmitter = new EventEmmitter();

customEmitter.on('response', (name, age) => {
    console.log(`data received for user: ${name} with age: ${age}`); 
})

customEmitter.on('response', () => {
    console.log("some other logic here"); 
})

customEmitter.emit('response', 'Tarun', 23);