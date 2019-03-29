
const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');
const Programador = require('./programador');
// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

//Crear array de 4 objetos con dos claves (hora,temperatura)
const configuracion = [{'hora':"7:00",'temperatura':22},
{'hora':"08:30",'temperatura':18},
{'hora':"18:00",'temperatura':22},
{'hora':"23:00",'temperatura':20}];

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);
// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);
//Creamos un programador que tiene la configuracion de hora y temperatura
const programador = new Programador(configuracion);

// Configuramos el termostato para controlar la temperatura:
termostato.on('muchofrio', () => climatizador.calentar());
termostato.on('muchocalor', () => climatizador.enfriar());

// Mostar la temperatura periodicamente:
termostato.on('tic', (temp) => console.log(`${temp.toFixed(1)}ºC`));

// Configurar la temp ideal a 20 grados:
termostato.indicarTemperaturaIdeal(20);

// Encender el termostato:
termostato.encender();
