import globals from "./globals.js";
import { Block, State } from "./constants.js";

export default function detectCollisions()
{
    //Calculamos colision del player con cada uno de los sprites
    for(let i = 1; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
        //console.log(globals.sprites[i].id)
        if(globals.sprites[i].id > 0)
        {
            detectCollisionBetweenPlayerAndSprite(sprite);
        }
    }

    //Calculamos colision del player con los obstaculos del mapa
    detectCollisionBetweenPlayerAndMapObstacles();
}

function detectCollisionBetweenPlayerAndSprite(sprite)
{
    //Reset collision state
    sprite.isCollidingWithPlayer = false;

    //Nuestro player esta en la posicion 0
    const player = globals.sprites[0];


    //Datos del player
    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    //Datos del otro sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2)
    if(isOverlap)
    {
        //Existe Colision
        sprite.isCollidingWithPlayer = true
        //console.log(sprite.isCollidingWithPlayer)
    }

}

function rectIntersect(x1,y1,w1,h1,x2,y2,w2,h2)
{
    let isOverlap;
    
    //Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2)
    {
        isOverlap = false;
        //  console.log(isOverlap);
    }
    else
    {
        isOverlap = true;
        //console.log(isOverlap);
    }

    return isOverlap;
}

function getMapTileId(xPos,yPos)
{
    const brickSize = globals.Level.imageSet.gridSize;
    const levelData = globals.Level.data;

    const fil = Math.floor(xPos/brickSize);
    const col = Math.floor(yPos/brickSize);

    //console.log(fil)
    //console.log(col)

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
    //console.log(isColliding);
        
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
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId6);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 4;
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
                player.xPos -= overlap - 1;

            }

            //console.log(player.isCollidingWithObstacleOnTheRight)   
            break;
            case State.LEFT:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId3,obstacleId4,obstacleId5);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize + 4;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId3,obstacleId4,obstacleId5);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                player.isCollidingWithObstacleOnTheLeft = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(xPos) / brickSize;
                player.xPos += overlap;
            }
            //console.log(player.isCollidingWithObstacleOnTheRight)   
            break;

            case State.DOWN:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = (player.yPos + player.hitBox.yOffset + player.hitBox.ySize) + 4;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 5;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId4,obstacleId5,obstacleId7,obstacleId8,obstacleId9,obstacleId10);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                player.isCollidingWithObstacleOnTheBottom = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(xPos) / brickSize;
                player.yPos -= overlap;
            }
            //console.log(player.isCollidingWithObstacleOnTheRight)   
            break;

            case State.UP:

            //Primera colision en (xPos + xSize - 1, yPos)
            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1,obstacleId2,obstacleId4,obstacleId5);


            //Segunda colision en (xPos + xSize - 1, yPos + ySize - 1)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 5;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos,yPos,obstacleId1,obstacleId2,obstacleId4,obstacleId5);


            //Habra colision si toca alguno de los 2 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2;

            if(isColliding)
            {
                //Existe colision a la derecha
                player.isCollidingWithObstacleOnTheTop = true;

                //AJUSTE: Calculamos solapamiento(ovelap) y lo eliminamos 
                //moviendo el personaje tantos pixeles como overlap a la izq
                overlap = Math.floor(xPos) / brickSize;
                player.yPos += overlap;
            }
            //console.log(player.isCollidingWithObstacleOnTheRight)   
            break;

        default:
            //Resto de estados. A rellenar
            break;
    }

}
