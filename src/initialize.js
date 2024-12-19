import globals from "./globals.js";
import {Game, SpriteID, State, FPS} from "./constants.js";
import Sprite from "./sprite.js";
import ImageSet from "./imageSet.js";
import Frames from "./frames.js";
import {Level, level1} from "./level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { keydonwHandler, keyupHandler } from "./events.js";
//Funcion que inicializa los elementos HTML
function initHTMLelements()
{

    //Canvas, context Screen
    globals.canvas = document.getElementById('gameScreen');
    globals.ctx = globals.canvas.getContext('2d');

    //Canvas, context HUD
    globals.canvasHUD = document.getElementById('gameHUD');
    globals.ctxHUD = globals.canvasHUD.getContext('2d');
    //Eliminacion del Anti-Aliasing
    globals.ctx.imageSmoothingEnabled = false;

    //Caja de texto para pruebas
    globals.txtPruebas = document.getElementById('txtPruebas');

}

//Funcion que inicializa las variables del juego
function initVars()
{

    //Inicializamos las variables de gestion de tiempo 
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS; //Frame time in seconds

    //Inicializamos el estado del juego
    globals.gameState = Game.MAIN;

    //Inicializamos los estados de las acciones
    globals.action = 
    {
        moveLeft:   false,
        moveRight:  false,
        moveUp:     false,
        moveDown:   false
    }
}

//Carga de activos: TIMEMAPS, IMAGES, SOUNDS
function loadAssets()
{
    let tileSet;

    //Load spriteSheet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/Spritesheet.png"; //Ojo que la ruta es relativa al HTLM, no al JS
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load TIleSet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/TileSet2.png"; //Ojo que la ruta es relativa al HTLM, no al JS
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}

//UPDATE. Funcion que se llama cada vez que se llama un archivo
function loadHandler()
{

    globals.assetsLoaded++;

    console.log(`gameState = ${globals.gameState}`);

    //Una vez se han cargado todos los archivos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {

        //UPDATE. Remove the load event listener
        for(let i = 0; i < globals.tileSets.length; i++)
        {
            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }

        console.log("Assets finished loading");

        //Start the game 
        globals.gameState = Game.CONTROLS;
    }
    console.log(`gameState = ${globals.gameState}`)
}

function initSprites()
{

    initPlayer();
    initBomb();
    initMazeBlock();
    initGorrocoptero();
    initHormiga();
    initBombilla();
    initHeart();
    initHealthPotion();
    initThrone();
}

function initMainSprites()
{
    initMainScreen();
    initPlayer();
    initThrone();
}

function initControlsSprites()
{
    initControlsScreen();
    initPlayer();
    initBomb();
}

function initStorySprites()
{
    initStoryScreen();
}

function initScoreSprites()
{
    initScoreScreen();
}

function initOverSprites()
{
    initOverScreen();
}

