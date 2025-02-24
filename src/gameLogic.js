import globals from "./globals.js";
import {Game, State, SpriteID, Collision, GRAVITY, ParticleState,ParticleID} from "./constants.js";
import Timer from "./Timer.js";
import {detectCollisionsPlayer, detectCollisionsExplosion,detectCollisionBetweenGorrocopteroAndMapObstacles, detectCollisionBetweenHormigaAndMapObstacles, detectCollisionBetweenHormigaAndMapObstacleslvl2, detectCollisionBetweenGorrocopteroAndMapObstacleslvl2} from "./collisions.js";
import { initShot1, initShot2, initShot3, initShot4, initShot5, initShot6, initBombilla,initHormiga,initGorrocoptero } from "./initialize.js";
let random = Math.floor((Math.random() * 7) + 1)
//let random = 7;
let playerXPos;
let playerYPos;
let isLeftActive = true;
export default function update()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            console.log("Loading assets...");
            break;

        case Game.LOADING_PLAYING:
            loadPlaying();
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

        case Game.ONE_LIFE_LESS:
            oneLifeLessScreen();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

function loadPlaying() {
    setSprites();
    setGorrocopteroSprites();
    setHormigaSprites();
    setBombillaSprites();
    setPotionPosition(globals.sprites[2], random);
    setSpritesHUD();


    if (globals.action.enter && canChangeScreen) {
        globals.gameState = Game.PLAYING;

    }
}

function playGame()
{

    updateSprites();
    updateGorrocopteroSprites();
    updateHomrigaSprites();
    updateBombillaSprites();

    updateSpritesHUD();

    detectCollisionsPlayer();
    if(globals.currentLevel === 0)
    {
        detectCollisionBetweenGorrocopteroAndMapObstacles();
    }
    else 
    {
        detectCollisionBetweenGorrocopteroAndMapObstacleslvl2();
    }

    updateCamera();

    updateGameTime();

    updateLevelTime();

    updateLife();
    updateEnemyLife();
    updateMap();
}

function gameOver()
{
    updateOverSprites();
}

function mainScreen()
{
    updateMainSprites();
    updateParticles();

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
    updateStoryTime();
}

function overScreen()
{
    updateOverSprites();
}

function oneLifeLessScreen()
{
    updateOneLifeLessSprites();
    updateRespawnTime();
}
function updateSprites()
{
    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function updateGorrocopteroSprites()
{

    if(globals.currentLevel === 0)
        {
            for(let i = 0; i < globals.spritesGorrocopteros.length; i++)
                {
                    const sprite = globals.spritesGorrocopteros[i];
                    updateGorrocopteroSprite(sprite);
                }
        }
        else
        {
            for(let i = 0; i < globals.spritesGorrocopteroslvl2.length; i++)
                {
                    const sprite = globals.spritesGorrocopteroslvl2[i];
                    updateGorrocopteroSprite(sprite);
                }
        }
}

function updateHomrigaSprites()
{
    if(globals.currentLevel === 0)
        {
            for(let i = 0; i < globals.spritesHormigas.length; i++)
                {
                    const sprite = globals.spritesHormigas[i];
                    updateHormigaSprite(sprite);
                }
        }
        else
        {
            for(let i = 0; i < globals.spritesHormigaslvl2.length; i++)
                {
                    const sprite = globals.spritesHormigaslvl2[i];
                    updateHormigaSprite(sprite);
                }
        }
}

function updateBombillaSprites()
{
    if(globals.currentLevel === 0)
    {
        for(let i = 0; i < globals.spritesBombillas.length; i++)
            {
                const sprite = globals.spritesBombillas[i];
                updateBombillaSprite(sprite);
            }
    }
    else
    {
        for(let i = 0; i < globals.spritesBombillaslvl2.length; i++)
            {
                const sprite = globals.spritesBombillaslvl2[i];
                updateBombillaSprite(sprite);
            }
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

function setSprites()
{
    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
        setSprite(sprite);
    }
}

function setGorrocopteroSprites()
{
    if(globals.currentLevel === 0)
        {
            for(let i = 0; i < globals.spritesGorrocopteros.length; i++)
                {
                    const sprite = globals.spritesGorrocopteros[i];
                    setGorrocopteroSprite(sprite);
                }
        }
        else 
        {
            for(let i = 0; i < globals.spritesGorrocopteroslvl2.length; i++)
                {
                    const sprite = globals.spritesGorrocopteroslvl2[i];
                    setGorrocopteroSprite(sprite);
                }
        }
}

function setHormigaSprites()
{
    if(globals.currentLevel === 0)
    {
        for(let i = 0; i < globals.spritesHormigas.length; i++)
        {
            const sprite = globals.spritesHormigas[i];
            setHormigaSprite(sprite);
        }
    }
    else 
    {
        for(let i = 0; i < globals.spritesHormigaslvl2.length; i++)
        {
            const sprite = globals.spritesHormigaslvl2[i];
            setHormigaSprite(sprite);
        }
    }
}

function setBombillaSprites()
{
    for(let i = 0; i < globals.spritesBombillas.length; i++)
    {
        const sprite = globals.spritesBombillas[i];
        setBombillaSprite(sprite);
    }
}

function setSpritesHUD()
{
    for(let i = 0; i < globals.spritesHUD.length; i++)
    {
        const sprite = globals.spritesHUD[i];
        setSpriteHUD(sprite);
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

        case SpriteID.THRONE:
            updateThrone(sprite);
            break;
            
        case SpriteID.SHOT:
            updateShot(sprite);
            break;
        //Caso del enemigo
        default:

            break;
    }
}

function updateGorrocopteroSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        case SpriteID.GORROCOPTERO:
            updateGorrocoptero(sprite);
            break;

        default:

            break;
    }
}

function updateHormigaSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        case SpriteID.HORMIGA:
            updateHormiga(sprite);
            break;

        default:

            break;
    }
}

function updateBombillaSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        case SpriteID.BOMBILLA:
            updateBombilla(sprite);
            break;

        default:

            break;
    }
}

function setSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.PLAYER:
            setPlayer(sprite);
            break;

        case SpriteID.BOMB:
            setBomb(sprite);
            break;
        



        
        case SpriteID.THRONE:
            setThrone(sprite);
            break;
            
        //Caso del enemigo
        default:

            break;
    }
}

function setGorrocopteroSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {

        case SpriteID.GORROCOPTERO:
            setGorrocoptero();
            break;

        default:

            break;
    }
}

function setHormigaSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {

        case SpriteID.HORMIGA:
            setHormiga(sprite);
            break;

        default:

            break;
    }
}

function setBombillaSprite(sprite)
{

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
        
        case SpriteID.PLAYERMAIN:
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
        
        case SpriteID.PLAYERC1:
            updatePlayerControls(sprite);
            break;
        
        case SpriteID.PLAYERC2:
            updatePlayer1Controls(sprite);
            break;

        case SpriteID.PLAYERC3:
            updatePlayer2Controls(sprite);
            break;
            
        case SpriteID.PLAYERC4:
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
        case SpriteID.OVERSCREEN:
            updateOverScreen(sprite);
            break;
        
        default:

            break;
    }
}

function updateOneLifeLessSprite(sprite)
{
    const type = sprite.id;
    switch(type)
    {
        case SpriteID.ONELIFELESSSCREEN:
            updateOneLifeLessScreen(sprite);
            break;

        case SpriteID.PLAYER:
            updatePlayerOneLifeLess(sprite);
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

function setSpriteHUD(sprite)
{
    const type = sprite.id
    switch(type)
    {
        case SpriteID.HEART:
            setHeart(sprite);
            break;
    

    }
}
function setPlayer(sprite)
{
    sprite.frameCounter = 4;
    sprite.frameChangeCounter = 1;

    invulnerable = false;
    sprite.xPos         = 32;
    sprite.yPos         = 16;
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

    sprite.frames.speed = 5; // Configura la velocidad de animación para la pantalla de juego

    updateAnimationFrame(sprite);


    if (globals.action.plantbomb === true && !globals.bombPlanted) {
        updateBomb(globals.sprites[1], sprite);
        globals.bombPlanted = true; // Evita que la bomba se replante en cada frame
    
        // Opcional: Restablecer la variable después de un tiempo si quieres permitir otra bomba
        setTimeout(() => {
            globals.bombPlanted = false; // Permite plantar otra bomba después de un tiempo
        }, 2600); // Ajusta el tiempo según necesites (3000ms = 3 segundos)
    }
    
}

function updatePlayerMain(sprite)

{
    globals.life = 3;
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
let jumping = 0;
function updatePlayerOneLifeLess(sprite)
{
    sprite.physics.ay = GRAVITY;

    if(jumping === 0)
    {
        sprite.physics.vy += sprite.physics.jumpForce;
        if(sprite.yPos >= 120)
        {
            jumping = 1;
        }
    }
    if(jumping === 1)
    {
        sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    }

    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    
    updateAnimationFrame(sprite);

}
function setBomb(sprite)
{
    sprite.state = State.BLUE;
    sprite.frames.frameCounter = 5;
    sprite.xPos           = 360;
    sprite.yPos           = 360;

}
function updateBomb(sprite, player) {
    let centerX = player.xPos + player.hitBox.xOffset + player.hitBox.xSize / 2;
    let centerY = player.yPos + player.hitBox.yOffset + player.hitBox.ySize / 2;

    sprite.xPos = Math.floor(centerX / 16) * 16; 
    sprite.yPos = Math.floor(centerY / 16) * 16; 

    sprite.frames.frameCounter = 1;
    let timeElapsed = 0;
    let blinkRate = 300;

    function animateBomb() {

        sprite.state = (sprite.state === State.RED) ? State.BLUE : State.RED;

        if (timeElapsed >= 0.5 && timeElapsed < 1) {
            sprite.frames.frameCounter = 2;
        } else if (timeElapsed >= 1) {
            sprite.frames.frameCounter = 3;
        }

        if (timeElapsed >= 0.5) {
            blinkRate = 100;
        }
        if (timeElapsed >= 1) {
            blinkRate = 50;
        }
        if (timeElapsed >= 2) {

            sprite.frames.frameCounter = 1;
            sprite.state = State.EXPLOSION; // Cambia al estado de explosión
            triggerExplosion(sprite); // Llama a la función que manejará la explosión
            return;
        }

        timeElapsed += blinkRate / 1000;
        setTimeout(animateBomb, blinkRate);
    }

    animateBomb();
}

function triggerExplosion(sprite) {


    sprite.frames.frameCounter = 1;

    updateExplosions(sprite);
    detectCollisionsExplosion();


}

function resetAnimation(sprite) {
    sprite.state = State.BLUE; // Cambia al estado de explosión
    sprite.frames.frameCounter = 5;

}

function updateExplosions(sprite) {
    let explosion;
    let explosionCount = 0;

    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        if (sprite.id === 1) {
            explosionCount++;
            if (explosionCount === 2) {
                explosion = sprite;
                break;
            }
        }
    }
    sprite.frames.frameCounter = 1;
    explosion.state = State.EXPLOSION;


    let totalDuration = 3 * 300 + 2 * 100;

    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            for (let k = 0; k < 3; k++) {
                setTimeout(() => {
                    explosion.xPos = sprite.xPos - 16 + (16 * k);
                    explosion.yPos = sprite.yPos - 16 + (16 * j);
                }, k * 75);
            }
        }, j * 225);
    }

    setTimeout(() => {
        resetAnimation(explosion);
        explosion.xPos = -16;
        explosion.yPos = -16;
        globals.sprites[1].xPos = -16;
        globals.sprites[1].yPos = -16;
    }, totalDuration - 400); // Espera a que termine la animación antes de reiniciar
}




