class EventEmitter {
    constructor() {
        // This will store event names as keys and arrays of listeners as values
        this.events = {};
    }

    
    // Registers a listener for a specific event
    
    on(event, listener) {
        // If the event doesn't exist, initialize it with an empty array
        if (!this.events[event]) {
            this.events[event] = [];
        }
        // Add the listener function to the event's array
        this.events[event].push(listener);
    }

    
    // Emits an event, triggering all the listeners for that event
    
    emit(event, ...args) {
        // Check if the event has any listeners registered
        if (this.events[event]) {
            // Call each listener function and pass the arguments to it
            this.events[event].forEach(listener => listener(...args));
        }
        else{
            console.log(`No listeners for event ${event}`);
        }
    }

    
    // Removes a specific listener for an event
    
    off(event, listener) {
        // If the event exists, filter out the listener to remove it
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(
                registeredListener => registeredListener !== listener
            );
        }
    }
}

const emitter = new EventEmitter();

// Create a listener function
const greet = (name,age) => console.log(`Hello, ${name}, age ${age}`);
// const greet2 = (name,age) => console.log(`New Hello, ${name}, age ${age}`);

emitter.on('greet', greet);
// emitter.on('greet', greet2);

emitter.emit('greet', 'Alice',23); 

emitter.off('greet', greet);

emitter.emit('greet', 'Bob'); 