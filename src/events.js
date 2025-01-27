import { Key } from "./constants.js";
import globals from "./globals.js";

export function keydownHandler(event)
{
    switch(event.keyCode)
    {
        case Key.UP:
            globals.action.moveUp = true;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = true;
            break;
    
        case Key.LEFT:
            globals.action.moveLeft = true;
            break;
    
        case Key.RIGHT:
            globals.action.moveRight = true;
            break;

        case Key.ARROWLEFT:
            globals.action.changeScreenLeft = true;
            break;

        case Key.ARROWRIGHT:
            globals.action.changeScreenRight = true;
            break;

        case Key.ENTER:
            globals.action.enter = true;
            break;
    }
}

export function keyupHandler(event)
{
    switch(event.keyCode)
    {
        case Key.UP:
            globals.action.moveUp = false;
            break;
        
        case Key.DOWN:
            globals.action.moveDown = false;
            break;
    
        case Key.LEFT:
            globals.action.moveLeft = false;
            break;
    
        case Key.RIGHT:
            globals.action.moveRight = false;
            break;

        case Key.ARROWLEFT:
            globals.action.changeScreenLeft = false;
            break;

        case Key.ARROWRIGHT:
            globals.action.changeScreenRight = false;
            break;

        case Key.ENTER:
            globals.action.enter = false;
            break;
    
    }
}