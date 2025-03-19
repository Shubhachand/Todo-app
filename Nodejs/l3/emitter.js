function Emitter(){
    this.events = {};
}

Emitter.prototype.on = function(type, cb){    
this.events[type] = this.events[type] || [];
this.events[type].push(cb);
}

Emitter.prototype.emit = function(type){
    if(this.events[type]){
       this.events[type].forEach(listner => {
        listner();
       });
    }
}
module.exports = Emitter;