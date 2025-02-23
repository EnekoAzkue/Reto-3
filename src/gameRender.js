import globals from "./globals.js";
import {Game, ParticleState, Tile, ParticleID} from "./constants.js";


//Funcion que renderiza los graficos 
export default function render()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            //Draw loading spinner
            break;

        case Game.LOADING_PLAYING:
            drawLoadingLvl();
            break;

        case Game.PLAYING:
            drawGame();
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

        case Game.ONE_LIFE_LESS:
            drawOneLifeLess();
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

    moveCamera();

    //Dibujamos el mapa(nivel)

    renderMap();
    

    //Dibujamos los elementos
    drawSprites();
    drawGorrocopteros();
    drawHormigas();
    drawBombillas();


    restoreCamera();
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

let loadingProgress = 0;
let loadingComplete = false;

function drawLoadingLvl() {
    
    // Borrar la pantalla
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderOverScreen();

    // Dibujar texto del mundo y nivel
    globals.ctx.strokeStyle = 'black';
    globals.ctx.font = '40px zwackery';
    globals.ctx.fillStyle = 'white';
    let levelText = `${globals.currentWorld + 1} - ${globals.currentLevel + 1}`;
    let textWidth = globals.ctx.measureText(levelText).width;

    globals.ctx.strokeText(levelText, (globals.canvas.width - textWidth) / 2, globals.canvas.height / 2);
    globals.ctx.fillText(levelText, (globals.canvas.width - textWidth) / 2, globals.canvas.height / 2);

    // Posición de la barra o mensaje "READY!"
    let barWidth = 150;
    let barHeight = 20;
    let barX = (globals.canvas.width - barWidth) / 2;
    let barY = (globals.canvas.height / 2) + 50;

    if (!loadingComplete) {
        // Dibujar la barra de carga
        globals.ctx.strokeStyle = 'black';
        globals.ctx.strokeRect(barX, barY, barWidth, barHeight);

        globals.ctx.fillStyle = 'red';
        globals.ctx.fillRect(barX, barY, (loadingProgress / 100) * barWidth, barHeight);

        // Incrementar la carga con pausas
        let increment = Math.random() * 10;
        loadingProgress += increment;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            loadingComplete = true;

            // Borra solo la barra cuando se completa
            setTimeout(() => {
                globals.ctx.clearRect(barX - 5, barY - 5, barWidth + 10, barHeight + 10);
            }, 200);
        }

        setTimeout(drawLoadingLvl, 200 + Math.random() * 200);
    } else {
        // Dibujar el mensaje "READY!" en lugar de la barra
        globals.ctx.font = '30px zwackery';
        globals.ctx.fillStyle = 'white';
        globals.ctx.fillText("READY!", barX + 20, barY + 15);
        globals.ctx.font = '15px zwackery';
        globals.ctx.fillText("PRESS ENTER", barX + 30, barY + 30);


    }
}





function drawOneLifeLess()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderOneLifeLessScreen();
    globals.ctx.strokeStyle = 'black';
    globals.ctx.font = '40px zwackery';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeText("YOU"    , 55, 70);
    globals.ctx.fillText("YOU"      , 55, 70);
    globals.ctx.strokeText("DIED"   , 115, 105);
    globals.ctx.fillText("DIED"     , 115, 105);
    renderOneLifeLessSprite();


    renderHUDOneLifeLess();

}

// Configuración para el parpadeo del texto
let textVisible = true; // Controla si el texto es visible o no
const TEXT_BLINK_INTERVAL = 500; // Intervalo de parpadeo en milisegundos
let lastBlinkTime = Date.now(); // Última vez que se alternó la visibilidad del texto

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
        "The curse of the Throne",
        "Press ENTER to play"
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
    
    globals.ctx.strokeText(texto[1], x2, 75);
    globals.ctx.fillText(texto[1], x2, 75);

    // Texto 3 con parpadeo
    const currentTime = Date.now();
    if (currentTime - lastBlinkTime >= TEXT_BLINK_INTERVAL) {
        textVisible = !textVisible;
        lastBlinkTime = currentTime;
    }

    if (textVisible) {
        globals.ctx.font = '18px zwackery';
        globals.ctx.fillStyle = 'white';
        
        // Calcular el ancho del texto
        const textWidth3 = globals.ctx.measureText(texto[2]).width;
        // Calcular la posición X para centrar el texto
        const x3 = (globals.ctx.canvas.width - textWidth3) / 2;
        
        globals.ctx.strokeText(texto[2], x3, 120);
        globals.ctx.fillText(texto[2], x3, 120);
    }

    renderParticles();
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