function initMainScreen()
{
    let x = 0;
    let y = 35;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 11;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 272, 208, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    //Creamos nuestro sprite
    const mainScreen = new Sprite(SpriteID.MAINSCREEN, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesMain.push(mainScreen);

}

function initControlsScreen()
{
    let x = 0;
    let y = 84;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 15;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 272, 208, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    //Creamos nuestro sprite
    const ControlScreen = new Sprite(SpriteID.CONTROLSSCREEN, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesControls.push(ControlScreen);

}

function initStoryScreen()
{
    let x = 0;
    let y = 60;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 5;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 272, 208, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    //Creamos nuestro sprite
    const StoryScreen = new Sprite(SpriteID.STORYSCREEN, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesStory.push(StoryScreen);

}

function initScoreScreen()
{
    let x = 0;
    let y = 72;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 10;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 272, 208, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    //Creamos nuestro sprite
    const ScoreScreen = new Sprite(SpriteID.SCORESCREEN, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesScore.push(ScoreScreen);

}

function initOverScreen()
{
    let x = 0;
    let y = 47;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 17;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 272, 208, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);
    //Creamos nuestro sprite
    const overScreen = new Sprite(SpriteID.OVERSCREEN, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesOver.push(overScreen);

}

function initPlayer()
{
    //El player solo llega a y = 3 y el maximo de x es 12
    let x = 0;
    let y = 0;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 17, xOffset, yOffset);

    //Creamos los datos de la animacion. 13 frames / state
    const frames = new Frames(8, 6);

    //Crearemos nuestro objeto physics con el vLimit = 40px/s
    const physics = new Physics(80);

    //Creamos nuestro sprite (id, state, xPos, yPos, imageSet, frames, physics)
    const player = new Sprite(SpriteID.PLAYER, State.DOWN, -50, 48, imageSet, frames, physics);

    const playerC1 = new Sprite(SpriteID.PLAYER1, State.DOWN, 80, 48, imageSet, frames, 0);
    const playerC2 = new Sprite(SpriteID.PLAYER2, State.DOWN, 80, 48, imageSet, frames, 0);
    const playerC3 = new Sprite(SpriteID.PLAYER3, State.DOWN, 80, 48, imageSet, frames, 0);


    //Añadimos el player al array de sprites
    globals.sprites.push(player);
    globals.spritesMain.push(player);
    globals.spritesControls.push(player,playerC1,playerC2,playerC3);

}


function initBomb()
{
    //La bomba empieza desde y = 4 hasta y = 6,
    let x = 0;
    let y = 4;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 17, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const bomb = new Sprite(SpriteID.BOMB, State.BLUE, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(bomb);
    globals.spritesControls.push(bomb);


}

function initMazeBlock()
{
    let x = 0;
    let y = 15;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 17, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const mazeBlock = new Sprite(SpriteID.MAZE_BLOCK, State.STILL, 100, 70, imageSet, frames);


    //Añadimos el player al array de sprites
    globals.sprites.push(mazeBlock);

}

function initGorrocoptero()
{
    let x = 0;
    let y = 17;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 24, 25, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const gorrocoptero = new Sprite(SpriteID.GORROCOPTERO, State.DOWN_1, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(gorrocoptero);

}

function initHormiga()
{
    let x = 0;
    let y = 17;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 25*4;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 24, 25, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const hormiga = new Sprite(SpriteID.HORMIGA, State.DOWN_1, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(hormiga);
}

function initBombilla()
{
    let x = 0;
    let y = 17;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 19, 16, 24, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const bombilla = new Sprite(SpriteID.GORROCOPTERO, State.LEFT_1, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    //globals.sprites.push(bombilla);
}

function initHeart()
{
    let x = 0;
    let y = 32;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(4);
    //Creamos nuestro sprite
    const heart = new Sprite(SpriteID.HEART, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.spritesHUD.push(heart);
}

function initHealthPotion()
{
    let x = 0;
    let y = 33;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y - 1;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 22, 16, 16, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const healthPotion = new Sprite(SpriteID.HEALTHPOTION, State.STILL, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(healthPotion);
}

function initThrone()
{
    let x = 0;
    let y = 33;
    let xOffset = 16*x + x;
    let yOffset = 16*y + y + 15;
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 23, 27, 30, 0, xOffset, yOffset);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(1);

    //Crearemos nuestro objeto physics con el vLimit = 40px/s
    const physics = new Physics(160);

    //Creamos nuestro sprite
    const throne = new Sprite(SpriteID.THRONE, State.LEFT_1, -400, 70, imageSet, frames, physics);

    //Añadimos el player al array de spritesS
    globals.sprites.push(throne);
    globals.spritesMain.push(throne);

}

function initLevel()
{
    //Creamos las propiedades de las imagenes del mapa: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 0, 0);

    //Creamos y gurdamos nuestro nivel
    globals.Level = new Level(level1, imageSet)
}

//Inicializamos el contador de juego
globals.gameTime = 0;

function initTimers()
{
    //Creamos timer de 200, con cambios cada 0.5s
    globals.levelTime = new Timer(200, 0.5)
}

function initEvents()
{
    //Add the keyboard event listeners
    window.addEventListener("Keydown", keydonwHandler);
    window.addEventListener("Keyup", keyupHandler);
}


//Exportamos las funciones 
export 
{
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel,
    initMainSprites,
    initControlsSprites,
    initStorySprites,
    initScoreSprites,
    initOverSprites,
    initTimers,
    initEvents
}