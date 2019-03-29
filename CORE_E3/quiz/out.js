const figlet = require ('figlet');
const chalk = require ('chalk');
//FUNCIONES DE EDITAR TEXTO Y COLOR
/**
*-Dar color a un string
*
*@param msg el mensaje que queremos escribir
*@param color color del mensaje
*@return {string} devuelve el string con el mensaje y color indicados
*/
const colorize = (msg, color) =>{
  if(typeof color !== "undefined"){
    msg = chalk[color].bold(msg);
  }
  return msg;
};

/**
*Escribe mensaje del log
*
*@param msg el mensaje que queremos escribir
*@param color color del mensaje
*/
const log = (msg,color) => {
  console.log(colorize(msg,color));
};

/**
*Escribe mensaje del log EN GRANDE
*
*@param msg el mensaje que queremos escribir
*@param color color del mensaje
*/
const biglog = (msg,color) => {
  log(figlet.textSync(msg,{horizontalLayout:'full'}),color);
};
/**
*Escribe mensaje de error emsg
*
*@param emsg texto del mensaje de error
*/
const errorlog = (emsg) => {
  console.log(`${colorize("Error","red")}: ${colorize(colorize(emsg,"red"), "bgYellowBright")}`);
};

exports = module.exports = {
  colorize,
  log,
  biglog,
  errorlog
};