function updateBombControls(sprite) {

    sprite.frames.frameCounter = 1;

    sprite.xPos = 235;
    sprite.yPos = 108;
}

function setGorrocoptero() {
    let posiciones = [];
    if(globals.currentLevel === 0)
    {    
        posiciones = [
        { state: State.RIGHT_1, xPos: 80, yPos: 55 },
        { state: State.LEFT_1, xPos: 384, yPos: 55 },
        { state: State.LEFT_1, xPos: 160, yPos: 216 },
        { state: State.RIGHT_1, xPos: 304, yPos: 216 },
        { state: State.RIGHT_1, xPos: 192, yPos: 136 },
        { state: State.RIGHT_1, xPos: 272, yPos: 136 }
        ];

        for (let i = 0; i < posiciones.length; i++) {
            if (globals.spritesGorrocopteros[i]) {
                globals.spritesGorrocopteros[i].state = posiciones[i].state;
                globals.spritesGorrocopteros[i].xPos = posiciones[i].xPos;
                globals.spritesGorrocopteros[i].yPos = posiciones[i].yPos;
            }
        }
    }
    else
    {

        posiciones = 
        [
            { state: State.RIGHT_1, xPos: 192, yPos: 64 },
            { state: State.LEFT_1, xPos: 192, yPos: 256 },
            { state: State.LEFT_1, xPos: 80, yPos: 160 },
            { state: State.RIGHT_1, xPos: 304, yPos: 160 },

        ];

        for (let i = 0; i < posiciones.length; i++) {
            if (globals.spritesGorrocopteroslvl2[i]) {
                globals.spritesGorrocopteroslvl2[i].state = posiciones[i].state;
                globals.spritesGorrocopteroslvl2[i].xPos = posiciones[i].xPos;
                globals.spritesGorrocopteroslvl2[i].yPos = posiciones[i].yPos;
            }
        }


    }


}

function updateGorrocoptero(sprite) {
    // Máquina de estados
    switch (sprite.state) {
        case State.RIGHT_1:
            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;
        case State.LEFT_1:
            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;
        case State.UP_1:
            sprite.physics.vy = -sprite.physics.vLimit;
            sprite.physics.vx = 0;
            break;
        case State.DOWN_1:
            sprite.physics.vy = sprite.physics.vLimit;
            sprite.physics.vx = 0;
            break;
    }

    // Calculamos la nueva posición
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);
}

// Función para cambiar el estado del sprite aleatoriamente cada 5 segundos
setInterval(() => {
    if (globals.spritesGorrocopteros[2].state === State.UP_1 || globals.spritesGorrocopteros[2].state === State.DOWN_1) {
        // Si está en UP o DOWN, cambiar a LEFT o RIGHT
        const horizontalStates = [State.LEFT_1, State.RIGHT_1];
        globals.spritesGorrocopteros[2].state = horizontalStates[Math.floor(Math.random() * horizontalStates.length)];
    } else {
        // Si está en LEFT o RIGHT, cambiar a UP o DOWN
        const verticalStates = [State.UP_1, State.DOWN_1];
        globals.spritesGorrocopteros[2].state = verticalStates[Math.floor(Math.random() * verticalStates.length)];
    }
    if (globals.spritesGorrocopteroslvl2[2].state === State.UP_1 || globals.spritesGorrocopteroslvl2[2].state === State.DOWN_1) {
        // Si está en UP o DOWN, cambiar a LEFT o RIGHT
        const horizontalStates = [State.LEFT_1, State.RIGHT_1];
        globals.spritesGorrocopteroslvl2[2].state = horizontalStates[Math.floor(Math.random() * horizontalStates.length)];
    } else {
        // Si está en LEFT o RIGHT, cambiar a UP o DOWN
        const verticalStates = [State.UP_1, State.DOWN_1];
        globals.spritesGorrocopteroslvl2[2].state = verticalStates[Math.floor(Math.random() * verticalStates.length)];
    }
}, 10000);

function setHormiga(sprite)
{
    let posiciones = [];
    if(globals.currentLevel === 0)
    {    
        posiciones = [
            { state: State.TL, xPos: 192, yPos: 88 },
            { state: State.DR, xPos: 280, yPos: 88 },
        ];

        for (let i = 0; i < posiciones.length; i++) {
            if (globals.spritesHormigas[i]) {
                globals.spritesHormigas[i].state = posiciones[i].state;
                globals.spritesHormigas[i].xPos = posiciones[i].xPos;
                globals.spritesHormigas[i].yPos = posiciones[i].yPos;
            }
        }
    }
    else
    {
        posiciones = 
        [
            { state: State.TL, xPos: 192, yPos: 176 },
            { state: State.DR, xPos: 272, yPos: 176 },

        ];

        for (let i = 0; i < posiciones.length; i++) {
            if (globals.spritesHormigaslvl2[i]) {
                globals.spritesHormigaslvl2[i].state = posiciones[i].state;
                globals.spritesHormigaslvl2[i].xPos = posiciones[i].xPos;
                globals.spritesHormigaslvl2[i].yPos = posiciones[i].yPos;
            }
        }

    }

}


function setBombilla(sprite)
{

}

