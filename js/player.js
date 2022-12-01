class player{
    constructor()
    {

        this.playerMaxHealth = 30;
        this.playerHealth    = 30;
        this.playerAttack    = 10;
        this.playerDefence   = 0;


        this.PLAYER_IDLE_IMAGE     = new Image();
        this.PLAYER_IDLE_IMAGE.src       = "./../image/player/noBKG_KnightIdle_strip.png"; 

        this.PLAYER_SHIELD_IMAGE   = new Image();
        this.PLAYER_SHIELD_IMAGE.src     = "./../image/player/noBKG_KnightShield_strip.png"; 

        this.PLAYER_ROLL_IMAGE     = new Image();
        this.PLAYER_ROLL_IMAGE.src       = "./../image/player/noBKG_KnightRoll_strip.png"; 

        this.PLAYER_ATTACK_IMAGE   = new Image();
        this.PLAYER_ATTACK_IMAGE.src     = "./../image/player/noBKG_KnightAttack_strip.png"; 

        this.PLAYER_DEATH_IMAGE    = new Image();
        this.PLAYER_DEATH_IMAGE.src      = "./../image/player/noBKG_KnightDeath_strip.png"; 
        

        this.PLAYER_SPRITE_WIDTH   = 64;
        this.PLAYER_SPRITE_HEIGHT  = 64;

        this.MAX_PLAYER_IDLE_SPRITES   = 15;
        this.MAX_PLAYER_SHIELD_SPRITES = 9;
        this.MAX_PLAYER_ROLL_SPRITES   = 15;
        this.MAX_PLAYER_ATTACK_SPRITES = 22;
        this.MAX_PLAYER_DEATH_SPRITES  = 15;
    }
}