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
    spritesGorrocopteros: [],
    spritesGorrocopteroslvl2: [],
    spritesHormigas: [],
    spritesHormigaslvl2: [],
    spritesBombillas: [],
    spritesBombillaslvl2: [],

    spritesHUD: [],
    spritesMain: [],
    spritesControls: [],
    spritesStory: [],
    spritesScore: [],
    spritesOver: [],
    spritesOneLifeLess: [],
    
    //Datos del nivel
    currentLevel: 0,
    currentWorld: 0,
    levels: [],
    Level: {},
    Level2: {},

    //Timepo de juego
    gameTime: -1,
    
    //Temporizacion nivel
    levelTime: {},

    respawnTime: {},

    StoryTime: {},


    //Objeto que guarda el estado de la tecla pulsada
    action: {},

    //Life
    life: 0,

    enemycount: 0,
    gorroCounter: 0,

    score: 0,

    hitNum: 0,

    particles: [],

    shot1Active: false,
    shot2Active: false,
    shot3Active: false,
    shot4Active: false,
};