import { Collision } from "./constants.js";

//Clase gestora de los sprites
export default class Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        this.id                                     = id;       //Tipo de Sprite
        this.state                                  = state;    //Estado de animacion del sprite
        this.xPos                                   = xPos;     //Posicion en X en Canvas
        this.yPos                                   = yPos;     //Posicion en Y en Canvas
        this.imageSet                               = imageSet; //Datos de las imagenes del sprite
        this.frames                                 = frames;   //Datos de los frames de animacion
        this.physics                                = physics;  //Datos de las fisicas
        this.hitBox                                 = hitBox;
        this.isCollidingWithPlayer                  = false;
        this.isCollidingWithExplosion               = false;
        this.isCollidingWithObstacleOnTheTop        = false;
        this.isCollidingWithObstacleOnTheLeft       = false;
        this.isCollidingWithObstacleOnTheBottom     = false;
        this.isCollidingWithObstacleOnTheRight      = false;
    }
}

export class Hormiga extends Sprite
{
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox)

        this.collisionBorder = Collision.NO_COLLISION;
    }
}