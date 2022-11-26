
export class monster 
{
    constructor(name, health, attack, defence, xp) 
    {
        this.name       = name;
        this.health     = health;
        this.attack     = attack;
        this.defense    = defence;
        this.xp         = xp;
    }
}


//some monster templates
export class rat extends monster
{
    constructor()
    {
        super("Rat", 1, 1, 1, 1);
    }
}

export class skeleton extends monster
{
    constructor()
    {
        super("Skeleton", 20, 10, 2, 10);
    }
}

export class wolf extends monster
{
    constructor()
    {
        super("Wolf", 30, 20, 4, 30);
    }
}

export class goblin extends monster
{
    constructor()
    {
        super("Goblin", 50, 20, 5, 50);
    }
}

export class ogre extends monster
{
    constructor()
    {
        super("Ogre", 100, 50, 20, 200);
    }
}

export class dragon extends monster
{
    constructor()
    {
        super("Dragon", 999, 99, 99, 9999);
    }
}