import globals from "./globals.js";
import 
{
    initHTMLelements, loadAssets, initSprites, initVars, initLevel,
    initMainSprites, initControlsSprites, initStorySprites,
    initScoreSprites, initTimers, initEvents, initOverSprites,
    initOneLifeLessSprites, initCamera, initParticles
} from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";
import { Game } from "./constants.js"; // Importamos los estados del juego

/////////////////////
// GAME INIT
/////////////////////

window.onload = init;

function init() {
    // Inicializamos los elementos de HTML: Canvas, Context, Caja de texto de pruebas
    initHTMLelements();

    // Cargamos todos los activos: TILEMAPS, IMAGES, SOUNDS
    loadAssets();

    // Inicializamos los sprites
    initSprites();
    
    // Inicialización de variables del juego
    initVars();

    // Inicializamos temporizadores
    initTimers();

    // Inicializamos eventos
    initEvents();

    // Inicializamos el mapa del juego
    initLevel();

    initMainSprites();

    initControlsSprites();

    initStorySprites();

    initScoreSprites();

    initOverSprites();

    initOneLifeLessSprites();

    initCamera();

    //initParticles();

    // Estado inicial del juego
    globals.gameState = Game.PLAYING;

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

/////////////////////
// GAME EXECUTE
/////////////////////

// Bucle principal de ejecución 
function gameLoop(timeStamp) 
{
    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    // Tiempo real del ciclo de ejecución 
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; // Segundos

    // Tiempo anterior del ciclo de ejecución 
    globals.previousCycleMilliseconds = timeStamp ;




    // Variable que corrige el tiempo de frame debido a retrasos con respecto al tiempo objetivo (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;

    // CHANGES: Correcciones
    globals.cycleRealTime += elapsedCycleSeconds;

    // CHANGES: Correcciones
    if (globals.cycleRealTime >= globals.frameTimeObj) 
    {
        // Actualizar la lógica del juego. gameLogic.js
        update();

        // Dibujar el juego. gameRender.js
        render();

        // CHANGES
        // Corregimos los excesos de tiempo
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}
