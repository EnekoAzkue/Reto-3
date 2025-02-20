export class Level
{
    constructor(data, imageSet)
    {
        this.data       = data;     // Array bidimensional de datos del mapa
        this.imageSet   = imageSet  // Datos de las imagenes del mapa
    }
}

// Datos del nivel1
export const level1 = [
    [1,  2,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  6,  7],
    [8,  9,  18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 12, 13],
    [14, 15, 4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  20, 21],
    [8,  9,  4,  4,  10, 10, 10, 10, 10, 10, 10, 16, 16, 10, 4,  26, 11, 16, 16, 11, 11, 11, 11, 11, 11, 11, 4,  4,  12, 13],
    [14, 15, 4,  4,  10, 26, 4,  4,  4,  4,  10, 4,  4,  10, 4,  4,  11, 4,  4,  11, 4,  4,  4,  4,  26, 11, 4,  4,  20, 21],
    [8,  9,  4,  4,  10, 10, 10, 16, 10, 10, 10, 4,  4,  10, 24, 26, 11, 4,  25, 11, 11, 11, 16, 11, 11, 11, 4,  4,  12, 13],
    [14, 15, 4,  4,  16, 4,  4,  4,  10, 4,  4,  4,  4,  10, 4,  24, 11, 4,  25, 24, 4,  11, 4,  4,  4,  16, 4,  4,  20, 21],
    [8,  9,  4,  4,  10, 10, 10, 10, 10, 4,  4,  4,  26, 10, 26, 4,  11, 26, 4,  4,  4,  11, 11, 11, 11, 11, 4,  4,  12, 13],
    [14, 15, 4,  4,  16, 4,  24, 4,  25, 25, 4,  10, 10, 10, 16, 16, 11, 11, 11, 4,  24, 25, 24, 4,  4,  16, 4,  4,  20, 21],
    [8,  9,  4,  4,  16, 4,  24, 24, 25, 4,  4,  10, 26, 4,  25, 25, 4,  26, 11, 4,  4,  4,  4,  4,  4,  16, 4,  4,  12, 13],
    [14, 15, 4,  4,  10, 10, 10, 10, 10, 10, 10, 10, 4,  24, 4,  4,  24, 4,  11, 11, 11, 11, 11, 11, 11, 11, 4,  4,  20, 21],
    [8,  9,  4,  4,  25, 25, 4,  24, 4,  4,  4,  16, 4,  25, 10, 11, 25, 4,  16, 4,  24, 4,  4,  24, 24, 4,  4,  4,  12, 13],
    [14, 15, 4,  4,  24, 25, 25, 24, 4,  4,  4,  16, 24, 25, 10, 11, 25, 24, 16, 4,  24, 25, 24, 25, 24, 4,  4,  4,  20, 21],
    [8,  9,  4,  4,  10, 10, 10, 10, 10, 10, 10, 10, 24, 4,  26, 26, 4,  24, 11, 11, 11, 11, 11, 11, 11, 11, 4,  4,  12, 13],
    [14, 15, 4,  4,  16, 24, 24, 24, 24, 4,  26, 10, 10, 26, 4,  4,  26, 11, 11, 26, 4,  4,  4,  4,  4,  16, 4,  4,  20, 21],
    [8,  9,  4,  4,  16, 4,  4,  4,  4,  4,  4,  4,  10, 10, 16, 16, 11, 11, 4,  4,  4,  4,  4,  4,  4,  16, 4,  4,  12, 13],
    [14, 15, 4,  4,  10, 10, 10, 4,  4,  4,  4,  4,  26, 10, 26, 4,  11, 26, 4,  4,  4,  4,  4,  11, 11, 11, 4,  4,  20, 21],
    [8,  9,  4,  10, 10, 16, 16, 4,  4,  4,  4,  4,  24, 10, 4,  24, 11, 4,  4,  4,  4,  4,  4,  16, 16, 11, 11, 4,  12, 13],
    [14, 15, 4,  10, 10, 16, 16, 26, 4,  26, 4,  4,  25, 10, 24, 26, 11, 25, 24, 4,  26, 4,  26, 16, 16, 11, 11, 4,  20, 21],
    [8,  9,  4,  10, 10, 10, 10, 4,  4,  4,  4,  4,  4,  10, 4,  4,  11, 4,  24, 4,  4,  4,  4,  11, 11, 11, 11, 4,  12, 13],
    [14, 15, 4,  4,  10, 10, 10, 10, 10, 16, 16, 10, 10, 10, 4,  26, 11, 11, 11, 16, 16, 11, 11, 11, 11, 11, 4,  4,  20, 21],
    [8,  9,  4,  4,  10, 4,  10, 4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  11, 4,  11, 4,  4,  12, 13],
    [14, 15, 4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  20, 21],
    [8,  22, 23, 22, 23, 22, 23, 22, 23, 22, 23, 22, 23, 22, 23, 27, 28, 27, 28, 27, 28, 27, 28, 27, 28, 27, 28, 27, 28, 13]
];

