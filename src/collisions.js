import globals from "./globals.js";
import { Block, State } from "./constants.js";

export function detectCollisionsPlayer() {
    // Calculamos colisión del player con cada uno de los sprites
    for (let i = 1; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        if (sprite.id > 0) {
            detectCollisionBetweenPlayerAndSprite(sprite);  // Colisión con sprite
        }
    }

    // Calculamos colisión del player con los obstáculos del mapa
    detectCollisionBetweenPlayerAndMapObstacles();  // Colisión con bloques
}

export function detectCollisionsExplosion() {
    // Calculamos colisión de la explosion con cada uno de los sprites
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        if (sprite.id != 1) 
        {
            detectCollisionBetweenExplosionAndSprite(sprite);  // Colisión con sprite
        }
    }

    // Calculamos colisión de la explosion con los obstáculos del mapa
    detectCollisionBetweenExplosionAndMapObstacles();  // Colisión con bloques
}

function detectCollisionBetweenPlayerAndSprite(sprite) {
    // Resetear el estado de colisión
    sprite.isCollidingWithPlayer = false;

    // Datos del jugador
    const player = globals.sprites[0];
    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    // Datos del sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
    if (isOverlap) 
    {
        // Si hay colisión, marcarla como tal
        sprite.isCollidingWithPlayer = true;

    }
}

function detectCollisionBetweenExplosionAndSprite(sprite) {
    // Resetear el estado de colisión
    sprite.isCollidingWithExplosion = false;

    // Datos del jugador
    const explosion = globals.sprites[1];
    const x1 = explosion.xPos - 16;
    const y1 = explosion.yPos - 16;
    const w1 = explosion.hitBox.xSize * 3;
    const h1 = explosion.hitBox.ySize * 3;



    // Datos del sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
    if (isOverlap) {
        // Si hay colisión, marcarla como tal
        sprite.isCollidingWithExplosion = true;
        console.log("hay colision con sprite")
    }
}

function rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2)
{
    let isOverlap;
    
    //Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2)
    {
        isOverlap = false;
    }
    else
    {
        isOverlap = true;
    }

    return isOverlap;
}

function getMapTileId(xPos,yPos)
{
    const brickSize = globals.Level.imageSet.gridSize;
    const levelData = globals.Level.data;

    const fil = Math.floor(xPos/brickSize);
    const col = Math.floor(yPos/brickSize);
    //console.log(`fil: ${fil} col: ${col}`)

    return levelData[col][fil];

}

function isCollidingWithObstacleAt(xPos,yPos,obstacleId1,obstacleId2,obstacleId3,obstacleId4,obstacleId5,obstacleId6,obstacleId7,obstacleId8,obstacleId9,obstacleId10)
{
    let isColliding;

    const id = getMapTileId(xPos,yPos);

    if(id === obstacleId1 || id === obstacleId2 || id === obstacleId3 || id === obstacleId4 || id === obstacleId5 || id === obstacleId6 || id === obstacleId7 || id === obstacleId8 || id === obstacleId9 || id === obstacleId10)
    {
        isColliding = true;
    }
    else
    {
        isColliding = false;
    }
        
    return isColliding;
}

