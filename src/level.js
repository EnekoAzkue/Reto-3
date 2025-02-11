export class Level
{
    constructor(data, imageSet)
    {
        this.data       = data;     // Array bidimensional de datos del mapa
        this.imageSet   = imageSet  // Datos de las imagenes del mapa
    }
}

//Datos del nivel1
export const level1 =
[
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 16, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    
];

export const level2 = 
[
    [29,30,31,31,31,31,31,31,31,31,33,31,31,31,31,30,29],
    [36,37,46,46,46,46,46,66,46,46,46,46,46,46,46,38,39],
    [29,51,46,65,46,65,46,64,46,65,46,65,46,65,66,52,35],
    [36,37,46,64,46,44,46,64,66,67,46,44,46,44,44,38,39],
    [29,51,46,66,46,65,46,64,44,67,46,65,46,65,46,52,35],
    [36,37,66,64,66,44,46,44,46,44,46,67,66,67,46,38,39],
    [29,51,44,64,44,65,46,65,46,65,46,67,44,67,46,52,35],
    [36,37,46,44,46,64,46,44,46,67,46,44,46,67,66,38,39],
    [29,51,46,65,46,64,46,65,46,67,46,65,46,67,44,52,35],
    [36,37,46,44,46,44,46,64,46,44,46,44,46,44,46,38,39],
    [29,51,46,65,66,65,46,64,66,65,46,65,66,65,66,52,35],
    [36,37,46,44,64,44,46,44,44,44,46,44,44,44,44,38,39],
    [57,58,59,59,59,59,59,59,59,59,59,59,59,59,59,61,57]
];

// [1,2,3,3,3,3,3,3,3,5,5,5,5,5,5,6,7],
// [8,9,18,18,18,18,18,18,17,19,19,19,19,19,19,12,13],
// [1,9,4,10,4,10,4,10,4,11,4,11,4,11,26,12,7],
// [8,9,26,10,25,17,4,10,4,17,4,11,4,17,4,12,13],
// [1,9,4,10,4,10,16,10,16,11,16,11,4,11,4,12,7],
// [8,9,26,17,25,10,4,17,4,17,25,11,4,11,4,12,13],
// [1,9,4,10,10,10,4,4,4,4,4,11,4,11,26,12,7],
// [8,9,4,10,17,16,4,4,4,4,4,16,4,17,4,12,13],
// [1,9,4,10,4,10,26,10,16,11,4,11,4,11,4,12,7],
// [8,9,24,17,4,10,10,17,4,11,25,17,11,11,4,12,13],
// [1,9,4,10,4,10,4,10,26,11,4,11,17,11,4,12,7],
// [8,9,4,17,24,17,4,17,4,17,4,17,4,17,4,12,13],
// [1,22,23,22,23,22,23,22,22,28,27,28,27,28,27,28,7]