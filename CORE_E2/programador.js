// Clase Programador. permita configurar la temperatura que se desea tener en la habitación en todo momento.
//Importa modulo events
const EventEmitter = require("./events");
//Importar modulo Later.js
const later = require('later');
// Usar zona horaria local:
later.date.localTime();

class Programador extends EventEmitter {

  constructor(c) {
    super();
    this.programador=c;
    var i=0;
    for(i; i<this.c.length; i++){
      if(later.date.localTime() == this.c[i].hora){
        this.emit('ideal', this.c.temperatura)
      }
    }
  }
}
exports = module.exports = Programador;
