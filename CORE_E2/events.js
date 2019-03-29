//Clase  EventEmitter: Sustituye al modulo events de Node.js
const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');
const Programador = require('./programador');

 class EventEmitter{

   on(NombreEvento, accion ) {
     return accion;
   }

   emit(NombreEvento,temperatura='no hay'){
     console.log(NombreEvento);
     console.log(temperatura);
   }
 }
exports = module.exports = EventEmitter;
