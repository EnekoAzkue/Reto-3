import globals from "./globals.js";
import {Game, SpriteID, State, Tile} from "./constants.js";


//Funcion que renderiza los graficos 
export default function render()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            //Draw loading spinner
            break;

        case Game.PLAYING:
            drawGame();
            break;

        case Game.OVER:
            drawOver();
            break;
            

        case Game.MAIN:
            drawMain();
            break;

        case Game.SCORE:
            drawScore();
            break;
        
        case Game.CONTROLS:
            drawControls();
            break;

        case Game.STORY:
            drawStory();
        break;
        default:
            console.error("Error: Game State invalid");
    }
}

function drawGame()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    //Pintamos los FPS en pantalla
    //globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 30, 30);

    //Dibujamos el mapa(nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();
    drawSpritesHUD();

    //Dibujamos el HUD
    renderHUD();
}

function drawOver()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
}

function drawMain()
{   
    renderMainScreen();

    //Dibujamos el HUD
    renderHUDMain();


}

function drawScore()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderHUDScore();
}

function drawControls()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderHUDControls();
}

function drawStory()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderHUDStory();
}

function renderSprite(sprite)
{

    //Calculamos la posicion del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize; 
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;
    //console.log(`xPosInit: ${xPosInit}`)
    //console.log(`yPosInit: ${yPosInit}`)


    //Calculamos la posicion en el tilemap a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;
    //console.log("ID: " + sprite.id)
    //console.log("STATE: " + sprite.state)
    //console.log(`xTile: ${xTile}`)
    //console.log(`sprite.frames.frameCounter: ${sprite.frames.frameCounter}`)
    //console.log(`sprite.imageSet.gridSize: ${sprite.imageSet.gridSize}`)
    //console.log(`sprite.imageSet.xOffset: ${sprite.imageSet.xOffset}`)
    //console.log(`yTile: ${yTile}`)
    //console.log(`sprite.state: ${sprite.state}`)
    //console.log(`sprite.imageSet.gridSize: ${sprite.imageSet.gridSize}`)
    //console.log(`sprite.imageSet.yOffset: ${sprite.imageSet.yOffset}`)


    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
    globals.ctx.drawImage(                              
        globals.tileSets[Tile.SIZE_16],                 // The image file
        xTile, yTile,                                   // The source x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // The source heignt and width
        xPos, yPos,                                     // The destinaton x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize    // The destinaton heignt and width
    );
    
}

function renderSpriteHUD(sprite, xPos, yPos) 
{
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    globals.ctxHUD.drawImage(
        globals.tileSets[Tile.SIZE_16], // The image file
        xTile, yTile,                  // The source x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize, // Source height and width
        xPos, yPos,                    // Destination x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize  // Destination height and width
    );
}

function drawSprites()
{

    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];

        //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
        //drawSpriteRectangle(sprite);

        renderSprite(sprite);
    }

}

function drawSpritesHUD()
{
    for(let i = 0; i < globals.spritesHUD.length; i++)
        {
            const sprite = globals.spritesHUD[i];
        
            renderSpriteHUD(sprite);
        }
    
}

// function drawSpriteRectangle(sprite)
// {
//     //Datos del sprinte
//     const x1 = Math.floor(sprite.xPos);
//     const y1 = Math.floor(sprite.yPos);
//     const w1 = sprite.imageSet.xSize;
//     const h1 = sprite.imageSet.ySize;

//     globals.ctx.fillStyle = "green";
//     globals.ctx.fillRect(x1, y1, w1, h1);
// }

//Funcion que dibuja el mapa
function renderMap()
{
    const brickSize = globals.Level.imageSet.gridSize;
    const levelData = globals.Level.data;

    //Dibujamos el mapa
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    // console.log(num_fil)
    // console.log(num_col)
    for(let i = 0; i < num_fil; i++)
    {
        for(let j = 0; j < num_col; j++)
        {
            
            // console.log("Num fil: " + i);
            // console.log("Num col: " + j);

            // console.log(levelData[i][j]);

            const xTile = (levelData[i][j] - 1 ) * brickSize;
            const yTile = 0;
            const xPos = j * brickSize;
            const yPos = i * brickSize;

            //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
            globals.ctx.drawImage(  
                globals.tileSets[Tile.SIZE_32], //The image file
                xTile, yTile,                   //The source x and y position
                brickSize, brickSize,           //The source  height and width
                xPos, yPos,                     //The destination x and y position
                brickSize, brickSize,           //The destination height and width
            );
            
        }
    }
}

function renderMainScreen()
{
    for(let i = 0; i < globals.spritesMain.length; i++)
    {
        let sprite = globals.spritesMain[i];
    
    //Calculamos la posicion del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize; 
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;
    //console.log(`xPosInit: ${xPosInit}`)
    //console.log(`yPosInit: ${yPosInit}`)


    //Calculamos la posicion en el tilemap a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;


    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
    globals.ctx.drawImage(                              
        globals.tileSets[Tile.SIZE_16],                 // The image file
        xTile, yTile,                                   // The source x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // The source heignt and width
        xPos, yPos,                                     // The destinaton x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize    // The destinaton heignt and width
    );
    }
}

function renderHUD()
{
    //TEST: datos metidos en bruto
    const score = 1500;
    const highscore = 130000;
    const life = 3;
    const angerLvl = 50;

    //Draw score
    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("SCORE", 8, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + score, 8, 19);

    //Draw Highscore
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("HIGHSCORE", 72, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + highscore, 72, 19);

    //Draw life
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("LIFE", 168, 8);
    
    // Render hearts based on life count
    const heartSpacing = 15; // Spacing between hearts
    for (let i = 0; i < life; i++) {
        const xOffset = 160 + i * heartSpacing; // Dynamic x position for each heart
        const yOffset = 10; // Fixed y position
        renderSpriteHUD(globals.spritesHUD[0], xOffset, yOffset);
    }
    

    //Draw angerLvl
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("AngerLvl", 224, 8);

    // Create gradient for angerLvl
    let gradient = globals.ctxHUD.createLinearGradient(232, 12, 232 + angerLvl, 12);
    gradient.addColorStop(0, '#100000');
    gradient.addColorStop(1, 'red'); 

    globals.ctxHUD.fillStyle = gradient;
    globals.ctxHUD.fillRect(232, 12, angerLvl, 8);

    //Round corners. (remove 1 pixel per corner)
    globals.ctxHUD.fillStyle = 'black';
    globals.ctxHUD.fillRect(232, 12, 1, 1);
    globals.ctxHUD.fillRect(232, 19, 1, 1);
    globals.ctxHUD.fillRect(232 + angerLvl - 1, 12, 1, 1);
    globals.ctxHUD.fillRect(232 + angerLvl - 1, 19, 1, 1);

}

function renderHUDMain()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("SCORE", 8, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" <-- ", 6, 20);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("CONTROLS", 218, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" -->", 232, 20);
}

function renderHUDControls()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("MAIN", 8, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" <-- ", 4, 20);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("STORY", 243, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" -->", 245, 20);
}

function renderHUDStory()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("CONTROLS", 8, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" <-- ", 18, 20);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("SCORE", 242, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" -->", 244, 20);
}

function renderHUDScore()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("STORY", 8, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" <-- ", 6, 20);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("MAIN", 250, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" -->", 248, 20);
}

