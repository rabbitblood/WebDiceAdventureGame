
class monster 
{
    constructor(name, health, attack, defence, xp, gold) 
    {
        this.name       = name;
        this.health     = health;
        this.attack     = attack;
        this.defense    = defence;
        this.xp         = xp;
        this.gold       = gold;
    }
}


//some monster templates
class bat extends monster
{
    constructor()
    {
        super("Bat", 1, 1, 1, 1, 1);

        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/Bat/Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/Bat/Flying.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/Bat/Flying.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/Bat/Hit.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/Bat/Hit.png";

        this.SPRITE_WIDTH  = 46;
        this.SPRITE_HEIGHT = 30;

        this.IDLE_SPRITES       = 12;
        this.ATTACK_SPRITES     = 7;
        this.ROLL_SPRITES       = 7;
        this.DEFENCE_SPRITES    = 5;
        this.DEATH_SPRITES      = 5;
    }
    
}

class rock extends monster
{
    constructor()
    {
        super("Rock", 20, 10, 2, 10, 10);

        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/Rocks/Rock1_Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/Rocks/Rock1_Run.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/Rocks/Rock1_Run.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/Rocks/Rock1_Hit.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/Rocks/Rock1_Hit.png";

        this.SPRITE_WIDTH  = 38;
        this.SPRITE_HEIGHT = 34;

        this.IDLE_SPRITES       = 14;
        this.ATTACK_SPRITES     = 14;
        this.ROLL_SPRITES       = 14;
        this.DEFENCE_SPRITES    = 4;
        this.DEATH_SPRITES      = 4;
    }
}

class chicken extends monster
{
    constructor()
    {
        super("Chicken", 30, 20, 4, 30, 30);
        
        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/Chicken/Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/Chicken/Run.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/Chicken/Run.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/Chicken/Hit.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/Chicken/Hit.png";

        this.SPRITE_WIDTH  = 32;
        this.SPRITE_HEIGHT = 34;

        this.IDLE_SPRITES       = 13;
        this.ATTACK_SPRITES     = 14;
        this.ROLL_SPRITES       = 14;
        this.DEFENCE_SPRITES    = 5;
        this.DEATH_SPRITES      = 5;
    }
}

class angryPig extends monster
{
    constructor()
    {
        super("Angry Pig", 50, 20, 5, 50, 50);

        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/AngryPig/Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/AngryPig/Run.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/AngryPig/Walk.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/AngryPig/Hit1.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/AngryPig/Hit1.png";

        this.SPRITE_WIDTH  = 36;
        this.SPRITE_HEIGHT = 30;

        this.IDLE_SPRITES       = 9;
        this.ATTACK_SPRITES     = 12;
        this.ROLL_SPRITES       = 16;
        this.DEFENCE_SPRITES    = 5;
        this.DEATH_SPRITES      = 5;
    }
}

class rino extends monster
{
    constructor()
    {
        super("Rino", 100, 50, 20, 200, 200);

        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/Rino/Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/Rino/Run.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/Rino/Run.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/Rino/Hit.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/Rino/Hit.png";

        this.SPRITE_WIDTH  = 52;
        this.SPRITE_HEIGHT = 34;

        this.IDLE_SPRITES       = 11;
        this.ATTACK_SPRITES     = 6;
        this.ROLL_SPRITES       = 6;
        this.DEFENCE_SPRITES    = 5;
        this.DEATH_SPRITES      = 5;
    }
}

class ghost extends monster
{
    constructor()
    {
        super("Ghost", 999, 99, 99, 9999, 9999);

        this.IDLE_IMAGE         = new Image();
        this.IDLE_IMAGE.src     = "./../image/monsters/Ghost/Idle.png";
        this.ATTACK_IMAGE       = new Image();
        this.ATTACK_IMAGE.src   = "./../image/monsters/Ghost/Desappear.png";
        this.ROLL_IMAGE         = new Image();
        this.ROLL_IMAGE.src     = "./../image/monsters/Ghost/Desappear.png";
        this.DEFENCE_IMAGE      = new Image();
        this.DEFENCE_IMAGE.src  = "./../image/monsters/Ghost/Hit.png";
        this.DEATH_IMAGE        = new Image();
        this.DEATH_IMAGE.src    = "./../image/monsters/Ghost/Hit.png";

        this.SPRITE_WIDTH  = 44;
        this.SPRITE_HEIGHT = 30;

        this.IDLE_SPRITES       = 10;
        this.ATTACK_SPRITES     = 4;
        this.ROLL_SPRITES       = 4;
        this.DEFENCE_SPRITES    = 5;
        this.DEATH_SPRITES      = 5;

    }
}