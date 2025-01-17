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

        case Game.OVER:
            drawOver();
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

    renderOverScreen();

    renderHUDOver();

    globals.ctx.strokeStyle = 'black';
    globals.ctx.font = '60px zwackery';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeText("GAME"   , 20, 80);
    globals.ctx.fillText("GAME"     , 20, 80);
    globals.ctx.strokeText("OVER"   , 74, 125);
    globals.ctx.fillText("OVER"     , 74, 125);

}

function drawMain()
{   
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderMainScreen();

    //Dibujamos el HUD
    renderHUDMain();

    let texto =
    [
        "The Shadowed Labyrinth",
        "The curse of the Throne"
    ];


    // Texto 1
    globals.ctx.strokeStyle = 'black';
    globals.ctx.font = '25px zwackery';
    globals.ctx.fillStyle = 'red';
    
    // Calcular el ancho del texto
    const textWidth1 = globals.ctx.measureText(texto[0]).width;
    // Calcular la posición X para centrar el texto
    const x1 = (globals.ctx.canvas.width - textWidth1) / 2;
    
    globals.ctx.strokeText(texto[0], x1, 50);
    globals.ctx.fillText(texto[0], x1, 50);
    
    // Texto 2
    globals.ctx.font = '22px zwackery';
    globals.ctx.fillStyle = 'darkred';
    
    // Calcular el ancho del texto
    const textWidth2 = globals.ctx.measureText(texto[1]).width;
    // Calcular la posición X para centrar el texto
    const x2 = (globals.ctx.canvas.width - textWidth2) / 2;
    
    globals.ctx.strokeText(texto[1], x2, 70);
    globals.ctx.fillText(texto[1], x2, 70);

}


function drawControls()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderControlsScreen();

    //Dibujamos el HUD
    renderHUDControls();

    const texto = 
    [
        "CONTROLS",
        "Movement",
        "Action",
        "W -",
        "A -",
        "S -",
        "D -",
        "SPACE -"
    ];
    

// "CONTROLS" con borde negro
globals.ctx.font = '24px emulogic';
globals.ctx.fillStyle = 'red';
globals.ctx.strokeStyle = 'black';
globals.ctx.lineWidth = 2;
globals.ctx.strokeText(texto[0], 35, 50);  // Borde negro
globals.ctx.fillText(texto[0], 35, 50);    // Relleno rojo

// "Movement" con borde negro
globals.ctx.font = '16px emulogic';
globals.ctx.fillStyle = 'red';
globals.ctx.strokeStyle = 'black';
globals.ctx.strokeText(texto[1], 5, 100);  // Borde negro
globals.ctx.fillText(texto[1], 5, 100);    // Relleno negro

// "Action" con borde negro
globals.ctx.fillStyle = 'red';
globals.ctx.strokeStyle = 'black';
globals.ctx.strokeText(texto[2], 170, 100);  
globals.ctx.fillText(texto[2], 170, 100);    

globals.ctx.font = '8px emulogic';
globals.ctx.strokeText(texto[3], 50, 120);      
globals.ctx.fillText(texto[3], 50, 120);        

globals.ctx.strokeText(texto[4], 50, 140);      
globals.ctx.fillText(texto[4], 50, 140);        

globals.ctx.strokeText(texto[5], 50, 160);      
globals.ctx.fillText(texto[5], 50, 160);        

globals.ctx.strokeText(texto[6], 50, 180);      
globals.ctx.fillText(texto[6], 50, 180);        

globals.ctx.strokeText(texto[7], 175, 120); 
globals.ctx.fillText(texto[7], 175, 120);   

}


function drawStory()
{
let texto = [
    "After managing to escape from the claws,",
    "claws of the throne, Joseph must,",
    "escape from the mansion's forest,",
    "there he will encounter various,",
    "enemies, with whom he can deal,",
    "with his weapons, but that will",
    "be the least of his problems",
    "since the throne follows him,",
    "very closely."
];
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderStoryScreen();

    renderHUDStory();

    globals.ctx.font = '24px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeStyle = 'black';          
    globals.ctx.lineWidth = 2;                  
    globals.ctx.strokeText("STORY", 80, 50);    
    globals.ctx.fillText("STORY", 80, 50);      

    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'white';
    globals.ctx.strokeStyle = 'black'; 
    globals.ctx.lineWidth = 1;         

    globals.ctx.strokeText(texto[0], 5, 90);  
    globals.ctx.fillText(texto[0], 5, 90);    

    globals.ctx.strokeText(texto[1], 8, 98);  
    globals.ctx.fillText(texto[1], 8, 98);    

    globals.ctx.strokeText(texto[2], 7, 106); 
    globals.ctx.fillText(texto[2], 7, 106);   

    globals.ctx.strokeText(texto[3], 9, 114); 
    globals.ctx.fillText(texto[3], 9, 114);   

    globals.ctx.strokeText(texto[4], 15, 122); 
    globals.ctx.fillText(texto[4], 15, 122);   

    globals.ctx.strokeText(texto[5], 10, 130); 
    globals.ctx.fillText(texto[5], 10, 130);   

    globals.ctx.strokeText(texto[6], 20, 138); 
    globals.ctx.fillText(texto[6], 20, 138);   

    globals.ctx.strokeText(texto[7], 18, 146); 
    globals.ctx.fillText(texto[7], 18, 146);   

    globals.ctx.font = '20px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeStyle = 'black';  
    globals.ctx.lineWidth = 2;          
    globals.ctx.strokeText(texto[8], 10, 166); 
    globals.ctx.fillText(texto[8], 10, 166);   


}