export const level2 = 
[
    [29,30,31,31,31,31,31,31,31,31,31,31,31,31,31,33,33,33,33,33,33,33,33,33,33,33,33,33,34,35],
    [36,37,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,38,39],
    [45,46,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,47,48],
    [36,37,43,43,59,59,56,56,56,56,56,56,56,56,43,43,57,57,57,57,57,57,57,57,60,60,43,43,38,39],
    [45,46,43,43,59,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,60,43,43,47,48],
    [36,37,43,43,56,43,56,59,56,43,43,55,43,43,59,60,43,43,58,43,43,57,60,57,43,57,43,43,38,39],
    [45,46,43,43,55,43,59,43,59,43,43,55,43,43,59,60,43,43,58,43,43,60,43,60,43,58,43,43,47,48],
    [36,37,43,43,55,43,56,59,56,43,43,55,43,43,43,43,43,43,58,43,43,57,60,57,43,58,43,43,38,39],
    [45,46,43,43,55,43,43,43,43,43,43,59,59,56,56,57,57,60,60,43,43,43,43,43,43,58,43,43,47,48],
    [36,37,43,43,55,56,56,56,56,56,59,59,59,43,43,43,43,60,60,60,57,57,57,57,57,58,43,43,38,39],
    [45,46,43,43,55,43,43,43,43,43,43,57,43,43,43,43,43,43,57,43,43,43,43,43,43,58,43,43,47,48],
    [36,37,43,43,43,43,43,59,59,43,43,55,43,43,56,57,43,43,58,43,43,60,60,43,43,43,43,43,38,39],
    [45,46,43,43,43,43,43,59,59,43,43,55,43,43,55,58,43,43,58,43,43,60,60,43,43,43,43,43,47,48],
    [36,37,43,43,55,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,57,43,43,38,39],
    [45,46,43,43,55,56,56,56,56,56,59,59,59,43,43,43,43,60,60,60,57,57,57,57,57,58,43,43,47,48],
    [36,37,43,43,55,43,43,43,43,43,43,59,59,56,56,57,57,60,60,43,43,43,43,43,43,58,43,43,38,39],
    [45,46,43,43,55,43,56,59,56,43,43,56,43,43,43,43,43,43,57,43,43,57,60,57,43,58,43,43,47,48],
    [36,37,43,43,55,43,59,43,59,43,43,55,43,43,59,60,43,43,58,43,43,60,43,60,43,58,43,43,38,39],
    [45,46,43,43,55,43,56,59,56,43,43,55,43,43,59,60,43,43,58,43,43,57,60,57,43,58,43,43,47,48],
    [36,37,43,43,59,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,60,43,43,38,39],
    [45,46,43,43,59,59,56,56,56,56,56,55,56,56,43,43,57,57,58,57,57,57,57,57,60,60,43,43,47,48],
    [36,37,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,38,39],
    [45,46,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,47,48],
    [49,50,51,51,51,51,51,51,51,51,51,51,51,51,51,52,52,52,52,52,52,52,52,52,52,52,52,52,53,54]
];


// Level pruebas
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 16, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
// [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]