let texto = [
    "After managing to escape from the",
    "claws of the throne, Joseph must",
    "escape from the mansion's forest,",
    "there he will encounter various",
    "enemies, with whom he can deal",
    "with his weapons, but that will",
    "be the least of his problems",
    "since the throne follows him,",
    "very",
    "closely."
];

let yOffset = 400; 
const INITIAL_TEXT_SCROLL_SPEED = 1.05; // Velocidad inicial más rápida
let textScrollSpeed = INITIAL_TEXT_SCROLL_SPEED; // Velocidad dinámica
const TEXT_SCALE_SPEED = 0.0005; // Reducción del texto 
const DECELERATION_FACTOR = 0.998; // Factor de desaceleración

function drawStory() {
    if (globals.gameState !== Game.STORY) {
        return;
    }

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderStoryScreen();
    renderHUDStory();

    globals.ctx.save();

    globals.ctx.translate(globals.canvas.width / 2, yOffset);
    let scale = Math.max(0.5, 1 - TEXT_SCALE_SPEED * (400 - yOffset));
    globals.ctx.scale(scale, scale); 

    globals.ctx.font = '24px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.strokeStyle = 'black';          
    globals.ctx.lineWidth = 2;                  
    globals.ctx.strokeText("STORY", -globals.ctx.measureText("STORY").width / 2, 0);    
    globals.ctx.fillText("STORY", -globals.ctx.measureText("STORY").width / 2, 0);      

    globals.ctx.font = '8px emulogic';
    globals.ctx.strokeStyle = 'black'; 
    globals.ctx.lineWidth = 1;         

    for (let i = 0; i < texto.length; i++) {
        let textWidth = globals.ctx.measureText(texto[i]).width;
        if (textWidth > globals.canvas.width * 0.8) {
            globals.ctx.font = '8px emulogic';
        }
        let yPos = 50 + i * 20;
        if (i === texto.length - 2) {
            globals.ctx.font = '40px emulogic';
            globals.ctx.fillStyle = 'red'; 
            yPos += 25; // Separar más las últimas dos líneas
        }
        else if(i === texto.length - 1) 
        {
            yPos += 50; 
            globals.ctx.font = '40px emulogic';
        }
        else 
        {
            globals.ctx.fillStyle = 'white'; 
        }
        globals.ctx.strokeText(texto[i], -globals.ctx.measureText(texto[i]).width / 2, yPos);  
        globals.ctx.fillText(texto[i], -globals.ctx.measureText(texto[i]).width / 2, yPos);    
    }
    

    globals.ctx.restore(); // Restaurar el estado del contexto

    // Actualizar la posición y el tamaño del texto con desaceleración progresiva
    if (yOffset > -texto.length * 40) {
        yOffset -= textScrollSpeed;
        textScrollSpeed *= DECELERATION_FACTOR; 
    }
}




setInterval(() => {
    if (globals.gameState === Game.STORY) {
        drawStory();
    }
}, 16); 

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

        //TEST: Dibuja el hitBox
        //drawHitBox(sprite);
    }

}

function drawGorrocopteros()
{

    if(globals.currentLevel === 0)
        {
            
            for(let i = 0; i < globals.spritesGorrocopteros.length; i++)
                {
                    const sprite = globals.spritesGorrocopteros[i];
            
                    //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
                    //drawSpriteRectangle(sprite);
            
                    renderSprite(sprite);
            
                    //TEST: Dibuja el hitBox
                    //drawHitBox(sprite);
                }
        }
        else
        {
            for(let i = 0; i < globals.spritesGorrocopteroslvl2.length; i++)
                {
                    const sprite = globals.spritesGorrocopteroslvl2[i];
            
            
            
                    //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
                    //drawSpriteRectangle(sprite);
            
                    renderSprite(sprite);
            
                    //TEST: Dibuja el hitBox
                    //drawHitBox(sprite);
                }
        }

}

