import * as monster from './monsters.js';
import * as myAnimation from './animation-handler.js';
import * as dice from './dice.js';


// -------------------------------------------------constants-------------------------------------------------
const SPRITE_ANIMATION_SPEED = 50;
const ROUND_BEFORE_COMBAT = 3;

//player sprite constants
const PLAYER_IDLE_IMAGE     = new Image();
PLAYER_IDLE_IMAGE.src       = "./../image/player/noBKG_KnightIdle_strip.png"; 
const PLAYER_SHIELD_IMAGE   = new Image();
PLAYER_SHIELD_IMAGE.src     = "./../image/player/noBKG_KnightShield_strip.png"; 
const PLAYER_ROLL_IMAGE     = new Image();
PLAYER_ROLL_IMAGE.src       = "./../image/player/noBKG_KnightRoll_strip.png"; 
const PLAYER_ATTACK_IMAGE   = new Image();
PLAYER_ATTACK_IMAGE.src     = "./../image/player/noBKG_KnightAttack_strip.png"; 

const PLAYER_SPRITE_WIDTH   = 64;
const PLAYER_SPRITE_HEIGHT  = 64;

const MAX_PLAYER_IDLE_SPRITES   = 15;
const MAX_PLAYER_SHIELD_SPRITES = 7;
const MAX_PLAYER_ROLL_SPRITES   = 15;
const MAX_PLAYER_ATTACK_SPRITES = 22;


// -------------------------------------------------elements-------------------------------------------------
const $gameBoard = $('.game-board');
const $rollDiceBtn = $(".roll-btn");
const $runBtn = $(".run-btn");
const $gameLog = $(".game-log");
const $combatArea = $('.combat-area');
const $roundInfo = $('.round-info');

const $playerHealthBar = $('.player-health-bar');
const $playerAttibute = $('.player-attributes');
const $playerCurrentRoundValue = $('.player-current-round-power');

const $monsterHealthBar = $('.monster-health-bar');
const $monsterAttibute = $('.monster-attributes');
const $monsterCurrentRoundValue = $('.monster-current-round-power');

const playerImgContainer = document.querySelector('.player-img-container');



// -------------------------------------------------variables-------------------------------------------------
const gameDice = new dice.dice();
const monsterList = [new monster.rat(), new monster.skeleton(), new monster.wolf(), new monster.goblin(), new monster.ogre(), new monster.dragon()];
let currentMonster;

let currentRound = 1;

let moveAvaliable = true;
let moveAvaliableHandler;

let playerHealth = 30;
let playerAttack = 10;
let playerDefence = 0;
let playerCurrentRoundValue = 0;

let monsterHealth = 30;
let monsterAttack = 10;
let monsterDefence = 0;
let monsterCurrentRoundValue = 0;


//-------------------------------------------------event listeners-------------------------------------------------
$rollDiceBtn.on('click', rollDice);
$runBtn.on('click', run);

//-------------------------------------------------functions-------------------------------------------------
init();

function init()
{
    newEnemy();

    playerIdleAniamte();
}

function newEnemy()
{
    //init game data
    currentRound = 1;

    playerHealth = 30;
    playerAttack = 10;
    playerDefence = 0;
    playerCurrentRoundValue = 0;


    currentMonster = monsterList[Math.floor(Math.random() * monsterList.length)];
    monsterHealth = currentMonster.health;
    monsterAttack = currentMonster.attack;
    monsterDefence = currentMonster.defense;
    monsterCurrentRoundValue = 0;

    displayGameLog(`You encountered a ${currentMonster.name}`);

    //update UI
    $playerHealthBar.text(playerHealth);
    $monsterHealthBar.text(monsterHealth);

    $playerAttibute.text(`Attack: ${playerAttack} Defence: ${playerDefence}`);
    $monsterAttibute.text(`Attack: ${monsterAttack} Defence: ${monsterDefence}`);

    $playerCurrentRoundValue.text(`Round Power: ${playerCurrentRoundValue}`);
    $monsterCurrentRoundValue.text(`Round Power: ${monsterCurrentRoundValue}`);
}


function rollDice() 
{
    const rollingDice1 = gameDice.roll();
    const rollingDice2 = gameDice.roll();

    //roll dice game logic
    const roundValue = getRoundValue(rollingDice1, rollingDice2);
    playerCurrentRoundValue += roundValue;

    //display log
    displayGameLog(`You rolled a ${rollingDice1} and a ${rollingDice2}, your round value is ${roundValue}`);

    //display combat visual
    $combatArea.empty();
    $combatArea.append(`<div>${gameDice.getDiceFace(rollingDice1).outerHTML}</div>`);
    $combatArea.append(`<div>${gameDice.getDiceFace(rollingDice2).outerHTML}</div>`);

    //UI Update
    $playerCurrentRoundValue.text(`Round Power: ${playerCurrentRoundValue}`);

    $roundInfo.empty();
    for(let i = 1; i <= currentRound; i++)
    {
        if(i == ROUND_BEFORE_COMBAT)
        {
            $roundInfo.append(`<div class="round-ball red-b">${i}</div>`);
        }
        else
        {
            $roundInfo.append(`<div class="round-ball">${i}</div>`);
        }
    }


    //player animation when rolling dice
    playerRollAnimate();

    //monster rolling after player
    monsterRoll();
    
    if(currentRound >= ROUND_BEFORE_COMBAT)
    {
        combat();
        currentRound = 1;
        playerCurrentRoundValue = 0;
        monsterCurrentRoundValue = 0;
    }
    else
    {
        currentRound++;
    }
}

