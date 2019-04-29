# Comprobador Automático CORE19-07_quiz_mvc_server

Recuerde que para utilizar el validador se debe tener node.js (y npm) (https://nodejs.org/es/) y Git
instalados. El proyecto se descarga e instala en el ordenador local con estos comandos:

```
$                                 ## El proyecto debe clonarse en el ordenador local 
$ git clone https://github.com/practicas-ging/CORE19-07_quiz_mvc_server
$
$ cd CORE19-07_quiz_mvc_server               ## Entrar en el directorio de trabajo
$
$ npm install                                ## Instala el programa de test
$
```

Una vez clonado e instalado el proyecto, ya se puede añadir código al esqueleto, pasar los test o
arrancar el servidor para acceder con un navegador. El fichero CORE19-07_quiz_mvc_server.js
(que contiene el esqueleto) está incluido en el directorio raíz del proyecto descargado y debe
completarse con el editor o sustituirse por otro del mismo nombre que quiera probarse o
ejecutarse. Todas las dependencias de CORE19-07_quiz_mvc_server.js y de los tests están
incluidos en package.json.
Para arrancar el servidor y poder acceder con un navegador se debe invocar:

```
$
$ npm start                       ##  arranca con el script de arranque de package.json, o
$
$ node CORE19-07_quiz_mvc_server  ##  arranca el fichero directamente, o
$
$ supervisor CORE19-07_quiz_mvc_server   ##  arranca con el supervisor
$                                        ## (solo si el paquete supervisor está instalado)
```                                          

Los tests se pueden ejecutar con:

```
$
$ npm run checks                             ## Pasa los tests al fichero solicitado
.........................................    ## en el directorio de trabajo
.........................................
... (resultado de los tests)
$ 
```

Los tests pueden pasarse las veces que sea necesario. Si se pasan nada más descargar el proyecto, los test fallaran. 
También pueden utilizarse para probar el programa de otro compañero sustituyendo los ficheros que se desee probar.
El programa de test incluye además un comando para generar el fichero ZIP

```
$
$ npm run zip         ##  Comprime los ficheros del directorio en un fichero .zip
$ 
```

Este genera el fichero CORE19-07_quiz_mvc_server_entregable.zip con el directorio de la
practica comprimido. Este fichero ZIP debe subirse a la plataforma para su evaluación.