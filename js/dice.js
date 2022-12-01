const MAX_SIDE = 6;
const MIN_SIDE = 1;

class dice{
    constructor() 
    {
        this.sides = MAX_SIDE;
    }

    roll() 
    {
        //get random number between MIN_SIDE and dice sides
        return Math.floor(Math.random() * this.sides) + MIN_SIDE;
    }

    getDiceFace(side)
    {
        //check if side is valid
        if(side<MIN_SIDE || side>MAX_SIDE)
        {
            return null;
        }

        //return dice face image
        const img = new Image();
        img.src = `./../image/dice/dice${side}.png`;
        return img;
    }
}