function combat()
{
    let combatResult;

    if(playerCurrentRoundValue ==  monsterCurrentRoundValue)
    {
        displayGameLog(`You and the ${currentMonster.name} rolled the same value, no one takes damage`);
        combatResult = "draw";
        return;
    }
    else if(playerCurrentRoundValue > monsterCurrentRoundValue)
    {
        monsterHealth -= playerAttack;
        displayGameLog(`You hit the ${currentMonster.name} for ${playerAttack} damage`);
        combatResult = "player";
    }
    else if(playerCurrentRoundValue < monsterCurrentRoundValue)
    {
        playerHealth -= monsterAttack;
        displayGameLog(`The ${currentMonster.name} hit you for ${monsterAttack} damage`, "monster");
        combatResult = "monster";
    }

    //update UI
    $playerHealthBar.text(playerHealth);
    $monsterHealthBar.text(monsterHealth);

    //player animation when rolling dice
    if(combatResult == "player")
    {
        playerAttackAnimate();
    }
    else
    {
        playerShieldAnimate();
    }

    //if player or monster health is 0, current game over
    if(playerHealth <= 0)
    {
        displayGameLog("You died", "monster");
        newEnemy();
    }
    else if(monsterHealth <= 0)
    {
        displayGameLog(`You killed the ${currentMonster.name}`);
        newEnemy();
    }

}

function monsterRoll()
{
    const rollingDice1 = gameDice.roll();
    const rollingDice2 = gameDice.roll();

    //roll dice game logic
    const roundValue = getRoundValue(rollingDice1, rollingDice2);
    monsterCurrentRoundValue += roundValue;

    //display log
    displayGameLog(`${currentMonster.name} rolled a ${rollingDice1} and a ${rollingDice2}, round value is ${roundValue}`, "monster");

    //UI Update
    $monsterCurrentRoundValue.text(`Round Power: ${monsterCurrentRoundValue}`);
}

function getRoundValue(rollingDice1, rollingDice2)
{
    let roundValue = 0;

    if(rollingDice1 == 1 || rollingDice2 == 1)
    {
        roundValue = 0;
        return roundValue;
    }
    else if(rollingDice1 == rollingDice2)
    {
        roundValue = (rollingDice1 + rollingDice2) * 2;
        return roundValue;
    }
    else
    {
        roundValue = rollingDice1 + rollingDice2;
        return roundValue;
    }
}

function displayGameLog(displayText, logSource="player")
{
    //display log 
    if(logSource == "player")
    {
        $gameLog.append(`<p>${displayText}</p>`);
    }
    else if(logSource == "monster")
    {
        $gameLog.append(`<p class="monster-log">${displayText}</p>`);
    }

    //remove first log if there are more than 10 log
    if($(".game-log p").length > 10)
    {
        $(".game-log p").first().remove();
    }

    //scroll to bottom of log
    $gameLog.scrollTop(9999);
}

function run()
{
    displayGameLog(`You got scared by ${currentMonster.name} and ran away`);
    init();
}

//animation template functions
function playerIdleAniamte()
{
    clearTimeout(myAnimation.playerAnimationHandler);

    myAnimation.animate(
        playerImgContainer,
        PLAYER_IDLE_IMAGE,
        PLAYER_SPRITE_WIDTH,
        PLAYER_SPRITE_HEIGHT,
        MAX_PLAYER_IDLE_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player"
    );
}

function playerShieldAnimate()
{
    clearTimeout(myAnimation.playerAnimationHandler);

    myAnimation.animate(
        playerImgContainer,
        PLAYER_SHIELD_IMAGE,
        PLAYER_SPRITE_WIDTH,
        PLAYER_SPRITE_HEIGHT,
        MAX_PLAYER_SHIELD_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        function(){
            myAnimation.animate(
            playerImgContainer,
            PLAYER_IDLE_IMAGE,
            PLAYER_SPRITE_WIDTH,
            PLAYER_SPRITE_HEIGHT,
            MAX_PLAYER_IDLE_SPRITES,
            SPRITE_ANIMATION_SPEED,
            "player"
        )}
    );
}

function playerRollAnimate()
{
    clearTimeout(myAnimation.playerAnimationHandler);

    myAnimation.animate(
        playerImgContainer,
        PLAYER_ROLL_IMAGE,
        PLAYER_SPRITE_WIDTH,
        PLAYER_SPRITE_HEIGHT,
        MAX_PLAYER_ROLL_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        function(){
            myAnimation.animate(
            playerImgContainer,
            PLAYER_IDLE_IMAGE,
            PLAYER_SPRITE_WIDTH,
            PLAYER_SPRITE_HEIGHT,
            MAX_PLAYER_IDLE_SPRITES,
            SPRITE_ANIMATION_SPEED,
            "player"
        )}
    );
}

function playerAttackAnimate()
{
    clearTimeout(myAnimation.playerAnimationHandler);

    myAnimation.animate(
        playerImgContainer,
        PLAYER_ATTACK_IMAGE,
        PLAYER_SPRITE_WIDTH,
        PLAYER_SPRITE_HEIGHT,
        MAX_PLAYER_ATTACK_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        function(){
            myAnimation.animate(
            playerImgContainer,
            PLAYER_IDLE_IMAGE,
            PLAYER_SPRITE_WIDTH,
            PLAYER_SPRITE_HEIGHT,
            MAX_PLAYER_IDLE_SPRITES,
            SPRITE_ANIMATION_SPEED,
            "player"
        )}
    );
}