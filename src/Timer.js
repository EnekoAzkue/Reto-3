export default class Timer
{
    constructor(value, timeChangeValue)
    {
        this.value = value;                     //Valor del temporizador 
        this.timeChangeCounter = 0;             //temporizador para cambiar valor(seconds)
        this.timeChangeValue = timeChangeValue; //timepo para cambiar valor(seconds)
    }
}