import { key } from "./constants.js";
import globals from "./globals.js";

export function keydonwHandler(event)
{
    switch(event.keyCode)
    {
        case key.UP:
            globals.action.moveUp = true;
            break;
        
        case key.DOWN:
            globals.action.moveDown = true;
            break;
    
        case key.LEFT:
            globals.action.moveLeft = true;
            break;
    
        case key.RIGHT:
            globals.action.moveRight = true;
            break;
    }
}

export function keyupHandler(event)
{
    switch(event.keyCode)
    {
        case key.UP:
            globals.action.moveUp = false;
            break;
        
        case key.DOWN:
            globals.action.moveDown = false;
            break;
    
        case key.LEFT:
            globals.action.moveLeft = false;
            break;
    
        case key.RIGHT:
            globals.action.moveRight = false;
            break;
    }
}