export default class Physics
{
    constructor(vLimit,aLimit,omega,angle,xRotCenter,yRotCenter,jumpForce = 0)
    {
        this.vx = 0;                        //Velocidad actual en el eje X(px/s)
        this.vy = 0;                        //Velocidad actual en el eje Y(px/s)
        this.vLimit = vLimit;               //Velocidad maxima a la que puede ir el sprite
        this.ax = 0;                        //Aceleracion en eje X
        this.ay = 0;                        //Aceleracion en eje Y
        this.aLimit = aLimit;               //Aceleracion al limite. (Por defecto 0. No hay aceleracion)
        this.omega = omega;                 //Velocidad angular rad/s
        this.angle = angle;                 //Angulo actual(rad)
        this.xRotCenter = xRotCenter;       //Centro de rotacion del sprite X(Movimiento circular)
        this.yRotCenter = yRotCenter;       //Centro de rotacion del sprite Y(Movimineto circular)
        this.jumpForce = jumpForce;

    }
}