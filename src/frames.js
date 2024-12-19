export default class Frames
{
    constructor(framesPerState, speed = 2)
    {
        this.framesPerState     = framesPerState;   //Numero de frames por estado de animacion
        this.frameCounter       = 0;                //Contador de frames
        this.speed              = speed;            //Velocidad de cambio de frame (minimo: 1. A mayor numero mas lento)
        this.frameChangeCounter = 0;                //Contador de velocidad de cambio de frame

    }
}