function drawScore()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderScoreScreen();

    renderHUDScore();

    globals.ctx.font = '24px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeStyle = 'black';
    globals.ctx.lineWidth = 2;
    globals.ctx.strokeText("HIGHSCORE", 20, 50); // Borde negro
    globals.ctx.fillText("HIGHSCORE", 20, 50);  // Texto rojo
    
    globals.ctx.font = '8px emulogic';
    globals.ctx.fillStyle = 'red';
    
    globals.ctx.font = '16px emulogic';
    globals.ctx.fillStyle = 'white';
    globals.ctx.strokeStyle = "black";
    globals.ctx.lineWidth = 1.5; // Ajusta el grosor del borde
    
    globals.ctx.strokeText("RANK", 15, 70);     // Borde negro
    globals.ctx.fillText("RANK", 15, 70);       // Texto blanco
    globals.ctx.strokeText("NAME", 87, 70);     // Borde negro
    globals.ctx.fillText("NAME", 87, 70);       // Texto blanco
    globals.ctx.strokeText("SCORE", 165, 70);   // Borde negro
    globals.ctx.fillText("SCORE", 165, 70);     // Texto blanco
    
    globals.ctx.font = '8px emulogic';

    // Datos iniciales: posiciones, nombres y puntajes
    let ranks = ["1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH"];  
    let names = ["AAA", "AAB", "AAC", "AAD", "AAE", "AAF", "AAG"];
    let scores = [98310, 7810, 540, 12345, 9876, 6543, 4321];

    // Ordenar los puntajes de mayor a menor, pero mantener posiciones y nombres intactos
    let orderedScores = [...scores].sort((a, b) => b - a);

    // Función para calcular los dígitos de un puntaje
    function calculateScoreDigits(score) 
    {
        if (score > 99999) 
            {
            score = 99999;
        }
        return {
            tenK: Math.floor(score / 10000),
            oneK: Math.floor((score % 10000) / 1000),
            hundred: Math.floor((score % 1000) / 100),
            ten: Math.floor((score % 100) / 10),
            one: score % 10
        };
    }

    // Posiciones de impresión en Y
    let yPositions = [90, 106, 122, 138, 156, 174, 190];

    // Dibujar los resultados
    for (let i = 0; i < ranks.length; i++) 
    {
        const rank = ranks[i];
        const name = names[i];
        const score = orderedScores[i];
        const digits = calculateScoreDigits(score);

        // Dibujar rank y nombre
        globals.ctx.strokeText(`${rank}______${name}_____`, 40, yPositions[i]);
        globals.ctx.fillText(`${rank}______${name}_____`, 40, yPositions[i]);
        // Dibujar los dígitos del puntaje
        globals.ctx.strokeText(digits.tenK, 165, yPositions[i]);
        globals.ctx.fillText(digits.tenK, 165, yPositions[i]);   
        globals.ctx.strokeText(digits.oneK, 173, yPositions[i]);
        globals.ctx.fillText(digits.oneK, 173, yPositions[i]);
        globals.ctx.strokeText(digits.hundred, 181, yPositions[i]);
        globals.ctx.fillText(digits.hundred, 181, yPositions[i]);
        globals.ctx.strokeText(digits.ten, 189, yPositions[i]);
        globals.ctx.fillText(digits.ten, 189, yPositions[i]);
        globals.ctx.strokeText(digits.one, 197, yPositions[i]);
        globals.ctx.fillText(digits.one, 197, yPositions[i]);
    }

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
    //console.log(globals.spritesMain)


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


function renderControlsScreen()
{
    //console.log(globals.spritesControls)

    for(let i = 0; i < globals.spritesControls.length; i++)
    {
        let sprite = globals.spritesControls[i];

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

function renderStoryScreen()
{
    console.log(globals.spritesStory)

    for(let i = 0; i < globals.spritesStory.length; i++)
    {
        let sprite = globals.spritesStory[i];

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

function renderScoreScreen()
{
    console.log(globals.spritesScore)

    for(let i = 0; i < globals.spritesScore.length; i++)
    {
        let sprite = globals.spritesScore[i];

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

function renderOverScreen()
{

    for(let i = 0; i < globals.spritesOver.length; i++)
    {
        let sprite = globals.spritesOver[i];

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
    const life = 1;
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

function renderHUDOver()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("EXIT", 8, 10);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(" <-- ", 1, 20);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("CONTINUE", 218, 10);
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

