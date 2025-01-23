//Constants

//Estados del juego
export const Game = 
{
    INVALID:    -1,
    LOADING:    0,
    PLAYING:    1,
    OVER:       2,
    MAIN:       3,
    SCORE:      4,
    CONTROLS:   5,
    STORY:      6
};

//Velocidad del juego
export const FPS = 30;

export const SpriteID =
{
    PLAYER: 0,
    BOMB: 1,
    MAZE_BLOCK: 2,
    FARM_BLOCK: 3,
    GORROCOPTERO: 4,
    HORMIGA: 5,
    BOMBILLA: 6, 
    HEART: 7,
    HEALTHPOTION: 8,
    THRONE: 9,
    MAINSCREEN: 10,
    CONTROLSSCREEN: 11,
    STORYSCREEN: 12,
    SCORESCREEN: 13,
    OVERSCREEN: 14,
    PLAYERC1: 15,
    PLAYERC2: 16,
    PLAYERC3: 17,
    PLAYERC4: 18,
    PLAYERMAIN: 19,
    
}

//Identificador de estado de sprite(direccion)
export const State =
{
    //Estados de PLAYER
    STILL_DOWN:           0,
    STILL_RIGHT:          1,
    STILL_UP:             2,
    STILL_LEFT:           3,
    DOWN:                 4,
    RIGHT:                5,
    UP:                   6,
    LEFT:                 7,
    HIT_DOWN:             8,
    HIT_RIGHT:            8,
    HIT_UP:               10,
    HIT_LEFT:             11,
    DED_DOWN:             12,
    DED_RIGHT:            13,
    DED_UP:               14,
    DED_LEFT:             15,


    //Estados de BOMB
    BLUE:       0,
    RED:        1,
    EXPLOSION:  2,

    //Estados de BLOCK
    STILL:      0,
    DESTROYED:  1,

    //Estados de GORROCOPTERO
    DOWN_1:     0,
    UP_1:       1,
    LEFT_1:     2,
    RIGHT_1:    3,

    //Estados de UNIQUASINDERECHOS
    DOWN_2:     0,
    UP_2:       1,
    LEFT_2:     2,
    RIGHT_2:    3,

    //Estados de BOMBILLA
    INACTIVE:   0,
    ACTIVE:     1,

    //Estados de HEART, HEALTHPOTION, THRONE, MAINSCREEN
    STILL:      0,
}

//Diferentes TileSets
export const Tile = 
{
    SIZE_16: 0, //Sprites de 16*16
    SIZE_32: 1,  //Tiles del mapa 32*32
    
}

export const Key = 
{
    UP:     87,
    DOWN:   83,
    RIGHT:  68,
    LEFT:   65
}

export const Block =
{
    EMPTY:      0,
    MAZE_LEFT_WALL_1:      1,
    MAZE_LEFT_CORNER:    2,
    MAZE_TOP_WALL_1:    3,
    MAZE_DIRT1:     4,
    MAZE_TOP_WALL_2:       5,
    MAZE_RIGHT_CORNER:  6,
    MAZE_RIGHT_WALL_1:  7,
    MAZE_LEFT_WALL_2: 8,
    MAZE_LEFT_WALL_3: 9,
    MAZE_BLOCK_1: 10,
    MAZE_BLOCK_2: 11,
    MAZE_RIGHT_WALL_2: 12,
    MAZE_RIGHT_WALL_3: 13,
    EMPTY2: 14,
    MAZE_LEFT_WALL_4: 15,
    MAZE_LEFT_WALL_5: 16,
    MAZE_DIRT2: 17,
    MAZE_DIRT3: 18,
    MAZE_DIRT4: 19,
    MAZE_RIGHT_WALL_4: 20,
    MAZE_RIGHT_WALL_5: 21,
    MAZE_BOT_WALL_1: 22,
    MAZE_BOT_WALL_2: 23,
    FLOWER_1: 24,
    FLOWER_2: 25,
    FLOWER_3: 26,
    MAZE_BOT_WALL_3: 27,
    MAZE_BOT_WALL_4: 28,
    FARM_LEFT_WALL_1: 29,
    FARM_LEFT_TOP_CORNER: 30,
    FARM_TOP_WALL_1: 31,
    FARM_DIRT_1: 32,
    FARM_TOP_WALL_2: 33,
    FARM_RIGHT_TOP_CORNER: 34,
    FARM_RIGHT_WALL_1: 35,
    FARM_LEFT_WALL_2: 36,
    FARM_LEFT_WALL_3: 37,
    FARM_RIGHT_WALL_2: 38,
    FARM_RIGHT_WALL_3: 39,
    EMPTY3: 40,
    EMPTY4: 41,
    EMPTY5: 42,
    FARM_LEFT_WALL_4: 43,
    FARM_DIRT_2: 44,
    FARM_DIRT_3: 45,
    FARM_DIRT_4: 46,
    FARM_RIGHT_WALL_4: 47,
    EMPTY6: 48,
    EMPTY7: 49,
    FARM_LEFT_WALL_5: 50,
    FARM_LEFT_WALL_6: 51,
    FARM_RIGHT_WALL_5: 52,
    FARM_RIGHT_WALL_6: 53,
    EMPTY8: 54,
    EMPTY9: 55,
    EMPTY10: 56,
    FARM_LEFT_BOT_CORNER: 57,
    FARM_BOT_WALL_1: 58,
    FARM_BOT_WALL_2: 59,
    FARM_BOT_WALL_3: 60,
    FARM_BOT_WALL_4: 61,
    FARM_RIGHT_BOT_CORNER: 62,
    EMPTY11: 63,
    FARM_BLOCK_1: 64,
    FARM_BLOCK_2: 65,
    FARM_BLOCK_3: 66,
    FARM_BLOCK_4: 67,
    EMPTY12: 68,
    EMPTY13: 68,
    EMPTY14: 70
}