function drawHormigas()
{


    if(globals.currentLevel === 0)
        {
            
            for(let i = 0; i < globals.spritesHormigas.length; i++)
                {
                    const sprite = globals.spritesHormigas[i];
            
                    //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
                    //drawSpriteRectangle(sprite);
            
                    renderSprite(sprite);
            
                    //TEST: Dibuja el hitBox
                    //drawHitBox(sprite);
                }
        }
        else
        {
            for(let i = 0; i < globals.spritesHormigaslvl2.length; i++)
                {
                    const sprite = globals.spritesHormigaslvl2[i];
            
            
            
                    //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
                    //drawSpriteRectangle(sprite);
            
                    renderSprite(sprite);
            
                    //TEST: Dibuja el hitBox
                    //drawHitBox(sprite);
                }
        }

}

function drawBombillas()
{
    if(globals.currentLevel === 0)
    {
        
        for(let i = 0; i < globals.spritesBombillas.length; i++)
        {
            const sprite = globals.spritesBombillas[i];

            //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
            //drawSpriteRectangle(sprite);

            renderSprite(sprite);

            //TEST: Dibuja el hitBox
            //drawHitBox(sprite);
        }
    }
    else
    {
        for(let i = 0; i < globals.spritesBombillaslvl2.length; i++)
            {
                const sprite = globals.spritesBombillaslvl2[i];
    
                //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
                //drawSpriteRectangle(sprite);
    
                renderSprite(sprite);
    
                //TEST: Dibuja el hitBox
                drawHitBox(sprite);
            }
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
    const brickSize = globals.levels[globals.currentLevel].imageSet.gridSize;
    const levelData = globals.levels[globals.currentLevel].data;

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

function renderOneLifeLessScreen()
{


        let sprite = globals.spritesOneLifeLess[0];

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

function renderOneLifeLessSprite()
{
    let sprite = globals.spritesOneLifeLess[1];
    sprite.rotationAngle = sprite.rotationAngle || 0; // Inicializa el ángulo si no existe
    
    // Aumentar el ángulo en cada frame antes de dibujar
    sprite.rotationAngle += 10;
    if (sprite.rotationAngle >= 360) {
        sprite.rotationAngle = 0; // Reinicia el ángulo cuando llega a 360°
    }
    
    // Calculamos la posición del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize; 
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;
    
    // Calculamos la posición en el tilemap
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;
    
    // Posición en pantalla
    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);
    
    globals.ctx.save(); // Guardamos el estado del contexto
    
    // Trasladamos al centro del sprite
    globals.ctx.translate(xPos + sprite.imageSet.xSize / 2, yPos + sprite.imageSet.ySize / 2);
    
    // Convertimos el ángulo a radianes y rotamos
    let angleRadians = sprite.rotationAngle * Math.PI / 180;
    globals.ctx.rotate(angleRadians);
    
    // Escalamos si es necesario
    globals.ctx.scale(2, 2);
    
    // Dibujamos el sprite centrado en el origen actual
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_16],  // Imagen
        xTile, yTile,                    // Posición en el tilemap
        sprite.imageSet.xSize, sprite.imageSet.ySize, // Tamaño del sprite
        -sprite.imageSet.xSize / 2, -sprite.imageSet.ySize / 2, // Centrado
        sprite.imageSet.xSize, sprite.imageSet.ySize  // Tamaño destino
    );
    
    globals.ctx.restore(); // Restauramos el contexto
    
}

