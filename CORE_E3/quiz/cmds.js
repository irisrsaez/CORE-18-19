const {log,biglog,errorlog,colorize} = require ("./out");
const model = require ('./model');

//FUNCIONES INTERNAS DE CADA OPCION
//Muestra la ayuda
exports.helpCmd = rl => {
  log("Comandos:");
  log("h|help - Muestra esta ayuda.");
  log("list - Listar los quizzes existentes.");
  log("show <id> - Muestra la pregunta y la respuesta	el quiz	indicado.");
  log("add - Añadir un nuevo	quiz interactivamente.");
  log("delete	<id> - Borrar	el quiz	indicado.");
  log("edit	<id> -	Editar el quiz indicado.");
  log("test	<id> - Probar	el quiz	indicado.");
  log("p|play	-	Jugar	a	preguntar	aleatoriamente todos los quizzes.");
  log("credits - Créditos.");
  log("q|quit	-	Salir	del	programa.");
    rl.prompt();
};
/*
*Hace una lista de todos los quizzes existentes del modelo
*/
exports.listCmd = rl => {
  //log('Listar los quizzes existentes.','red');
  model.getAll().forEach((quiz,id) => {
    log(`  [${colorize(id,'magenta')}]: ${quiz.question}`);
  });
  rl.prompt();
};
/**
*Hace una lista de todos los quizzes existentes del modelo
*
*@param  id clave del quiz a mostrar
*/
exports.showCmd =(rl, id) => {
  //log('Muestra	la	pregunta	y	la	respuesta	el	quiz	indicado.','red');
  if (typeof id === "undefined"){
    errorlog(`Falta el parametro id`);
  }else{
    try{
      const quiz = model.getByIndex(id);
      log(`  [${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
    }catch(error){
      errorlog(error.message);
    }
  }
  rl.prompt();
};
/*
*Añade un nuevo quiz al modelo
*Pregunta iterativamente por la pregunta y la respuesta
*/
exports.addCmd = rl => {
  //log('Añadir un nuevo quiz.','red');
  rl.question(colorize('Introduzca pregunta: ', 'red'), question => {
    rl.question(colorize('Introduzca respuesta: ', 'red'), answer => {
        model.add(question,answer);
        log(`${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
        rl.prompt();
    });
  });
};
/**
*Borra quizzes
*
*@param  id clave del quiz a eliminar
*/
exports.deleteCmd = (rl,id) => {
  //log('Borrar el quiz indicado','red');
  if (typeof id === "undefined"){
    errorlog(`Falta el parametro id`);
  }else{
    try{
      model.deleteByIndex(id);
    }catch(error){
      errorlog(error.message);
    }
  }
  rl.prompt();
};
/**
*Editado quizzes
*@param rl objeto readline para implementar el CLI
*@param  id clave del quiz a editar
*/
exports.editCmd = (rl,id) => {
  //log('Editar el quiz indicado','red');
  if (typeof id === "undefined"){
    errorlog(`Falta el parametro id`);
    rl.prompt();
  }else{
    try{
      //Creo las constante quiz
      const quiz = model.getByIndex(id);

      process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);
      rl.question(colorize('Introduzca pregunta: ', 'red'), question => {
        process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);
        rl.question(colorize('Introduzca respuesta: ', 'red'), answer => {
            model.update(id,question,answer);
            log(`Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>','magenta')} ${answer}`);
            rl.prompt();
        });
      });
    }catch(error){
      errorlog(error.message);
      rl.prompt();
    }
  }
};
/**
*Probar el quizz
*@param rl
*@param  id clave del quiz a probar
*/
exports.testCmd = (rl,id) => {
  //log('Probar el quiz indicado','red');
  if (typeof id=== "undefined"){
		errorlog(`Falta el parametro id`);
	}else{
		try{
			const quiz =model.getByIndex(id);
			rl.question(colorize(quiz.question.toString() +'=>','red'), respuesta =>{
				if(quiz.answer.toLowerCase().trim() === respuesta.toLowerCase().trim()){
					log('Su respuesta es correcta');
					biglog('Correcta', 'green');
					rl.prompt();
				}else{
					log('Su respuesta es incorrecta');
					biglog('Incorrecta', 'red');
					rl.prompt();
				}
			});
		}catch(error)  {
			errorlog(error.message);

		}
	}
	rl.prompt();
};

/**
*Empezamos a jugar
*/
exports.playCmd = rl => {
  //log('Jugar.','red');
  let score = 0;
	let toBeAsked=[];
	let i=0;
	//meter los ids de todas las preguntas que tengo
	for (i; i< model.count(); i++)
		toBeAsked[i]=i;

	const playOne=()=>{
		if(toBeAsked.length==0){
			log(`No hay nada mas que preguntar`);
			log(`Tu resultado ha sido:`);
			biglog(score ,'magenta');
			rl.prompt();
		}else{
			let id=  Math.floor((Math.random()*toBeAsked.length));
			if(id >=0){
				try{
					//cogemos ese quiz pregunta + respuesta
					let quiz =model.getByIndex(toBeAsked[id]);
					//borramos ese id del array
					toBeAsked.splice(id,1);
					rl.question(colorize(quiz.question.toString() +'=>','red'), resultado=>{
					if(resultado.toLowerCase().trim() === quiz.answer.toLowerCase().trim()){
						score++;
						log(`Correcto - Llevas ${score} aciertos`);
						playOne();
					}else{
						log(`INCORRECTO`);
						log(`Fin del examen, Aciertos:`);
						biglog(score, 'magenta');
						rl.prompt();
				    }
				    });
				}catch(error){
					errorlog(error.message);
					rl.prompt();
				}
			}
		}
	};
	playOne();
};
/**
*Muestra los creditos del quizz
*/
exports.creditsCmd = rl => {
  console.log("Autor:");
  console.log("Iris Rubio Saez");
  rl.prompt();
};
/**
*Salimos finalmente del quizz
*/
exports.quitCmd = rl => {
  rl.close();
};