// [1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,5,5,5,5,5,5,6,7],
// [8,9,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,12,13],
// [14,15,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,4,10,10,10,10,10,10,10,16,16,10,4,26,11,16,16,11,11,11,11,11,11,11,4,4,12,13],
// [14,15,4,4,10,26,4,4,4,4,10,4,4,10,4,4,11,4,4,11,4,4,4,4,26,11,4,4,20,21],
// [8,9,4,4,10,10,10,16,10,10,10,4,4,10,24,26,11,4,25,11,11,11,16,11,11,11,4,4,12,13],
// [14,15,4,4,16,4,4,4,10,4,4,4,4,10,4,24,11,4,25,24,4,11,4,4,4,16,4,4,20,21],
// [8,9,4,4,10,10,10,10,10,4,4,4,26,10,26,4,11,26,4,4,4,11,11,11,11,11,4,4,12,13],
// [14,15,4,4,16,4,24,4,25,25,4,10,10,10,16,16,11,11,11,4,24,25,24,4,4,16,4,4,20,21],
// [8,9,4,4,16,4,24,24,25,4,4,10,26,4,25,25,4,26,11,4,4,4,4,4,4,16,4,4,12,13],
// [14,15,4,4,10,10,10,10,10,10,10,10,4,24,4,4,24,4,11,11,11,11,11,11,11,11,4,4,20,21],
// [8,9,4,4,25,25,4,24,4,4,4,16,4,25,10,11,25,4,16,4,24,4,4,24,24,4,4,4,12,13],
// [14,15,4,4,24,25,25,24,4,4,4,16,24,25,10,11,25,24,16,4,24,25,24,25,24,4,4,4,20,21],
// [8,9,4,4,10,10,10,10,10,10,10,10,24,4,26,26,4,24,11,11,11,11,11,11,11,11,4,4,12,13],
// [14,15,4,4,16,24,24,24,24,4,26,10,10,26,4,4,26,11,11,26,4,4,4,4,4,16,4,4,20,21],
// [8,9,4,4,16,4,4,4,4,4,16,16,10,10,16,16,11,11,16,16,4,4,4,4,4,16,4,4,12,13],
// [14,15,4,4,10,10,10,16,10,10,16,16,26,10,26,4,11,26,16,16,11,11,16,11,11,11,4,4,20,21],
// [8,9,4,10,10,16,16,4,10,4,10,4,24,10,4,24,11,4,4,11,4,11,4,16,16,11,11,4,12,13],
// [14,15,4,10,10,16,16,26,10,26,10,4,25,10,24,26,11,25,24,11,26,11,26,16,16,11,11,4,20,21],
// [8,9,4,10,10,10,10,4,10,4,10,4,4,10,4,4,11,4,24,11,4,11,4,11,11,11,11,4,12,13],
// [14,15,4,4,10,10,10,16,10,16,10,16,16,10,4,26,11,16,16,11,16,11,16,11,11,11,4,4,20,21],
// [8,9,4,4,10,4,10,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,11,4,11,4,4,12,13],
// [14,15,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,20,21],
// [8,22,23,22,23,22,23,22,23,22,23,22,23,22,23,27,28,27,28,27,28,27,28,27,28,27,28,27,28,13]

