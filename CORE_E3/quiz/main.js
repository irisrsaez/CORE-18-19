//Carga los modulos indicados
const readline = require('readline');
const {log,biglog,errorlog,colorize} = require ("./out");
const model = require ('./model');
const cmds = require ("./cmds");

//MENSAJE INICIAL
biglog('CORE Quiz','green');

//Configuro readline
const rl = readline.createInterface({
  //Leo del teclado
  input: process.stdin,
  //Saco por la pantalla
  output: process.stdout,
  //prompt será el indicador de que estoy dentro
  prompt: colorize("quiz> ",'blue'),
  completer: (line) => {
  const completions = 'h help add credits show p play list edit q quit'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  // show all completions if none found
  return [hits.length ? hits : completions, line];
}
});

rl.prompt();
//Cuando me llegue una linea
rl.on('line', (line) => {

  //parto el comando por los espacios
  let args = line.split(" ");
  //cojo la primera palabra
  //toLowerCase lo pongo en minus y trin quita los blancos
  let cmd = args[0].toLowerCase().trim();

  switch (cmd) {
    case'':
      rl.prompt();
      break;
    //Si pone hello en la linea saco world
    case 'h':
    case 'help':
      cmds.helpCmd(rl);
      break;

    case 'list':
      cmds.listCmd(rl);
      break;
    case 'show':
      cmds.showCmd(rl,args[1]);
      break;
    case 'add':
      cmds.addCmd(rl);
      break;
    case 'delete':
      cmds.deleteCmd(rl,args[1]);
      break;
    case 'edit':
      cmds.editCmd(rl,args[1]);
      break;
    case 'test':
      cmds.testCmd(rl,args[1]);
      break;
    case 'p':
    case 'play':
      cmds.playCmd(rl);
      break;
    case 'credits':
      cmds.creditsCmd(rl);
      break;
    case 'q':
    case 'quit':
      cmds.quitCmd(rl);
      break;
    //Sino saco SAY WHAT???
    default:
      console.log(`Comando desconocido'${colorize(cmd,'red')}'`);
      console.log(`Usa ${colorize('help','green')} para ver los comandos disponibles`);
      rl.prompt();
      break;
  }
  //Acabo programa
}).on('close', () => {
  log('Final partida');
  process.exit(0);
});
