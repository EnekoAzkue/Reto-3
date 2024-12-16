//Variables globales
import {Game} from "./constants.js";
import { Level } from "./level.js";

export default 
{
    //Acceso al canvas y context
    canvas: {},
    ctx: {},
    canvasHUD: {},
    ctxHUD: {},

    //Estado de juego. Inicializamos a INVALIDO
    gameState: Game.INVALID,

    //Tiempo de ciclo de juego real(seconds)
    previousCycleMilliseconds: -1,

    //Timepo de ciclo real(seconds)
    cycleRealTime: 0,

    //Diferencia de tiempo(seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo(seconds, constante)
    frameTimeObj: 0,

    //Caja de tecto para mostrar datos de depuracion
    txtPruebas: {},
    
    //Datos de imagen (tileset)
    tileSets: [],

    //Variables para gestionar la carga de archivos
    assetsToLoad: [],
    assetsLoaded: 0,

    //Array con los datos de los sprites
    sprites: [],
    spritesHUD: [],
    spritesBackgrounds: [],

    //Datos del nivel
    Level: {}
};