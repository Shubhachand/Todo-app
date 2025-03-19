const odi = require("./greetings.json");

console.log(odi);
function greet(){
    console.log('Hello, World!');
    return "madarboad";
}
const lol = greet();
console.log(lol);
module.exports = greet;