function renderHUD()
{
    //TEST: datos metidos en bruto
    const highscore = 130000;

    //Draw score
    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("SCORE", 8, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + globals.score, 8, 19);

    //Draw Highscore
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("HIGHSCORE", 72, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + highscore, 72, 19);

    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("LIFE", 167, 8);
    // Render hearts based on life count
    const heartSpacing = 15; // Spacing between hearts
    for (let i = 0; i < globals.life; i++) {
        const xOffset = 160 + i * heartSpacing; // Dynamic x position for each heart
        const yOffset = 10; // Fixed y position
        renderSpriteHUD(globals.spritesHUD[0], xOffset, yOffset);
    }
    

    //Draw angerLvl
    globals.ctxHUD.fillStyle = 'darkred';
    globals.ctxHUD.fillText("AngerLvl", 224, 8);

    //Draw angerLvl Bar Fill
    renderSpriteHUD(globals.spritesHUD[1], 235, 10);

    //Draw angerLvl Bar
    renderSpriteHUD(globals.spritesHUD[2], 230, 8);



    // // Create gradient for angerLvl
    // let gradient = globals.ctxHUD.createLinearGradient(232, 12, 232 + angerLvl, 12);
    // gradient.addColorStop(0, '#100000');
    // gradient.addColorStop(1, 'red'); 

    // globals.ctxHUD.fillStyle = gradient;
    // globals.ctxHUD.fillRect(232, 12, angerLvl, 8);

    // //Round corners. (remove 1 pixel per corner)
    // globals.ctxHUD.fillStyle = 'black';
    // globals.ctxHUD.fillRect(232, 12, 1, 1);
    // globals.ctxHUD.fillRect(232, 19, 1, 1);
    // globals.ctxHUD.fillRect(232 + angerLvl - 1, 12, 1, 1);
    // globals.ctxHUD.fillRect(232 + angerLvl - 1, 19, 1, 1);

    //Draw timer
    globals.ctxHUD.fillStyle = 'white';
    if(globals.enemycount >= 2
    )
    {
        globals.ctxHUD.fillText("" + Math.ceil(globals.enemycount), 130, 22);
    }

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

function renderHUDOneLifeLess()
{
    const score = 1500;

    const time = 420;

    globals.ctxHUD.fillStyle = 'white';
    globals.ctxHUD.font = '10px emulogic';
    globals.ctxHUD.fillText("Exit in: "     , 60, 15);
    globals.ctxHUD.fillText(globals.respawnTime.value , 200, 15);
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

function drawHitBox(sprite)
{
    //Datos del sprite
    const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
    const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
    const w1 = sprite.hitBox.xSize;
    const h1 = sprite.hitBox.ySize;

    globals.ctx.strokeStyle = "red";
    globals.ctx.strokeRect(x1,y1,h1,w1);
}

function moveCamera() {
    const canvas = document.getElementById("gameScreen");
    const mapWidth = 480; // Ancho total del mapa en píxeles
    const mapHeight = 384; // Alto total del mapa en píxeles

    const viewportWidth = canvas.width;
    const viewportHeight = canvas.height;

    // Limitar la cámara para que no se salga del borde
    globals.camera.x = Math.max(0, Math.min(globals.camera.x, mapWidth - viewportWidth));
    globals.camera.y = Math.max(0, Math.min(globals.camera.y, mapHeight - viewportHeight));

    const xTranslation = -globals.camera.x;
    const yTranslation = -globals.camera.y;

    globals.ctx.setTransform(1, 0, 0, 1, xTranslation, yTranslation);
}


function restoreCamera()
{
    globals.ctx.setTransform(1,0,0,1,0,0);
}

function renderParticles()
{
    for(let i = 0; i < globals.particles.length; i++)
    {
        const particle = globals.particles[i];
        renderParticle(particle);
    }
}

function renderParticle(particle)
{
    const type = particle.id;
    switch(type)
    {
        //Caso del jugador
        case ParticleID.EXPLOSION:
            renderExplosionParticle (particle);
            break;
        

        default:
            break;
    }
}

function renderExplosionParticle(particle)
{
    if(particle.state != ParticleState.OFF)
    {
        globals.ctx.fillStyle = "blue";
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, Math.PI * 2);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}