function updateHormiga(sprite) {
    // Máquina de estados
    switch (sprite.state) {
        case State.TL: // Top Left (↖)
            sprite.physics.vx = -sprite.physics.vLimit ; // Izquierda
            sprite.physics.vy = -sprite.physics.vLimit ; // Arriba
            break;
        case State.TR: // Top Right (↗)
            sprite.physics.vx = sprite.physics.vLimit ;  // Derecha
            sprite.physics.vy = -sprite.physics.vLimit ; // Arriba
            break;
        case State.DL: // Down Left (↙)
            sprite.physics.vx = -sprite.physics.vLimit ; // Izquierda
            sprite.physics.vy = sprite.physics.vLimit ;  // Abajo
            break;
        case State.DR: // Down Right (↘)
            sprite.physics.vx = sprite.physics.vLimit ;  // Derecha
            sprite.physics.vy = sprite.physics.vLimit ;  // Abajo
            break;
    }

    if(sprite.collisionBorder === Collision.BORDER_UP)
    {
        if(sprite.state === State.TL)
        {
            sprite.state = State.DL;
        }
        else if(sprite.state === State.TR)
        {
            sprite.state = State.DR;
        }
    }
    if(sprite.collisionBorder === Collision.BORDER_DOWN)
    {
        if(sprite.state === State.DL)
        {
            sprite.state = State.TL;
        }
        else if(sprite.state === State.DR)
        {
            sprite.state = State.TR;
        }
    }
    if(sprite.collisionBorder === Collision.BORDER_LEFT)
    {
        if(sprite.state === State.TL)
        {
            sprite.state = State.TR;
        }
        else if(sprite.state === State.DL)
        {
            sprite.state = State.DR;
        }
    }
    if(sprite.collisionBorder === Collision.BORDER_RIGHT)
    {
        if(sprite.state === State.TR)
        {
            sprite.state = State.TL;
        }
        else if(sprite.state === State.DR)
        {
            sprite.state = State.DL;
        }
    }
    // Calculamos la nueva posición (x = x + Vt, y = y + Vt)
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);

    calculateCollisionWithFourBorders(sprite);
}

function setHeart(sprite)
{

}
function updateHeart(sprite)
{

    sprite.frames.frameCounter = 0;

}

function updateAngerBarLvl1(sprite)
{
    sprite.frames.frameCounter = 1;
}

function updateAngerBarLvl2(sprite)
{
    sprite.frames.frameCounter = 2;
}

function updateAngerBarLvl3(sprite)
{
    sprite.frames.frameCounter = 3;
}

function updateAngerBarFill(sprite, hitNum) {
    if (sprite.angerAnimation) 
    {
        clearInterval(sprite.angerAnimation);
    }

    let targetSize = hitNum * 13;
    let currentSize = sprite.imageSet.xSize;

    sprite.angerAnimation = setInterval(() => 
    {
        if (currentSize < targetSize) 
        {
            sprite.imageSet.xSize++;
            currentSize++;
        } 
        else 
        {
            clearInterval(sprite.angerAnimation);
        }
    }, 50); 

    let thorne;
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        if (sprite.id === 9) {
            thorne = sprite;
            break;
        }
    }

    if (hitNum === 1) 
        {
            updateAngerBarLvl1(globals.spritesHUD[2]);
            thorne.physics.omega = 0.001;
        }
        else if (hitNum === 2) 
        {
            updateAngerBarLvl2(globals.spritesHUD[2]);
            thorne.physics.omega = 0.002;
        } 
        else if (hitNum === 3) 
        {
            updateAngerBarLvl3(globals.spritesHUD[2]);
            thorne.physics.omega = 0.004;
        }


}




function setPotionPosition(sprite, random) {
    const TILE_SIZE = 16;
    const positions = [
        { xPos: 9 * TILE_SIZE, yPos: 4 * TILE_SIZE },
        { xPos: 20 * TILE_SIZE, yPos: 4 * TILE_SIZE },
        { xPos: 9 * TILE_SIZE, yPos: 6 * TILE_SIZE },
        { xPos: 20 * TILE_SIZE, yPos: 6 * TILE_SIZE },
        { xPos: 14 * TILE_SIZE, yPos: 10 * TILE_SIZE },
        { xPos: 7 * TILE_SIZE, yPos: 19 * TILE_SIZE },
        { xPos: 22 * TILE_SIZE, yPos: 19 * TILE_SIZE }
    ];
    
    if (random >= 1 && random <= positions.length) {
        let selectedPosition = positions[random - 1];
        sprite.xPos = selectedPosition.xPos;
        sprite.yPos = selectedPosition.yPos;
    }
}


function updatePotionPosition(sprite) {

    const TILE_SIZE = 16;
    const positions = [
        { xPos: 9 * TILE_SIZE, yPos: 4 * TILE_SIZE },
        { xPos: 20 * TILE_SIZE, yPos: 4 * TILE_SIZE },
        { xPos: 9 * TILE_SIZE, yPos: 6 * TILE_SIZE },
        { xPos: 20 * TILE_SIZE, yPos: 6 * TILE_SIZE },
        { xPos: 14 * TILE_SIZE, yPos: 10 * TILE_SIZE },
        { xPos: 7 * TILE_SIZE, yPos: 19 * TILE_SIZE },
        { xPos: 22 * TILE_SIZE, yPos: 19 * TILE_SIZE }
    ];
    
    let randomIndex = Math.floor(Math.random() * positions.length);
    let randomPosition = positions[randomIndex];
    
    sprite.xPos = randomPosition.xPos;
    sprite.yPos = randomPosition.yPos;
    
}