// Level 2-1
// [1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,5,5,5,5,5,5,6,7],
// [8,9,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,12,13],
// [14,15,10,10,10,11,4,4,24,25,26,4,10,10,10,4,4,4,4,10,10,10,4,4,4,4,4,4,20,21],
// [8,9,4,16,4,10,4,4,4,4,4,4,4,16,4,4,10,11,4,4,4,16,4,4,4,4,4,4,12,13],
// [14,15,10,4,10,4,4,4,24,25,26,4,4,4,10,4,16,4,4,4,10,4,4,4,4,4,4,4,20,21],
// [8,9,4,16,4,16,4,4,4,4,4,4,4,16,4,4,4,4,4,16,4,4,4,4,4,4,4,4,12,13],
// [14,15,10,4,10,4,4,4,24,25,26,4,10,4,10,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,12,13],
// [14,15,4,10,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,16,4,16,4,4,4,4,4,4,4,16,4,4,4,4,4,16,4,4,4,4,4,4,4,4,12,13],
// [14,15,10,4,10,4,4,4,24,25,26,4,10,4,10,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,12,13],
// [14,15,4,10,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,16,4,16,4,4,4,4,4,4,4,16,4,4,4,4,4,16,4,4,4,4,4,4,4,4,12,13],
// [14,15,10,4,10,4,4,4,24,25,26,4,10,4,10,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,12,13],
// [14,15,4,10,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,9,4,16,4,16,4,4,4,4,4,4,4,16,4,4,4,4,4,16,4,4,4,4,4,4,4,4,12,13],
// [14,15,10,4,10,4,4,4,24,25,26,4,10,4,10,4,4,4,4,10,4,4,4,4,4,4,4,4,20,21],
// [8,22,23,22,23,22,23,22,23,22,23,22,23,22,23,27,28,27,28,27,28,27,28,27,28,27,28,27,28,13]

//lvl1-2
// [29,30,31,31,31,31,31,31,31,31,31,31,31,31,31,33,33,33,33,33,33,33,33,33,33,33,33,33,34,35],
// [36,37,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,38,39],
// [45,46,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,47,48],
// [36,37,43,43,59,59,56,56,56,56,56,56,56,56,43,43,57,57,57,57,57,57,57,57,60,60,43,43,38,39],
// [45,46,43,43,59,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,60,43,43,47,48],
// [36,37,43,43,56,43,56,59,56,43,43,55,43,43,59,60,43,43,58,43,43,57,60,57,43,57,43,43,38,39],
// [45,46,43,43,55,43,59,43,59,43,43,55,43,43,59,60,43,43,58,43,43,60,43,60,43,58,43,43,47,48],
// [36,37,43,43,55,43,56,59,56,43,43,55,43,43,43,43,43,43,58,43,43,57,60,57,43,58,43,43,38,39],
// [45,46,43,43,55,43,43,43,43,43,43,59,59,56,56,57,57,60,60,43,43,43,43,43,43,58,43,43,47,48],
// [36,37,43,43,55,56,56,56,56,56,59,59,59,43,43,43,43,60,60,60,57,57,57,57,57,58,43,43,38,39],
// [45,46,43,43,55,43,43,43,43,43,43,57,43,43,43,43,43,43,57,43,43,43,43,43,43,58,43,43,47,48],
// [36,37,43,43,43,43,43,59,59,43,43,55,43,43,56,57,43,43,58,43,43,60,60,43,43,43,43,43,38,39],
// [45,46,43,43,43,43,43,59,59,43,43,55,43,43,55,58,43,43,58,43,43,60,60,43,43,43,43,43,47,48],
// [36,37,43,43,55,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,57,43,43,38,39],
// [45,46,43,43,55,56,56,56,56,56,59,59,59,43,43,43,43,60,60,60,57,57,57,57,57,58,43,43,47,48],
// [36,37,43,43,55,43,43,43,43,43,43,59,59,56,56,57,57,60,60,43,43,43,43,43,43,58,43,43,38,39],
// [45,46,43,43,55,43,56,59,56,43,43,56,43,43,43,43,43,43,57,43,43,57,60,57,43,58,43,43,47,48],
// [36,37,43,43,55,43,59,43,59,43,43,55,43,43,59,60,43,43,58,43,43,60,43,60,43,58,43,43,38,39],
// [45,46,43,43,55,43,56,59,56,43,43,55,43,43,59,60,43,43,58,43,43,57,60,57,43,58,43,43,47,48],
// [36,37,43,43,59,43,43,43,43,43,43,55,43,43,43,43,43,43,58,43,43,43,43,43,43,60,43,43,38,39],
// [45,46,43,43,59,59,56,56,56,56,56,55,56,56,43,43,57,57,58,57,57,57,57,57,60,60,43,43,47,48],
// [36,37,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,38,39],
// [45,46,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,47,48],
// [49,50,51,51,51,51,51,51,51,51,51,51,51,51,51,52,52,52,52,52,52,52,52,52,52,52,52,52,53,54]