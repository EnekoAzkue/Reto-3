import globals from "./globals.js";
import {Game, State, SpriteID} from "./constants.js";

export default function update()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            console.log("Loading assets...");
            break;

        case Game.PLAYING:
            playGame();
            break;

        case Game.OVER:
            gameOver();
            break;
            

        case Game.MAIN:
            mainScreen();
            break;

        case Game.SCORE:
            scoreScreen();
            break;
        
        case Game.CONTROLS:
            controlsScreen();
            break;

        case Game.STORY:
            storyScreen();
        break;
        default:
            console.error("Error: Game State invalid");
    }
}

function playGame()
{
    updateSprites();
    updateSpritesHUD();
}

function gameOver()
{

}

function mainScreen()
{
    updateMainSprites();
}

function scoreScreen()
{

}

function controlsScreen()
{

}

function storyScreen()
{

}

function updateSprites()
{
    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function updateSpritesHUD()
{
    for(let i = 0; i < globals.spritesHUD.length; i++)
    {
        const sprite = globals.spritesHUD[i];
        updateSpriteHUD(sprite);
    }
}

function updateSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;
        
        case SpriteID.BOMB:
            updateBomb(sprite);
            break;

        case SpriteID.MAZE_BLOCK:
            updateMazeBlock1(sprite);
            break;
        
        case SpriteID.GORROCOPTERO:
            updateGorrocoptero(sprite);
            break;

        case SpriteID.HORMIGA:
            updateHormiga(sprite);
            break;
        
        case SpriteID.HEALTHPOTION:
            updateHealthPotion(sprite);
            break;

        case SpriteID.THRONE:
            updateThrone(sprite);
            break;
            
        //Caso del enemigo
        default:

            break;
    }
}

function updateMainSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.MAINSCREEN:
            updateMainScreen(sprite);
            break;
        
        case SpriteID.PLAYER:
            updatePlayerMain(sprite);
            break;
        

        case SpriteID.THRONE:
            updateThroneMain(sprite);
            break;
            



        //Caso del enemigo
        default:

            break;
    }
}

function updateSpriteHUD(sprite)
{
    const type = sprite.id
    switch(type)
    {
        case SpriteID.HEART:
            updateHeart(sprite);
            break;
        
        default:

            break;
    }
}

//Funcion que actualiza el presonaje
function updatePlayer(sprite)
{
    //Aqui actualizariamos el estado de las variables del player

    sprite.xPos = 32;
    sprite.yPos = 16;
    //console.log(sprite.state)
    sprite.state = State.DOWN;
    sprite.frames.frameCounter = 0;

    //console.log(sprite.state)
}

function updatePlayerMain(sprite)

{
    sprite.xPos = 32;
    sprite.yPos = 16;

    sprite.state = State.RIGHT;
    sprite.frames.frameCounter = 2;

}


function updateBomb(sprite)
{


    sprite.xPos = 96;
    sprite.yPos = 80;

    sprite.state = State.BLUE;
    sprite.frames.frameCounter = 3;

}

function updateMazeBlock1(sprite)
{


    sprite.xPos = 96;
    sprite.yPos = 96;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}

function updateGorrocoptero(sprite)
{


    sprite.xPos = 96;
    sprite.yPos = 24;

    sprite.frames.frameCounter = 0;

    sprite.state = State.DOWN_1;
}

function updateHormiga(sprite)
{


    sprite.xPos = 160;
    sprite.yPos = 8;

    sprite.frames.frameCounter = 0;

    sprite.state = State.LEFT_2;
}

function updateHeart(sprite)
{

    sprite.frames.frameCounter = 0;

}

function updateHealthPotion(sprite)
{

    sprite.xPos = 64;
    sprite.yPos = 112;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}

function updateThrone(sprite)
{

    sprite.xPos = 74;
    sprite.yPos = 182;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}

function updateThroneMain(sprite)
{

    sprite.xPos = 50;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}

function updateMainScreen(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

}


function updateMainSprites()
{
    for(let i = 0; i < globals.spritesMain.length; i++)
    {
        const sprite = globals.spritesMain[i];
        updateMainSprite(sprite);
    }
}