function detectCollisionBetweenPlayerAndMapObstacles()
{

    const player = globals.sprites[0];

    

    //Reset collision state 
    player.isCollidingWithObstacleOnTheRight = false;


    //Variables to use
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isColliding;
    let overlap;

    const brickSize = globals.Level.imageSet.gridSize;
    const direction = player.state;

    //ID del obstaculo
    //obstaculos:
    //3,5,9,10,11,12,22,23,27,28
    const obstacleId1 = Block.MAZE_TOP_WALL_1;
    const obstacleId2 = Block.MAZE_TOP_WALL_2;
    const obstacleId3= Block.MAZE_LEFT_WALL_3;
    const obstacleId4 = Block.MAZE_BLOCK_1;
    const obstacleId5 = Block.MAZE_BLOCK_2;
    const obstacleId6 = Block.MAZE_RIGHT_WALL_2;
    const obstacleId7 = Block.MAZE_BOT_WALL_1;
    const obstacleId8 = Block.MAZE_BOT_WALL_2;
    const obstacleId9 = Block.MAZE_BOT_WALL_3;
    const obstacleId10 = Block.MAZE_BOT_WALL_4;
    const obstacleId11 = Block.BLOCK;

    //const obstacleId = Block.MAZE_RIGHT_WALL_2

    switch(direction)
    {
        case State.RIGHT:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6,obstacleId11);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6,obstacleId11);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                player.isCollidingWithObstacleOnTheRight = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(xPos) % brickSize;
                player.xPos -= overlap;


            }

            break;
            case State.LEFT:
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5,obstacleId11);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize ;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5,obstacleId11);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if (isColliding) {
                player.isCollidingWithObstacleOnTheLeft = true;

                // Usar cálculo de solapamiento ajustado
                overlap = brickSize - (xPos % brickSize);
                if (overlap === brickSize) overlap = 0;

                player.xPos += overlap; // Ajuste hacia la derecha
            }
            break;


            case State.DOWN:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = (player.yPos + player.hitBox.yOffset + player.hitBox.ySize) + 1 ;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10,obstacleId11);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10,obstacleId11);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                player.isCollidingWithObstacleOnTheBottom = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(yPos) % brickSize;
                player.yPos -= overlap ;

            }
            break;

            case State.UP:
            // Calcular la posición para la primera colisión
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5,obstacleId11);

            // Calcular la posición para la segunda colisión
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 5; // Asegurarse de usar un desplazamiento consistente
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5,obstacleId11);

            // Verificar si hay colisión
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if (isColliding) {
                player.isCollidingWithObstacleOnTheTop = true;

                // Usar cálculo ajustado para el solapamiento
                overlap = brickSize - (yPos % brickSize);
                if (overlap === brickSize) overlap = 0;

                // Ajustar la posición del jugador hacia abajo para corregir el solapamiento
                player.yPos += overlap;
            }
            break;

    }

}

