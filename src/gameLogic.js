import globals from "./globals.js";
import {Game, State, SpriteID} from "./constants.js";
import Timer from "./Timer.js";

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

        case Game.OVER:
            overScreen();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

function playGame()
{
    updateSprites();
    updateSpritesHUD();

    updateGameTime();

    updateLevelTime();
}

function gameOver()
{
    updateOverSprites();
}

function mainScreen()
{
    updateMainSprites();
}

function scoreScreen()
{
    updateScoreSprites();
}

function controlsScreen()
{
    updateControlSprites();
}

function storyScreen()
{
    updateStorySprites();
}

function overScreen()
{
    updateOverSprites();
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

function updateControlSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.CONTROLSSCREEN:
            updateControlScreen(sprite);
            break;
        
        case SpriteID.PLAYER:
            updatePlayerControls(sprite);
            break;
        
        case SpriteID.PLAYER1:
            updatePlayer1Controls(sprite);
            break;

        case SpriteID.PLAYER2:
            updatePlayer2Controls(sprite);
            break;
            
        case SpriteID.PLAYER3:
            updatePlayer3Controls(sprite);
            break;

        case SpriteID.BOMB:
            updateBombControls(sprite);
            break;
            

        //Caso del enemigo
        default:

            break;
    }
}

function updateStorySprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.STORYSCREEN:
            updateStoryScreen(sprite);
            break;
        
        //Caso del enemigo
        default:

            break;
    }
}

function updateScoreSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.SCORESCREEN:
            updateScoreScreen(sprite);
            break;
        
        //Caso del enemigo
        default:

            break;
    }
}

function updateOverSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.OVERSCREEN:
            updateOverScreen(sprite);
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

    readKeyboardAndAssignState(sprite);

    switch (sprite.state)
    {
        case State.UP:
            //Si se mueve hacia arriba asignamos vy(-)
            sprite.physics.vx = 0;
            sprite.physics.vy = -sprite.physics.vLimit;
            break;
        case State.DOWN:
            //Si se mueve hacia abajo asignamos vy(+)
            sprite.physics.vx = 0;
            sprite.physics.vy = sprite.physics.vLimit;
            break;
        case State.RIGHT:
            //Si se mueve hacia la derecha asignamos vx(+)
            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;
        case State.LEFT:
            //Si se mueve hacia la izquierda asignamos vx(-)
            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;
                    
        default:
            sprite.physics.vx = 0;
            sprite.physics.vy = 0;
    }


    
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime

    updateAnimationFrame(sprite);

}

function updatePlayerMain(sprite)

{
    sprite.physics.vx = sprite.physics.vLimit;
    sprite.yPos = 172;

    sprite.state = State.RIGHT;

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    if(sprite.xPos > 300)
    {
        sprite.xPos = -50;
    }

    updateAnimationFrame(sprite);
}

function updatePlayerControls(sprite)

{
    sprite.xPos = 80;
    sprite.yPos = 108;

    sprite.state = State.UP;
    sprite.frames.speed = 20;
    updateAnimationFrame(sprite);

}

function updatePlayer1Controls(sprite)

{
    sprite.xPos = 80;
    sprite.yPos = 128;

    sprite.state = State.LEFT;
    updateAnimationFrame(sprite);

}

function updatePlayer2Controls(sprite)

{
    sprite.xPos = 80;
    sprite.yPos = 148;

    sprite.state = State.DOWN;
    updateAnimationFrame(sprite);

}

function updatePlayer3Controls(sprite)

{
    sprite.xPos = 80;
    sprite.yPos = 168;

    sprite.state = State.RIGHT;
    updateAnimationFrame(sprite);

}

function updateBomb(sprite)
{


    sprite.xPos = 96;
    sprite.yPos = 80;

    sprite.state = State.BLUE;
    sprite.frames.frameCounter = 0;

}

function updateBombControls(sprite)
{
    sprite.xPos = 240;
    sprite.yPos = 108;

    sprite.state = State.BLUE;
    sprite.frames.frameCounter = 0;
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
    if(sprite.yPos >= 169)
        {
            sprite.state = State.UP_2;
        }
    else if(sprite.yPos <= 10)
            {
                sprite.state = State.DOWN_2;
            }

    //Maquina de estados
    switch(sprite.state)
    {
        case State.RIGHT_1:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vx = sprite.physics.vLimit;
            break;
        case State.LEFT_1:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vx = -sprite.physics.vLimit;
            break;
        case State.UP_1:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vy = -sprite.physics.vLimit;
            break;
        case State.DOWN_1:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vy = sprite.physics.vLimit;
            break;
    

    }

    //Calculamos la distancia que se mueve(x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime

    //Calculamos la distancia que se mueve(x = x + Vt)
    sprite.yPos += sprite.physics.vy * globals.deltaTime

    updateAnimationFrame(sprite);


}

function updateHormiga(sprite)
{
    if(sprite.yPos >= 169)
        {
            sprite.state = State.UP_2;
        }
    else if(sprite.yPos <= 10)
            {
                sprite.state = State.DOWN_2;
            }
    
    //Maquina de estados
    switch(sprite.state)
    {
        case State.RIGHT_2:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vx = sprite.physics.vLimit;
            break;
        case State.LEFT_2:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vx = -sprite.physics.vLimit;
            break;
        case State.UP_2:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vy = -sprite.physics.vLimit;
            break;
        case State.DOWN_2:
            //Si se mueve a la derecha asignamos la velocidad X positiva
            sprite.physics.vy = sprite.physics.vLimit;
            break;
    

    }

    //Calculamos la distancia que se mueve(x = x + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime

    //Calculamos la distancia que se mueve(x = x + Vt)
    sprite.yPos += sprite.physics.vy * globals.deltaTime

updateAnimationFrame(sprite);



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
    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

    //Actualizamos el angulo de giro
    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    //Calculamos la nueva posicion 
    setThronePosition(sprite);
    //console.log(sprite.xPos);
    //console.log(sprite.yPos);

}

