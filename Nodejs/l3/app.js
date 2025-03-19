const Emitter = require("./emitter");


const  events = require("./config");
const emtr = new Emitter();

// console.log(events)
emtr.on("greet", function () {
    console.log("greeting done");
});
emtr.on(events.FILEOPENED, function () {
    console.log("file opened");
});
emtr.on(events.FILECLOSE, function () {
    console.log("file closed");
});
emtr.emit(events.FILEOPENED); // This will trigger the event