function setThrone(sprite)
{
    let thorne;
for (let i = 0; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i];
    if (sprite.id === 9) {
        thorne = sprite;
        break;
    }
}

    thorne.physics.omega = 0.001;

    sprite.xPos          = 200;
    sprite.yPos          = 464;
}
function updateThrone(sprite)
{
    //Actualizamos el angulo de giro
    sprite.physics.angle += sprite.physics.omega * globals.deltaTime;

    //Calculamos la nueva posicion 
    setThronePosition(sprite);

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

function updateBombilla(sprite) {

    let bombillaShot = false; // Inicializamos bombillaShot como false
    let bombilla1;
    let bombilla2;
    let bombilla3;
    let bombilla4;
    // Buscamos bombilla1 y bombilla2 en globals.sprites
    if(globals.currentLevel === 0)
    {
        bombilla1 = globals.spritesBombillas[0];
        bombilla2 = globals.spritesBombillas[1];
    }
    else
    {
        bombilla1 = globals.spritesBombillaslvl2[0];
        bombilla2 = globals.spritesBombillaslvl2[1];
        bombilla3 = globals.spritesBombillaslvl2[2];
        bombilla4 = globals.spritesBombillaslvl2[3];
    }

    // Si no encontramos la bombilla1 o bombilla2, devolvemos para evitar errores
    if (!bombilla1 && !bombilla2 && bombilla3 && bombilla4) return;

    if (!sprite) return; // Evita errores si el sprite no existe

    // Aumentamos el contador de tiempo de frames
    sprite.frames.frameChangeCounter++;

    // Cambiamos de frame cuando el lag de animación alcanza animSpeed
    if (sprite.frames.frameChangeCounter === sprite.frames.speed) {
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter = 0;
    }

    // Si hemos llegado al máximo de frames, reiniciamos el contador (animación cíclica)
    if (sprite.frames.frameCounter === sprite.frames.framesPerState) {
        sprite.frames.frameCounter = 0;
    }

    // Comprobamos si el frameCounter de bombilla1 está en los valores 16, 17 o 18
    if (bombilla1 !== null) {
        if (bombilla1.frames.frameCounter >= 16 && bombilla1.frames.frameCounter <= 18) {
            bombillaShot = true;
        }
    }


    // Generamos el número aleatorio solo si no están activos los disparos y bombillaShot es verdadero
    if ((globals.shot1Active === false || globals.shot2Active === false || globals.shot3Active === false || globals.shot4Active === false) && bombillaShot) {
        let randomNumber = Math.random();

        // Llamamos a la función de disparo si el número es menor a 0.1
        if (randomNumber < 0.1) { 
            // Guardamos la última posición conocida del jugador
            playerXPos = globals.sprites[0].xPos;
            playerYPos = globals.sprites[0].yPos;

            // Solo se crea el disparo si no hay otro activo y si la bombilla no ha sido destruida
            if(globals.currentLevel === 0)
            {
                if (!globals.shot1Active && bombilla1.isActive === true) {
                    initShot1();
                    globals.shot1Active = true;
                } 
                if (!globals.shot2Active ) {
                    initShot2();
                    globals.shot2Active = true;
                }
            }
            else 
            {
                if (!globals.shot1Active && bombilla1.isActive === true) {
                    initShot3();

                    globals.shot1Active = true;
                } 
                if (!globals.shot2Active && bombilla2.isActive === true) {
                    initShot4();

                    globals.shot2Active = true;
                }
                if (!globals.shot3Active && bombilla3.isActive === true  ) {
                    initShot5();

                    globals.shot3Active = true;
                } 
                if (!globals.shot4Active ) {
                    initShot6();

                    globals.shot4Active = true;
                }
            }
        }
    }
}


function updateShot(sprite) {
    updateAnimationFrame(sprite);


    // Usamos la última posición conocida del jugador como objetivo
    let targetX = playerXPos;
    let targetY = playerYPos;

    // Calculamos la diferencia en posición entre el disparo y el objetivo
    let deltaX = targetX - sprite.xPos;
    let deltaY = targetY - sprite.yPos;

    // Normalizamos el vector para que tenga una longitud de 1
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance !== 0) {
        deltaX /= distance;
        deltaY /= distance;
    }

    // Ajustamos la velocidad en función de la distancia (por ejemplo, mayor distancia = mayor velocidad)
    let speedMultiplier = Math.max(2, distance / 50); // Se ajusta 50 según lo que consideres adecuado
    sprite.physics.vx = deltaX * sprite.physics.vLimit * speedMultiplier;
    sprite.physics.vy = deltaY * sprite.physics.vLimit * speedMultiplier;

    // Calculamos la nueva posición según la velocidad
    sprite.xPos += sprite.physics.vx * globals.deltaTime;  // Calculamos el movimiento en X
    sprite.yPos += sprite.physics.vy * globals.deltaTime;  // Calculamos el movimiento en Y

    // Verificamos la nueva posición después de moverse

    // Temporizador para eliminar el sprite después de 5 segundos
    setTimeout(() => {
        const index = globals.sprites.indexOf(sprite);
        if (index > -1) {
            globals.sprites.splice(index, 1);
            
            // Restablecemos los indicadores de disparo una vez que el sprite ha sido eliminado
            globals.shot1Active = false;
            globals.shot2Active = false;
            globals.shot3Active = false;
            globals.shot4Active = false;
        }
    }, 5000); 
}






let canChangeScreen = true; // Controla el retraso en el cambio de pantalla
const SCREEN_CHANGE_DELAY = 250; // Tiempo de retraso en milisegundos

function updateMainScreen(sprite) {


    if (globals.gameState === 3 && canChangeScreen) {
        if (globals.action.changeScreenRight) { // Flecha derecha detectada
            globals.gameState = Game.CONTROLS;
            activateScreenChangeDelay();
        } else if (globals.action.changeScreenLeft) { // Flecha izquierda detectada
            globals.gameState = Game.SCORE;
            activateScreenChangeDelay();
        } else if (globals.action.enter) {
            globals.gameState = Game.LOADING_PLAYING;
            activateScreenChangeDelay();
        }
    }
}

function updateControlScreen(sprite) {

    if (globals.gameState === 5 && canChangeScreen) {
        if (globals.action.changeScreenRight) { // Flecha derecha detectada
            globals.gameState = Game.STORY;
            activateScreenChangeDelay();
        } else if (globals.action.changeScreenLeft) { // Flecha izquierda detectada
            globals.gameState = Game.MAIN;
            activateScreenChangeDelay();
        }
    }
}

function updateStoryScreen(sprite) {

    if (globals.gameState === 6 && canChangeScreen) {
        if (globals.action.changeScreenRight) { // Flecha derecha detectada
            globals.gameState = Game.SCORE;
            activateScreenChangeDelay();
        } else if (globals.action.changeScreenLeft) { // Flecha izquierda detectada
            globals.gameState = Game.CONTROLS;
            activateScreenChangeDelay();
        }
    }
}