function updateThroneMain(sprite)
{

    sprite.physics.vx = sprite.physics.vLimit;
    sprite.yPos = 155;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

    sprite.xPos += sprite.physics.vx * globals.deltaTime
    if(sprite.xPos > 600)
    {
        sprite.xPos = -100;
    }

}

function updateMainScreen(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

}

function updateControlScreen(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

}

function updateStoryScreen(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

}

function updateScoreScreen(sprite)
{
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;

}

function updateOverScreen(sprite)
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

function updateControlSprites()
{
    for(let i = 0; i < globals.spritesControls.length; i++)
    {
        const sprite = globals.spritesControls[i];
        updateControlSprite(sprite);
    }
}

function updateStorySprites()
{
    for(let i = 0; i < globals.spritesStory.length; i++)
    {
        const sprite = globals.spritesStory[i];
        updateStorySprite(sprite);
    }
}

function updateScoreSprites()
{
    for(let i = 0; i < globals.spritesScore.length; i++)
    {
        const sprite = globals.spritesScore[i];
        updateScoreSprite(sprite);
    }
}

function updateOverSprites()
{
    for(let i = 0; i < globals.spritesOver.length; i++)
    {
        const sprite = globals.spritesOver[i];
        updateOverSprite(sprite);
    }
}

function updateGameTime()
{
    //Incrementamos el contador
    globals.gameTime += globals.deltaTime;
}

function updateLevelTime()
{
    //Incrementaremos el contador de cambio de valor
    globals.levelTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor de timer
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue)
    {
        globals.levelTime.value--;

        //Resetearemos timeChangerCounter
        globals.levelTime.timeChangeCounter = 0;
    }
}

function updateAnimationFrame(sprite)
{
    if(sprite.id == 0)
    {
    switch(sprite.state)
    {
        case State.STILL_UP:
        case State.STILL_LEFT:
        case State.STILL_DOWN:
        case State.STILL_RIGHT:
            
            break;

        case State.UP:
        case State.LEFT:
        case State.DOWN:
        case State.RIGHT:
            sprite.frameCounter = 4;
            sprite.frameChangeCounter = 0;
            break;
    }
    }

    if(sprite.id == 4)
        {
        switch(sprite.state)
        {
            case State.UP_1:
            case State.LEFT_1:
            case State.DOWN_1:
            case State.RIGHT_1:
                sprite.frameCounter = 4;
                sprite.frameChangeCounter = 1;
                sprite.frames.speed = 2;
                break;
    
            
        }
        }

        if(sprite.id == 5)
        {
            switch(sprite.state)
            {
                case State.UP_2:
                case State.LEFT_2:
                case State.DOWN_2:
                case State.RIGHT_2:
                    sprite.frameCounter = 12;
                    sprite.frameChangeCounter = 1;
                    sprite.frames.speed = 2;
                    break;
        
                
            }
        }
    
    //Aumentamos el contador de timepo de frames
    sprite.frames.frameChangeCounter++;

    //Cambiamos de frame cuando el lag de animacion alcanza animSpeed
    if (sprite.frames.frameChangeCounter === sprite.frames.speed)
    {
        //Cambios de frame y reseteamos el contador de cambio de frame 
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter = 0;
    }

        //Si hemos llegado al maximo de frames reiniciamos el contador(animacion ciclica)
        if(sprite.frames.frameCounter === sprite.frames.framesPerState)
        {
            sprite.frames.frameCounter = 0;
        }

}

function setThronePosition(sprite)
{
    //Movimiento circular
    //x = xCentre + Acos(angle)
    //y = yCentre + Asin(angle)

    const radiusA = 200;
    const radiusB = 100;

    const K = 30;
    const Kp = 25;

    sprite.xPos = sprite.physics.xRotCenter + radiusA * Math.cos(K * sprite.physics.angle)
    sprite.yPos = sprite.physics.yRotCenter + radiusB * Math.sin(Kp * sprite.physics.angle)


    //Centramos el giro respecto del centro del sprite
    sprite.xPos -= sprite.imageSet.xSize/2;
    sprite.yPos -= sprite.imageSet.ySize/2;

}

function readKeyboardAndAssignState(sprite)
{
    sprite.state =  globals.action.moveLeft         ? State.LEFT:           //Left key
                    globals.action.moveRight        ? State.RIGHT:          //Right key
                    globals.action.moveUp           ? State.UP:             //Up key
                    globals.action.moveDown         ? State.DOWN:           //Down key
                    sprite.state === State.LEFT     ? State.STILL_LEFT:     //No key and previous state Left
                    sprite.state === State.RIGHT    ? State.STILL_RIGHT:    //No key and previous state Right
                    sprite.state === State.UP       ? State.STILL_UP:       //No key and previous state Up
                    sprite.state === State.DOWN     ? State.STILL_DOWN:     //No key and previous state Down
                    sprite.state;

}