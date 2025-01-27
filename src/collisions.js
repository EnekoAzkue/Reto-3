import globals from "./globals.js";
import { Block, State } from "./constants.js";

export default function detectCollisions() {
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
    if (isOverlap) {
        // Si hay colisión, marcarla como tal
        sprite.isCollidingWithPlayer = true;

        if (sprite.id === 2) {
            // Colisión con el sprite con id 2

            // Calcular las posiciones de colisión dependiendo de la dirección del jugador
            const direction = player.state;  // Direcciones: RIGHT, LEFT, UP, DOWN
            let xPos, yPos, isCollidingOnPos1, isCollidingOnPos2, isColliding, overlap;

            switch (direction) {
                case State.RIGHT:
                    // Colisión en la derecha (ajuste al solapamiento)
                    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
                    yPos = player.yPos + player.hitBox.yOffset;
                    isCollidingOnPos1 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
                    isCollidingOnPos2 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    isColliding = isCollidingOnPos1 || isCollidingOnPos2;

                    if (isColliding) {
                        overlap = Math.floor(xPos) % globals.Level.imageSet.gridSize;
                        player.xPos -= overlap; // Ajuste hacia la izquierda
                    }
                    break;

                case State.LEFT:
                    // Colisión en la izquierda (ajuste al solapamiento)
                    xPos = player.xPos + player.hitBox.xOffset;
                    yPos = player.yPos + player.hitBox.yOffset;
                    isCollidingOnPos1 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 1;
                    isCollidingOnPos2 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    isColliding = isCollidingOnPos1 || isCollidingOnPos2;

                    if (isColliding) {
                        overlap = globals.Level.imageSet.gridSize - (xPos % globals.Level.imageSet.gridSize);
                        if (overlap === globals.Level.imageSet.gridSize) overlap = 0;
                        player.xPos += overlap; // Ajuste hacia la derecha
                    }
                    break;

                case State.DOWN:
                    // Colisión hacia abajo (ajuste al solapamiento)
                    xPos = player.xPos + player.hitBox.xOffset;
                    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize  + 2;
                    isCollidingOnPos1 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
                    isCollidingOnPos2 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    isColliding = isCollidingOnPos1 || isCollidingOnPos2;

                    if (isColliding) {
                        overlap = Math.floor(yPos) % globals.Level.imageSet.gridSize;
                        player.yPos -= overlap -1; // Ajuste hacia arriba
                    }
                    break;

                case State.UP:
                    // Colisión hacia arriba (ajuste al solapamiento)
                    xPos = player.xPos + player.hitBox.xOffset;
                    yPos = player.yPos + player.hitBox.yOffset;
                    isCollidingOnPos1 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 5;
                    isCollidingOnPos2 = rectIntersect(xPos, yPos, player.hitBox.xSize, player.hitBox.ySize, sprite.xPos + sprite.hitBox.xOffset, sprite.yPos + sprite.hitBox.yOffset, sprite.hitBox.xSize, sprite.hitBox.ySize);

                    isColliding = isCollidingOnPos1 || isCollidingOnPos2;

                    if (isColliding) {
                        overlap = globals.Level.imageSet.gridSize - (yPos % globals.Level.imageSet.gridSize);
                        if (overlap === globals.Level.imageSet.gridSize) overlap = 0;
                        player.yPos += overlap; // Ajuste hacia abajo
                    }
                    break;
            }
        }
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
    
    //const obstacleId = Block.MAZE_RIGHT_WALL_2

    switch(direction)
    {
        case State.RIGHT:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize + 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6);


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
    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5);

    yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize ;
    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId3, obstacleId4, obstacleId5);

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
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10);


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
    isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5);

    // Calcular la posición para la segunda colisión
    xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 5; // Asegurarse de usar un desplazamiento consistente
    isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleId1, obstacleId2, obstacleId4, obstacleId5);

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