function updateScoreScreen(sprite) {

    if (globals.gameState === 4 && canChangeScreen) {
        if (globals.action.changeScreenRight) { // Flecha derecha detectada
            globals.gameState = Game.MAIN;
            activateScreenChangeDelay();
        } else if (globals.action.changeScreenLeft) { // Flecha izquierda detectada
            globals.gameState = Game.STORY;
            activateScreenChangeDelay();
        }
    }
}

// Activa un retraso en el cambio de pantalla
function activateScreenChangeDelay() {
    canChangeScreen = false;
    setTimeout(() => {
        canChangeScreen = true;
    }, SCREEN_CHANGE_DELAY);
}


function updateOverScreen(sprite) {
    sprite.xPos = 0;
    sprite.yPos = 0;


    if(globals.respawnTime.value <= 0)
    {
        globals.life = 3;
        globals.gameState = Game.SCORE;

    }
}

function updateOneLifeLessScreen(sprite) {
    sprite.xPos = 0;
    sprite.yPos = 0;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
    if(globals.respawnTime.value <= 3)
        {
        }
    if(globals.respawnTime.value <= 0)
    {

        globals.gameState = Game.SCORE;

    }
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

function updateOneLifeLessSprites()
{
    for(let i = 0; i < globals.spritesOneLifeLess.length; i++)
    {
        const sprite = globals.spritesOneLifeLess[i];
        updateOneLifeLessSprite(sprite)
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

function updateRespawnTime()
{
    //Incrementaremos el contador de cambio de valor
    globals.respawnTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor de timer
    if (globals.respawnTime.timeChangeCounter > globals.respawnTime.timeChangeValue)
    {
        globals.respawnTime.value--;

        //Resetearemos timeChangerCounter
        globals.respawnTime.timeChangeCounter = 0;
    }


}

function updateStoryTime()
{
    //Incrementaremos el contador de cambio de valor
    globals.StoryTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor de timer
    if (globals.StoryTime.timeChangeCounter > globals.StoryTime.timeChangeValue)
    {
        globals.StoryTime.value++;

        //Resetearemos timeChangerCounter
        globals.StoryTime.timeChangeCounter = 0;
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
            case State.TL:
            case State.TR:
            case State.DL:
            case State.DR:
                sprite.frameCounter = 8;
                sprite.frameChangeCounter = 1;
                sprite.frames.speed = 2;
                break;
    
            
        }
    }

    if(sprite.id == 6)
        {
            switch(sprite.state)
            {
                case State.INACTIVE:

                    sprite.frameCounter = 5;
                    sprite.frameChangeCounter = 1;
                    sprite.frames.speed = 5;
                    break;
        
                case State.ACTIVE:
                    sprite.frameCounter = 1;
                    sprite.frameChangeCounter = 0;
                    sprite.frames.speed = 0;
                    break;
                
            }
        }
    
    //Aumentamos el contador de timepo de frames
    sprite.frames.frameChangeCounter++;

    //Cambiamos de frame cuando el lag de animacion alcanza animSpeed
    if (sprite.frames.frameChangeCounter >= sprite.frames.speed)
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

    const radiusA = 400;
    const radiusB = 200;

    const K = 181;
    const Kp = -111;

    sprite.xPos = sprite.physics.xRotCenter + radiusA * Math.cos(K * sprite.physics.angle)
    sprite.yPos = sprite.physics.yRotCenter + radiusB * Math.sin(Kp * sprite.physics.angle)


    //Centramos el giro respecto del centro del sprite
    sprite.xPos -= sprite.imageSet.xSize/2;
    sprite.yPos -= sprite.imageSet.ySize/2;

}

function readKeyboardAndAssignState(sprite)
{
        // Si el jugador está en estado HIT_*, no cambies el estado
        if (sprite.state >= State.HIT_DOWN && sprite.state <= State.HIT_LEFT) {
            return;
        }

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

let invulnerable = false; 
const INVULNERABLE_TIME = 1500;

function updateLife() {
    let player = globals.sprites[0];
    let potion;

    for(let i = 0; i < globals.sprites.length; i++)
    {

        const sprite = globals.sprites[i];

        if(sprite.id === 8)
            {
                potion = sprite;
            }
    
    }

    if(globals.life < 1)
    {
        invulnerable = true;
        oneLifeLess();
    }
    for (let i = 0; i < globals.sprites.length; ++i) {
        const sprite = globals.sprites[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {

            if (sprite.id === 8) {

                if (globals.life < 3) 
                {
                    globals.life++;
                    updatePotionPosition(potion);
                    

                }
            } 
            else 
            {
                if (!invulnerable && globals.life > 0) {
                    gotHit(player,invulnerable);
                }
            }
        }
    }
    for (let i = 0; i < globals.spritesGorrocopteros.length; ++i) {
        const sprite = globals.spritesGorrocopteros[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {


            
                if (!invulnerable && globals.life > 0) {
                    gotHit(player,invulnerable);
                }
            
        }
    }
    for (let i = 0; i < globals.spritesHormigas.length; ++i) {
        const sprite = globals.spritesHormigas[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {


            
                if (!invulnerable && globals.life > 0) {
                    // Reduce la vida si no está en invulnerabilidad
                    gotHit(player,invulnerable);
                }
            
        }
    }
    for (let i = 0; i < globals.spritesHormigaslvl2.length; ++i) {
        const sprite = globals.spritesHormigaslvl2[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {


            
                if (!invulnerable && globals.life > 0) {
                    // Reduce la vida si no está en invulnerabilidad
                    gotHit(player,invulnerable);
                }
            
        }
    }
    for (let i = 0; i < globals.spritesBombillas.length; ++i) {
        const sprite = globals.spritesBombillas[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {

            
                if (!invulnerable && globals.life > 0) {
                    // Reduce la vida si no está en invulnerabilidad
                    gotHit(player);   
                }
            
        }
    }
    for (let i = 0; i < globals.spritesBombillaslvl2.length; ++i) {
        const sprite = globals.spritesBombillaslvl2[i];
        if (sprite.isCollidingWithPlayer && !(sprite.id === 1 ||sprite.id === 2 || sprite.id === 3)) {

            
                if (!invulnerable && globals.life > 0) {
                    // Reduce la vida si no está en invulnerabilidad
                    gotHit(player);   
                }
            
        }
    }
}

function gotHit(player,)
{
    globals.life--;

    globals.hitNum++;
    globals.spritesOneLifeLess[1].yPos = 140;

    //oneLifeLess();

    updateAngerBarFill(globals.spritesHUD[1], globals.hitNum)

    // Cambia al estado HIT_* correspondiente
    const hitState = getHitState(player.state);

    player.state = hitState;

    // Activa la invulnerabilidad
    invulnerable = true;

    // Configura un temporizador para restaurar el estado original y desactivar invulnerabilidad
    setTimeout(() => {
        const originalState = restoreOriginalState(hitState);
        player.state = originalState;
        invulnerable = false;
        player.xPos = 32;
        player.yPos = 16;
        if(globals.gameState === Game.PLAYING)
        {
            globals.gameState = Game.LOADING_PLAYING;
        }
    }, INVULNERABLE_TIME); // ← Asegúrate de que INVULNERABLE_TIME está definido

}
function updateEnemyLife() {
    let explosion;
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        if (sprite.id === 1) {
            explosion = sprite;
        }
    }

    for (let i = 0; i < globals.spritesGorrocopteros.length; ++i) {
        const sprite = globals.spritesGorrocopteros[i];

        if (sprite.isCollidingWithExplosion) 
        {
            if (sprite === globals.spritesGorrocopteros[0]) {
                globals.spritesGorrocopteros.splice(0, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            } else if (sprite === globals.spritesGorrocopteros[1]) {
                globals.spritesGorrocopteros.splice(1, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            } else if (sprite === globals.spritesGorrocopteros[2]) {
                globals.spritesGorrocopteros.splice(2, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            } else if (sprite === globals.spritesGorrocopteros[3]) {
                globals.spritesGorrocopteros.splice(3, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            } else if (sprite === globals.spritesGorrocopteros[4]) {
                globals.spritesGorrocopteros.splice(4, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            } else if (sprite === globals.spritesGorrocopteros[5]) {
                globals.spritesGorrocopteros.splice(5, 1);
                globals.score += 1500;
                globals.enemycount += 1;
                globals.gorroCounter += 1;
            }
        }
    }
    if(globals.currentLevel === 1)
    {  
        for (let i = 0; i < globals.spritesGorrocopteroslvl2.length; ++i) {
            const sprite = globals.spritesGorrocopteroslvl2[i];

            if (sprite.isCollidingWithExplosion) 
            {
                if (sprite === globals.spritesGorrocopteroslvl2[0]) {
                    globals.spritesGorrocopteroslvl2.splice(0, 1);
                    globals.score += 1500;
                    globals.enemycount += 1;
                    globals.gorroCounter += 1;
                } else if (sprite === globals.spritesGorrocopteroslvl2[1]) {
                    globals.spritesGorrocopteroslvl2.splice(1, 1);
                    globals.score += 1500;
                    globals.enemycount += 1;
                    globals.gorroCounter += 1;
                } else if (sprite === globals.spritesGorrocopteroslvl2[2]) {
                    globals.spritesGorrocopteroslvl2.splice(2, 1);
                    globals.score += 1500;
                    globals.enemycount += 1;
                    globals.gorroCounter += 1;
                } else if (sprite === globals.spritesGorrocopteroslvl2[3]) {
                    globals.spritesGorrocopteroslvl2.splice(3, 1);
                    globals.score += 1500;
                    globals.enemycount += 1;
                    globals.gorroCounter += 1;
                }
            }
        }
    }

    for (let i = 0; i < globals.spritesHormigas.length; ++i) {
        const sprite = globals.spritesHormigas[i];

        if (sprite.isCollidingWithExplosion) 
        {
            if (sprite === globals.spritesHormigas[0]) {
                globals.spritesHormigas.splice(0, 1);
                globals.score += 2000;
                globals.enemycount += 1;
            } else if (sprite === globals.spritesHormigas[1]) {
                globals.spritesHormigas.splice(1, 1);
                globals.score += 2000;
                globals.enemycount += 1;
            }
        }
    }
    if(globals.currentLevel === 1)
    {
            for (let i = 0; i < globals.spritesHormigaslvl2.length; ++i) {
            const sprite = globals.spritesHormigaslvl2[i];

            if (sprite.isCollidingWithExplosion) 
            {
                if (sprite === globals.spritesHormigaslvl2[0]) {
                    globals.spritesHormigaslvl2.splice(0, 1);
                    globals.score += 2000;
                    globals.enemycount += 1;
                } else if (sprite === globals.spritesHormigaslvl2[1]) {
                    globals.spritesHormigaslvl2.splice(1, 1);
                    globals.score += 2000;
                    globals.enemycount += 1;
                }
            }
        }
    }

    for (let i = 0; i < globals.spritesBombillas.length; ++i) {
        const sprite = globals.spritesBombillas[i];

        if (sprite.isCollidingWithExplosion) 
        {
            if (sprite === globals.spritesBombillas[0]) {
                globals.spritesBombillas.splice(0, 1);
                globals.score += 1000;
                globals.enemycount += 1;
                globals.spritesBombillas[0].isActive = false;
            } else if (sprite === globals.spritesBombillas[1]) {
                globals.spritesBombillas.splice(1, 1);
                globals.score += 1000;
                globals.enemycount += 1;
                globals.spritesBombillas[1].isActive = false;
            }
        }
    }
    if(globals.currentLevel === 1)
        {
        for (let i = 0; i < globals.spritesBombillaslvl2.length; ++i) {
            const sprite = globals.spritesBombillaslvl2[i];

            if (sprite.isCollidingWithExplosion) 
            {
                if (sprite === globals.spritesBombillaslvl2[0]) {
                    globals.spritesBombillaslvl2.splice(0, 1);
                    globals.score += 1000;
                    globals.enemycount += 1;
                    globals.spritesBombillaslvl2[0].isActive = false;
                } else if (sprite === globals.spritesBombillaslvl2[1]) {
                    globals.spritesBombillaslvl2.splice(1, 1);
                    globals.score += 1000;
                    globals.enemycount += 1;
                    globals.spritesBombillaslvl2[1].isActive = false;
                } else if (sprite === globals.spritesBombillaslvl2[2]) {
                    globals.spritesBombillaslvl2.splice(2, 1);
                    globals.score += 1000;
                    globals.enemycount += 1;
                    globals.spritesBombillaslvl2[1].isActive = false;
                } else if (sprite === globals.spritesBombillaslvl2[3]) {
                    globals.spritesBombillaslvl2.splice(3, 1);
                    globals.score += 1000;
                    globals.enemycount += 1;
                    globals.spritesBombillaslvl2[1].isActive = false;
                }
            }
        }
}
}


// Devuelve el estado HIT_* correspondiente utilizando múltiples case
function getHitState(currentState) {
    switch (currentState) {
        case 0: // STILL_DOWN
        case 4: // DOWN
            return 8; // HIT_DOWN

        case 1: // STILL_RIGHT
        case 5: // RIGHT
            return 9; // HIT_RIGHT

        case 2: // STILL_UP
        case 6: // UP
            return 10; // HIT_UP

        case 3: // STILL_LEFT
        case 7: // LEFT
            return 11; // HIT_LEFT

        default:
            return currentState; // Si no coincide, no cambia
    }
}


// Restaura el estado original a partir del estado HIT_*
function restoreOriginalState(hitState) {
    switch (hitState) 
    {
        case 8: // HIT_DOWN
            return 0; // STILL_DOWN

        case 9: // HIT_RIGHT
            return 1; // STILL_RIGHT

        case 10: // HIT_UP
            return 2; // STILL_UP

        case 11: // HIT_LEFT
            return 3; // STILL_LEFT

        default:
            return hitState; // Si no coincide, no cambia

    }
}


function calculateCollisionWithFourBorders (sprite)
{
    let collision;
    if(globals.currentLevel === 0)
    {
        collision = detectCollisionBetweenHormigaAndMapObstacles();
    }
    else
    {
        collision = detectCollisionBetweenHormigaAndMapObstacleslvl2();
    }


    if (collision === 1)
    {
        sprite.collisionBorder = Collision.BORDER_RIGHT;
    }
    else if (collision === 2)
    {
        sprite.collisionBorder = Collision.BORDER_LEFT;

    }
    else if (collision === 4)
    {
        sprite.collisionBorder = Collision.BORDER_UP;

    }
    else if (collision === 3)
    {
        sprite.collisionBorder = Collision.BORDER_DOWN;

    }
    else
    {
        sprite.collisionBorder = Collision.NO_COLLISION;
    }
}

function oneLifeLess()
{
    globals.gameState = Game.ONE_LIFE_LESS;
}

function updateCamera()
{
    const player = globals.sprites[0];

    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2);
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) / 2);

}

function updateParticles()
{
    for(let i = 0; i < globals.particles.length; i++)
    {
        const particle = globals.particles[i];
        updateParticle(particle);
    }
}

function updateParticle(particle)
{
    const type = particle.id;
    switch(type)
    {
        case ParticleID.EXPLOSION:

            updateExplosionParticle(particle);
            break;
    }
}

function updateExplosionParticle(particle)
{
    particle.fadeCounter += globals.deltaTime;

    //Cogemos las velocidades de los arrays
    switch(particle.state)
    {
        case ParticleState.ON:
            if(particle.fadeCounter > particle.timeToFade)
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;
            }
            break;

        case ParticleState.FADE:
            particle.alpha -= 0.01;

            if(particle.alpha <= 0)
            {
                particle.state = ParticleState.OFF;
            }
            break;

        case ParticleState.OFF:
            break;
    }
    particle.xPos += particle.vx * globals.deltaTime;
    particle.yPos += particle.vy * globals.deltaTime;

}

function updateMap()
{
    if(globals.score >= 15000 && globals.score < 25000 )
    {
        globals.levels[globals.currentLevel].data[11][14] = 43
        globals.levels[globals.currentLevel].data[11][15] = 43
        globals.levels[globals.currentLevel].data[12][14] = 43
        globals.levels[globals.currentLevel].data[12][15] = 43
    }
    else if(globals.score >= 25000 && globals.score < 39000)
    {
        globals.levels[globals.currentLevel].data[11][14] = 57
        globals.levels[globals.currentLevel].data[11][15] = 56
        globals.levels[globals.currentLevel].data[12][14] = 55
        globals.levels[globals.currentLevel].data[12][15] = 58
    }
    else if(globals.score >= 39000)
    {
        globals.levels[globals.currentLevel].data[11][14] = 4
        globals.levels[globals.currentLevel].data[11][15] = 4
        globals.levels[globals.currentLevel].data[12][14] = 4
        globals.levels[globals.currentLevel].data[12][15] = 4
    }

    if((globals.sprites[0].xPos >= 216 && globals.sprites[0].xPos <= 248) && (globals.sprites[0].yPos >= 168 && globals.sprites[0].yPos <= 200))
    {
        globals.score += 10000
        globals.currentLevel++;
        globals.spritesGorrocopteros.splice(0,6)
        globals.spritesBombillas.splice(0,2)
        globals.spritesHormigas.splice(0,2)
        let lastlvl = globals.currentLevel  - 1;
        if(lastlvl === 0)
        {
        globals.gameState = Game.LOADING_PLAYING;
        }
        else
        {
            globals.gameState = Game.OVER
        }
    }

}