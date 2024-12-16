import globals from "./globals.js";
import{initHTMLelements, loadAssets, initSprites, initVars, initLevel, initMainSprites} from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";

/////////////////////
//GAME INIT
/////////////////////

window.onload = init;

function init()
{

    //Inicializaremos los elementos de HTML: Canvas, Context, Caja de texto de pruebas
    initHTMLelements();

    //Cargamos todos los activos: TILEMAPS, IMAGES, SOUNDS
    loadAssets();

    //Inicializamos los sprites
    initSprites();
    
    //Inicializacion de variables del juego
    initVars();

    //Inicializamos el mapa del juego
    initLevel();

    initMainSprites();

    //Start the first frame request
    window.requestAnimationFrame(gameLoop);

}

/////////////////////
// GAME EXECUTE
/////////////////////

//Bucle principal de ejecucion 
function gameLoop(timeStamp)
{

    //Keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Timepo real de ciclo de ejecucion 
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; //Seconds

    //Timepo anterior de ciclo de ejecucucion 
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrige el tiempo de frame debido a retrasos con respecto al timepo objetivo(frameTimeOb)
    globals.deltaTime += elapsedCycleSeconds;

    //CHANGES: CORRECCIONES
    globals.cycleRealTime += elapsedCycleSeconds;

    //CHANGES: CORRECCIONES
    if(globals.cycleRealTime >= globals.frameTimeObj)
    {
        //Update the game logic. gameLogic.js
        update();

        //Perform the drawing operation. gameRender.js
        render();

        //CHANGES
        //Corregimos los exesos de tiempo
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}