function detectCollisionBetweenExplosionAndMapObstacles()
{

    const explosion = globals.sprites[1];
    
    //Reset collision state 
    explosion.isCollidingWithObstacleOnTheRight = false;


    //Variables to use
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingOnPos5;
    let isCollidingOnPos6;
    let isCollidingOnPos7;
    let isCollidingOnPos8;

    const brickSize = globals.Level.imageSet.gridSize;

    //ID del obstaculo
    //obstaculos:
    //3,5,9,10,11,12,22,23,27,28
    const obstacleId1 = Block.BLOCK;


    //Primera colision en 
    //(
    //[X][-][-]
    //[-][-][-]
    //[-][-][-]
    //)
    xPos = explosion.xPos - 8;
    yPos = explosion.yPos - 8;
    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);
    //Segunda colision en 
    //(
    //[-][X][-]
    //[-][-][-]
    //[-][-][-]
    //)
    xPos = explosion.xPos + 8;
    yPos = explosion.yPos - 8;    
    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);

    //Tercera colision en 
    //(
    //[-][-][X]
    //[-][-][-]
    //[-][-][-]
    //)
    xPos = explosion.xPos + 24;
    yPos = explosion.yPos - 8;
    isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);

    //Cuarta colision en 
    //(
    //[-][-][-]
    //[X][-][-]
    //[-][-][-]
    //)
    xPos = explosion.xPos - 8;
    yPos = explosion.yPos + 8;    
    isCollidingOnPos4 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);
    
    //Quinta colision en 
    //(
    //[-][-][-]
    //[-][-][X]
    //[-][-][-]
    //)
    xPos = explosion.xPos + 24;
    yPos = explosion.yPos +  8;
    isCollidingOnPos5 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);

    //Sexta colision en 
    //(
    //[-][-][-]
    //[-][-][-]
    //[X][-][-]
    //)
    xPos = explosion.xPos - 8;
    yPos = explosion.yPos + 24;    
    isCollidingOnPos6 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);
    
    //Septima colision en 
    //(
    //[-][-][-]
    //[-][-][-]
    //[-][X][-]
    //)
    xPos = explosion.xPos + 8;
    yPos = explosion.yPos + 24;
    isCollidingOnPos7 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);


    //Octava colision en 
    //(
    //[-][-][-]
    //[-][-][-]
    //[-][-][X]
    //)
    xPos = explosion.xPos + 24;
    yPos = explosion.yPos + 24;    
    isCollidingOnPos8 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1);
    //console.log("Pos1: " + isCollidingOnPos1);
    //console.log("Pos2: " + isCollidingOnPos2);
    //console.log("Pos3: " + isCollidingOnPos3);
    //console.log("Pos4: " + isCollidingOnPos4);
    //console.log("Pos5: " + isCollidingOnPos5);
    //console.log("Pos6: " + isCollidingOnPos6);
    //console.log("Pos7: " + isCollidingOnPos7);
    //console.log("Pos8: " + isCollidingOnPos8);

    if(isCollidingOnPos1)
    {
        explosion.isCollidingWithObstacleOnTheTopLeft = true;

        console.log("collision TopLeft");
        const fil = Math.floor((xPos - 16)/brickSize);
        const col = Math.floor((yPos - 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos2)
    {
        explosion.isCollidingWithObstacleOnTheTop = true;

        console.log("collision Top");
        const fil = Math.floor((xPos)/brickSize);
        const col = Math.floor((yPos - 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos3)
    {
        explosion.isCollidingWithObstacleOnTheTopRight = true;

        console.log("collision TopRight");
        const fil = Math.floor((xPos + 16)/brickSize);
        const col = Math.floor((yPos - 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos4)
    {
        explosion.isCollidingWithObstacleOnTheMidLeft = true;

        console.log("collision MidLeft");
        const fil = Math.floor((xPos - 16)/brickSize);
        const col = Math.floor((yPos)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos5)
    {
        explosion.isCollidingWithObstacleOnTheMidRight = true;

        console.log("collision MidRight");
        const fil = Math.floor((xPos + 16)/brickSize);
        const col = Math.floor((yPos)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos6)
    {
        explosion.isCollidingWithObstacleOnTheTopLeft = true;

        console.log("collision BotLeft");
        const fil = Math.floor((xPos - 16)/brickSize);
        const col = Math.floor((yPos + 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos7)
    {
        explosion.isCollidingWithObstacleOnTheTop = true;

        console.log("collision Bot");
        const fil = Math.floor((xPos)/brickSize);
        const col = Math.floor((yPos + 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    if(isCollidingOnPos8)
    {
        explosion.isCollidingWithObstacleOnTheTopRight = true;

        console.log("collision BotRight");
        const fil = Math.floor((xPos + 16)/brickSize);
        const col = Math.floor((yPos + 16)/brickSize);

        globals.Level.data[col - 1][fil - 1] = 4;
    }
    

}


export function detectCollisionBetweenGorrocopteroAndMapObstacles()
{

    const gorrocoptero = globals.sprites[2];

    

    //Reset collision state 
    gorrocoptero.isCollidingWithObstacleOnTheRight = false;


    //Variables to use
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isColliding;
    let overlap;

    const brickSize = globals.Level.imageSet.gridSize;
    const direction = gorrocoptero.state;

    //ID del obstaculo
    //obstaculos:
    //3,5,9,10,11,12,22,23,27,28
    const obstacleId1 = Block.MAZE_TOP_WALL_1;
    const obstacleId2 = Block.MAZE_TOP_WALL_2;
    const obstacleId3= Block.MAZE_LEFT_WALL_3;
    const obstacleId4 = Block.MAZE_BLOCK_1;
    const obstacleId5 = Block.MAZE_BLOCK_2;
    const obstacleId6 = Block.MAZE_RIGHT_WALL_2;
    const obstacleId7 = Block.MAZE_BOT_WALL_1;
    const obstacleId8 = Block.MAZE_BOT_WALL_2;
    const obstacleId9 = Block.MAZE_BOT_WALL_3;
    const obstacleId10 = Block.MAZE_BOT_WALL_4;
    const obstacleId11 = Block.BLOCK;

    switch(direction)
    {
        case State.RIGHT_1:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset + gorrocoptero.hitBox.xSize + 1;
            yPos = gorrocoptero.yPos + gorrocoptero.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6,obstacleId11);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = gorrocoptero.yPos + gorrocoptero.hitBox.yOffset + gorrocoptero.hitBox.ySize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6,obstacleId11);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;
            
        if (isColliding) {
            // Existe colisión a la derecha
            gorrocoptero.isCollidingWithObstacleOnTheRight = true;
        
            // AJUSTE: Calculamos solapamiento (overlap) y lo eliminamos
            overlap = Math.floor(xPos) % brickSize;
            gorrocoptero.xPos -= overlap;
        
            // Lista de posibles nuevas direcciones
            let possibleStates = [];
        
            if (gorrocoptero.state !== State.LEFT_1) possibleStates.push(State.LEFT_1);
            if (gorrocoptero.state !== State.UP_1) possibleStates.push(State.UP_1);
            if (gorrocoptero.state !== State.DOWN_1) possibleStates.push(State.DOWN_1);
        
            // Selecciona una dirección aleatoria de las 3 restantes
            gorrocoptero.state = possibleStates[Math.floor(Math.random() * possibleStates.length)];
        }
            

            break;
            case State.LEFT_1:
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset;
            yPos = gorrocoptero.yPos + gorrocoptero.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5,obstacleId11);

            yPos = gorrocoptero.yPos + gorrocoptero.hitBox.yOffset + gorrocoptero.hitBox.ySize ;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5,obstacleId11);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if (isColliding) {
                gorrocoptero.isCollidingWithObstacleOnTheLeft = true;

                // Usar cálculo de solapamiento ajustado
                overlap = brickSize - (xPos % brickSize);
                if (overlap === brickSize) overlap = 0;

                gorrocoptero.xPos += overlap; // Ajuste hacia la derecha

                // Lista de posibles nuevas direcciones
                let possibleStates = [];

                if (gorrocoptero.state !== State.RIGHT_1) possibleStates.push(State.RIGHT_1);
                if (gorrocoptero.state !== State.UP_1) possibleStates.push(State.UP_1);
                if (gorrocoptero.state !== State.DOWN_1) possibleStates.push(State.DOWN_1);
            
                // Selecciona una dirección aleatoria de las 3 restantes
                gorrocoptero.state = possibleStates[Math.floor(Math.random() * possibleStates.length)];
            
            }
            break;


            case State.DOWN_1:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset;
            yPos = (gorrocoptero.yPos + gorrocoptero.hitBox.yOffset + gorrocoptero.hitBox.ySize) + 1 ;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10,obstacleId11);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset + gorrocoptero.hitBox.xSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10,obstacleId11);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                gorrocoptero.isCollidingWithObstacleOnTheBottom = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(yPos) % brickSize;
                gorrocoptero.yPos -= overlap ;

                // Lista de posibles nuevas direcciones
                let possibleStates = [];
                if (gorrocoptero.state !== State.LEFT_1) possibleStates.push(State.LEFT_1);
                if (gorrocoptero.state !== State.RIGHT_1) possibleStates.push(State.RIGHT_1);
                if (gorrocoptero.state !== State.UP_1) possibleStates.push(State.UP_1);
            
                // Selecciona una dirección aleatoria de las 3 restantes
                gorrocoptero.state = possibleStates[Math.floor(Math.random() * possibleStates.length)];
                
            };

            case State.UP_1:
            // Calcular la posición para la primera colisión
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset;
            yPos = gorrocoptero.yPos + gorrocoptero.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5,obstacleId11);

            // Calcular la posición para la segunda colisión
            xPos = gorrocoptero.xPos + gorrocoptero.hitBox.xOffset + gorrocoptero.hitBox.xSize - 5; // Asegurarse de usar un desplazamiento consistente
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5,obstacleId11);

            // Verificar si hay colisión
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if (isColliding) {
                gorrocoptero.isCollidingWithObstacleOnTheTop = true;

                // Usar cálculo ajustado para el solapamiento
                overlap = brickSize - (yPos % brickSize);
                if (overlap === brickSize) overlap = 0;

                // Ajustar la posición del jugador hacia abajo para corregir el solapamiento
                gorrocoptero.yPos += overlap;

                // Lista de posibles nuevas direcciones
                let possibleStates = [];
                if (gorrocoptero.state !== State.LEFT_1) possibleStates.push(State.LEFT_1);
                if (gorrocoptero.state !== State.RIGHT_1) possibleStates.push(State.RIGHT_1);
                if (gorrocoptero.state !== State.DOWN_1) possibleStates.push(State.DOWN_1);
            
                // Selecciona una dirección aleatoria de las 3 restantes
                gorrocoptero.state = possibleStates[Math.floor(Math.random() * possibleStates.length)];
            }
            break;

    }

}

export function detectCollisionBetweenHormigaAndMapObstacles() {
    const ant = globals.sprites[3];

    // Reset collision state
    ant.isCollidingWithObstacleOnTheRight = false;

    // Variables to use
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingRight;
    let isCollidingLeft;
    let isCollidingTop;
    let isCollidingBot;
    
    let overlap;

    const brickSize = globals.Level.imageSet.gridSize;
    const direction = ant.state;

    // ID del obstáculo
    const obstacleId1 = Block.MAZE_TOP_WALL_1;
    const obstacleId2 = Block.MAZE_TOP_WALL_2;
    const obstacleId3 = Block.MAZE_LEFT_WALL_3;
    const obstacleId4 = Block.MAZE_BLOCK_1;
    const obstacleId5 = Block.MAZE_BLOCK_2;
    const obstacleId6 = Block.MAZE_RIGHT_WALL_2;
    const obstacleId7 = Block.MAZE_BOT_WALL_1;
    const obstacleId8 = Block.MAZE_BOT_WALL_2;
    const obstacleId9 = Block.MAZE_BOT_WALL_3;
    const obstacleId10 = Block.MAZE_BOT_WALL_4;
    const obstacleId11 = Block.BLOCK;

    switch (direction) {
        case State.TR:
            // Primera colisión en (xPos + xSize, yPos)
            xPos = ant.xPos + ant.hitBox.xOffset + ant.hitBox.xSize - 10;
            yPos = ant.yPos + ant.hitBox.yOffset -1;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);

            // Segunda colision en (xPos, yPos)
            xPos = ant.xPos + ant.hitBox.xOffset -1;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);

            // Tercera colisión en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = ant.xPos + ant.hitBox.xOffset + ant.hitBox.xSize - 6;
            yPos = ant.yPos + ant.hitBox.yOffset +2;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);
            
            // Cuarta colisión en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = ant.yPos + ant.hitBox.yOffset + ant.hitBox.ySize + 2;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);
            
            isCollidingTop = isCollidingOnPos1 || isCollidingOnPos2;
            isCollidingRight = isCollidingOnPos3 || isCollidingOnPos4;

        
            if (isCollidingTop) {
                ant.isCollidingWithObstacleOnTheTop = true;
    
                // Usar cálculo ajustado para el solapamiento
                overlap = brickSize - (yPos % brickSize);
                if (overlap === brickSize) overlap = 0;
    
                // Ajustar la posición del jugador hacia abajo para corregir el solapamiento
                ant.yPos += overlap - 6;
                return 4;
            }
            if (isCollidingRight) {
                // Existe colisión a la derecha
                ant.isCollidingWithObstacleOnTheRight = true;
    
                // AJUSTE: Calculamos solapamiento (overlap) y lo eliminamos
                overlap = Math.floor(xPos) % brickSize;
                ant.xPos -= overlap ;
    
                return 1;
            }
            break;
    
        case State.TL:
            // Calcular la posición para la primera colisión
            xPos = ant.xPos + ant.hitBox.xOffset;
            yPos = ant.yPos + ant.hitBox.yOffset -1;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5, obstacleId11);
    
            // Calcular la posición para la segunda colisión
            xPos = ant.xPos + ant.hitBox.xOffset + ant.hitBox.xSize - 9 ;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5, obstacleId11);

            // Tercera colisión en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = ant.xPos + ant.hitBox.xOffset -2;
            yPos = ant.yPos + ant.hitBox.yOffset +2;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);
            
            // Cuarta colisión en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = ant.yPos + ant.hitBox.yOffset + ant.hitBox.ySize + 2;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);
            
            // Verificar si hay colisión
            isCollidingTop = isCollidingOnPos1 || isCollidingOnPos2;
            isCollidingLeft = isCollidingOnPos3 || isCollidingOnPos4;
            if (isCollidingTop) {
                ant.isCollidingWithObstacleOnTheTop = true;
    
                // Usar cálculo ajustado para el solapamiento
                overlap = brickSize - (yPos % brickSize);
                if (overlap === brickSize) overlap = 0;
    
                // Ajustar la posición del jugador hacia abajo para corregir el solapamiento
                ant.yPos += overlap - 6;
                return 4;
            }

            if (isCollidingLeft) {
                ant.isCollidingWithObstacleOnTheLeft = true;
    
                // Usar cálculo de solapamiento ajustado
                overlap = brickSize - (xPos % brickSize);
                if (overlap === brickSize) overlap = 0;
    
                ant.xPos += overlap ; // Ajuste hacia la derecha
    
                return 2;
            }
            break;
    
        case State.DR:
            // Primera colisión en (xPos + xSize - 1, yPos)
            xPos = ant.xPos + ant.hitBox.xOffset +1;
            yPos = ant.yPos + ant.hitBox.yOffset + ant.hitBox.ySize + 4;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId7, obstacleId8, obstacleId9, obstacleId10, obstacleId11);
    
            // Segunda colisión en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = ant.xPos + ant.hitBox.xOffset + (ant.hitBox.xSize)  - 8;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId7, obstacleId8, obstacleId9, obstacleId10, obstacleId11);
    
            // Primera colisión en (xPos + xSize, yPos)
            xPos = ant.xPos + ant.hitBox.xOffset + ant.hitBox.xSize -7;
            yPos = ant.yPos + ant.hitBox.yOffset;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);

            // Segunda colision en (xPos, yPos)
            yPos = ant.yPos + ant.hitBox.yOffset + (ant.hitBox.ySize - 1) ;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);


            // Habrá colisión si toca alguno de los 2 bloques
            isCollidingBot = isCollidingOnPos1 || isCollidingOnPos2;
            isCollidingRight = isCollidingOnPos3 || isCollidingOnPos4;
    
            if (isCollidingBot) {
                // Existe colisión a la derecha (hacia abajo)
                ant.isCollidingWithObstacleOnTheBottom = true;
    
                // AJUSTE: Calculamos solapamiento (overlap) y lo eliminamos
                overlap = Math.floor(yPos) % brickSize;
                ant.yPos -= overlap - 10;
    
                return 3;

            }
            if (isCollidingRight) {
                // Existe colisión a la derecha
                ant.isCollidingWithObstacleOnTheRight = true;
    
                // AJUSTE: Calculamos solapamiento (overlap) y lo eliminamos
                overlap = Math.floor(xPos) % brickSize;
                ant.xPos -= overlap +2;
    
                return 1;
            }
            break;
    
        case State.DL:
            // Primera colisión en (xPos + xSize - 1, yPos)
            xPos = ant.xPos + (ant.hitBox.xOffset + 1);
            yPos = ant.yPos + ant.hitBox.yOffset + ant.hitBox.ySize + 4;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId7, obstacleId8, obstacleId9, obstacleId10, obstacleId11);
    
            // Segunda colisión en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = ant.xPos + ant.hitBox.xOffset + ant.hitBox.xSize - 6;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId7, obstacleId8, obstacleId9, obstacleId10, obstacleId11);
    
            // Primera colisión en (xPos + xSize, yPos)
            xPos = ant.xPos + ant.hitBox.xOffset - 1;
            yPos = ant.yPos + ant.hitBox.yOffset ;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);

            // Segunda colision en (xPos, yPos)
            yPos = ant.yPos + ant.hitBox.yOffset + ant.hitBox.ySize + 3;
            isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, obstacleId4, obstacleId5, obstacleId6, obstacleId11);

            // Verificar si hay colisión
            isCollidingBot = isCollidingOnPos1 || isCollidingOnPos2;
            isCollidingLeft = isCollidingOnPos3 || isCollidingOnPos4;
    
            if (isCollidingBot) {
                // Existe colisión a la derecha (hacia abajo)
                ant.isCollidingWithObstacleOnTheBottom = true;
    
                // AJUSTE: Calculamos solapamiento (overlap) y lo eliminamos
                overlap = Math.floor(yPos) % brickSize;
                ant.yPos -= overlap - 14;
    
                return 3;

            }
            if (isCollidingLeft) {
                ant.isCollidingWithObstacleOnTheLeft = true;
    
                // Usar cálculo de solapamiento ajustado
                overlap = brickSize - (xPos % brickSize);
                if (overlap === brickSize) overlap = 0;
    
                ant.xPos += overlap ; // Ajuste hacia la derecha
    
                return 2;
            }
            break;
    }
}    