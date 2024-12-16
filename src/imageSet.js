//Clase que gestiona el tileSet de un sprite
export default class ImageSet
{
    constructor(initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset)
    {
        this.initFil    = initFil   // Fila de inicio de nuestro imageSet
        this.initCol    = initCol   // Columna de inicio de nuestro imageSet
        this.xSize      = xSize;    // Tamaño en pixeles de la imagen(X)
        this.ySize      = ySize;    // Tamaño en pixeles de la imagen(Y)
        this.xOffset    = xOffset;  // Offset en de comienzo de dibujo del personaje respecto de la rejilla
        this.yOffset    = yOffset;  // Offset en de comienzo de dibujo del personaje respecto de la rejilla
        this.gridSize   = gridSize; // Tamaño en pixeles de la rejilla contenedora de la imagen (X e Y)
    }
}

