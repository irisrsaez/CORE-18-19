//CLASE MODEL

const fs = require ("fs");
//Nombre del fichero donde se guardan las preguntas
//Es un fichero de texto con el JSON de quizzes
const DB_FILENAME = "quizzes.json";
//Array de preguntas y respuestas
/**
*Modelo de datos
*En esta variable se mantienen todos los quizzes existentes
*Es un array de objetos donde cada objeto tiene los atributos question
*y answer para guardar el texto de la pregunta y el de la respuesta

*Al arrancar la aplicacion esta variable ontiene estas 4 preguntas
*pero al final del modulo se llama a load() para cargar lass preguntas guardadas
*/
let quizzes = [
    {	"question":	"Capital	de	Italia",
				"answer":	"Roma"
		},
		{	"question":	"Capital	de	Francia",
			"answer":	"París"
		},
		{	"question":	"Capital	de	España",
				"answer":	"Madrid"
		},
		{	"question":	"Capital	de	Portugal",
				"answer":	"Lisboa"
		}
    ];

/**
*Carga las preguntas guardadas en el fichero
*Este metodo cara el contenido del fichero DB_FILENAME en la variable
*quizzes. El contenido de ese dichero esta en formato JSON.
*la primera vez que se ejecute este metodo, en el fichero DB_FILENAME no
*existe y se producira el error ENOENT. En este caso se salva el
*contenido inicial almacenado en quizzes.
*si se produce otro tipo de error, se lanza una excepcion que abordara
*la ejeccucion del programa
*/
const load = () => {
  fs.readFile(DB_FILENAME, (err,data) => {
    if(err){
      if(err.code === "ENOENT") {
        save();
        return;
      }
      throw err;
    }
    let json = JSON.parse(data);
    if(json){
      quizzes = json;
    }
  });
};

/**
*Guarda las preguntas en el fichero
*
*Guarda en formato JSON el valor de quizzes en el fichero DB_FILENAME
*Si se produce algun tipo de error, se lanza una excepcion que abordara
*la ejeccucion del programa
*/
const save = () =>{
   fs.writeFile(DB_FILENAME,
     JSON.stringify(quizzes),
   err => {
     if(err) throw err;
   });
};

/**
*Devuelve el numero total de preguntas existentes
*
*@returns {number} numero total de preguntas existentes
*/
exports.count = () => quizzes.length;

/**
*Añade un nuevo quizz
*
*@param question String con la pregunta
*@param answer String con la respuesta
*/
exports.add = (question, answer) => {
  quizzes.push({
    question: (question || "").trim(),
    answer: (answer || "").trim()
    });
    save();
};

/**
*Actualiza el quiz situado en la posicion index
*
*@param id clave que identifica el quiz a actualizar
*@param question string con la pregunta
*@param answer string con la respuesta
*/
exports.update = (id,question,answer) => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined"){
    throw new Error(`El valor del parámetro id no es válido.`);
  }
  quizzes.splice(id, 1, {
    question: (question || "").trim(),
    answer: (answer || "").trim()
  });
  save();
};
/**
*Devuelve todos los quizzes existentes
*
*Devuelve un clon del valor guardado en la variable quizzes
*un objeto nuevo con todas las preguntas existentes
*para clonar quizzes se usa stringify + parse
*@retuns {any}
*/
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

/**
*Devuelve un clon del quiz almacenado en la posicion dada
*
*@param id clave que identifica el quiz a devolver
*
*@returns {question,answer} devuelve el objeto quiz de la posicion dada
*/

exports.getByIndex = id => {
  const quiz = quizzes[id];
  if(typeof quiz === "undefined"){
    throw new Error(`El valor del parametro id no es valido`);
  }
  return JSON.parse(JSON.stringify(quiz));
  save();
};


/**
*Elimina el quiz situado en la posicion dada
*
*@param id clabe que indetifica el quiz a Borrar
*/
exports.deleteByIndex = id => {
  const quiz = quizzes[id];
  if(typeof quiz === "undefined"){
    throw new Error(`El valor del parametro id no es valido`);
  }
  quizzes.splice(id,1);
  save();
};

load();
