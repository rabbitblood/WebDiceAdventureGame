import * as monster from './monsters.js';
import * as myAnimation from './animation-handler.js';
import * as dice from './dice.js';


// -------------------------------------------------constants-------------------------------------------------
const SPRITE_ANIMATION_SPEED    = 50;
const ROUND_BEFORE_COMBAT       = 3;

//player sprite constants
const PLAYER_IDLE_IMAGE     = new Image();
PLAYER_IDLE_IMAGE.src       = "./../image/player/noBKG_KnightIdle_strip.png"; 
const PLAYER_SHIELD_IMAGE   = new Image();
PLAYER_SHIELD_IMAGE.src     = "./../image/player/noBKG_KnightShield_strip.png"; 
const PLAYER_ROLL_IMAGE     = new Image();
PLAYER_ROLL_IMAGE.src       = "./../image/player/noBKG_KnightRoll_strip.png"; 
const PLAYER_ATTACK_IMAGE   = new Image();
PLAYER_ATTACK_IMAGE.src     = "./../image/player/noBKG_KnightAttack_strip.png"; 
const PLAYER_DEATH_IMAGE    = new Image();
PLAYER_DEATH_IMAGE.src      = "./../image/player/noBKG_KnightDeath_strip.png"; 

const PLAYER_SPRITE_WIDTH   = 64;
const PLAYER_SPRITE_HEIGHT  = 64;

const MAX_PLAYER_IDLE_SPRITES   = 15;
const MAX_PLAYER_SHIELD_SPRITES = 9;
const MAX_PLAYER_ROLL_SPRITES   = 15;
const MAX_PLAYER_ATTACK_SPRITES = 22;
const MAX_PLAYER_DEATH_SPRITES  = 15;


// -------------------------------------------------elements-------------------------------------------------
const $gamePanel        = $('.game-panel');
const $statPanel        = $('.stat-panel');
const $shopPanel        = $('.shop-panel');
const $skillPanel       = $('.skill-panel');
const $currencyDisplay  = $('.currency');

//game panel
const $rollDiceBtn = $(".roll-btn");
const $runBtn      = $(".run-btn");
const $newEnemyBtn = $(".new-enemy-btn");
const $gameLog     = $(".game-log");
const $combatArea  = $('.combat-area');
const $roundInfo   = $('.round-info');

const $statBtn = $('.stat-btn');
const $shopBtn = $('.shop-btn');
const $skillBtn = $('.skill-btn');

const $playerHealthBarText      = $('.player-health-bar .hp-bar-text');
const $playerHealthBarFill      = $('.player-health-bar .hp-bar-fill');
const $playerAttibute           = $('.player-attributes');
const $playerCurrentRoundValue  = $('.player-current-round-power');

const $monsterName              = $('.monster-name');
const $monsterHealthBarText     = $('.monster-health-bar .hp-bar-text');
const $monsterHealthBarFill     = $('.monster-health-bar .hp-bar-fill');
const $monsterAttibute          = $('.monster-attributes');
const $monsterCurrentRoundValue = $('.monster-current-round-power');

const playerImgContainer    = document.querySelector('.player-img-container');
const monsterImgContainer   = document.querySelector('.monster-img-container');

//stat panel
const $statCloseBtn = $('.stat-panel-close');

const $totalGoldEarnedText = $('.total-gold-earned-text');
const $totalXpEarnedText = $('.total-xp-earned-text');
const $totalEnemyKilledText = $('.total-enemy-killed-text');
const $totalPlayerDeathText = $('.total-player-death-text');

//shop panel
const $shopCloseBtn = $('.shop-panel-close');

//skill panel
const $skillCloseBtn = $('.skill-panel-close');

// -------------------------------------------------variables-------------------------------------------------
//game
const gameDice = new dice.dice();
const monsterList = [new monster.bat(), new monster.rock(), new monster.chicken(), new monster.angryPig(), new monster.rino(), new monster.ghost()];
let currentMonster;

let currentRound = 1;

let moveAvaliable = true;

let playerMaxHealth = 30;
let playerHealth    = 30;
let playerAttack    = 10;
let playerDefence   = 0;
let playerCurrentRoundValue = 0;

let monsterMaxHealth = 30;
let monsterHealth   = 30;
let monsterAttack   = 10;
let monsterDefence  = 0;
let monsterCurrentRoundValue = 0;

let playerXp = 0;
let playerGold = 0;


//stats
let totalGoldEarned  = 0;
let totalXpEarned    = 0;
let totalEnemyKilled = 0;
let totalPlayerDeath = 0;

//#region -------------------------------------------------event listeners-------------------------------------------------
//game panel
$rollDiceBtn.on('click', function(){if(moveAvaliable){rollDice()}});

$runBtn.on('click', function(){
    if(moveAvaliable)
    {
        run();
    }
});

$newEnemyBtn.on('click', function(){
    $rollDiceBtn.show();
    $runBtn.show();
    newEnemy();
});

$statBtn.on('click', function(){
    $gamePanel.hide();
    showStatPanel();
});

$shopBtn.on('click', function(){
    $gamePanel.hide();
    $shopPanel.show();
});

$skillBtn.on('click', function(){
    $gamePanel.hide();
    $skillPanel.show();
});

//stat panel
$statCloseBtn.on('click', function(){
    $statPanel.hide();
    $gamePanel.show();
});

//shop panel
$shopCloseBtn.on('click', function(){
    $shopPanel.hide();
    $gamePanel.show();
});

//skill panel
$skillCloseBtn.on('click', function(){
    $skillPanel.hide();
    $gamePanel.show();
});
//#endregion


//-------------------------------------------------functions-------------------------------------------------
init();

function init()
{
    $gamePanel.show();
    $statPanel.hide();
    $shopPanel.hide();
    $skillPanel.hide();

    //init game data
    $monsterHealthBarFill.css("width", "0%");
    $playerHealthBarFill.css("width", "100%");
    $playerHealthBarText.text(playerHealth + "/" + playerMaxHealth);
    $playerAttibute.text(`Attack:${playerAttack} Defence:${playerDefence}`);
    $playerCurrentRoundValue.text(`Power:${playerCurrentRoundValue}`);
    $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);
    playerIdleAniamte();
    
    
    $newEnemyBtn.show();
    $rollDiceBtn.hide();
    $runBtn.hide();
}

//#region gamepanel
function newEnemy()
{
    //init game data
    currentRound = 1;
    moveAvaliable = true;
    $rollDiceBtn.prop('disabled', false);

    playerHealth            = playerMaxHealth;
    playerAttack            = 10;
    playerDefence           = 0;
    playerCurrentRoundValue = 0;

    currentMonster              = monsterList[Math.floor(Math.random() * monsterList.length)];
    monsterMaxHealth            = currentMonster.health;
    monsterHealth               = monsterMaxHealth;
    monsterAttack               = currentMonster.attack;
    monsterDefence              = currentMonster.defense;
    monsterCurrentRoundValue    = 0;

    displayGameLog(`You encountered a ${currentMonster.name}`);

    //update UI
    $combatArea.empty();
    $newEnemyBtn.hide();
    $playerHealthBarFill.css("width", "100%");
    $monsterHealthBarFill.css("width", "100%");

    $playerAttibute.text(`Attack:${playerAttack} Defence:${playerDefence}`);
    $monsterAttibute.text(`Attack:${monsterAttack} Defence:${monsterDefence}`);

    $playerCurrentRoundValue.text(`Power: ${playerCurrentRoundValue}`);
    $monsterCurrentRoundValue.text(`Power: ${monsterCurrentRoundValue}`);

    $monsterName.text(currentMonster.name);

    $playerHealthBarText.text(playerHealth + "/" + playerMaxHealth);
    $monsterHealthBarText.text(monsterHealth + "/" + monsterMaxHealth);

    //display monster animation
    playerIdleAniamte();
    monsterIdleAniamte();

    $roundInfo.empty();
}


function rollDice() 
{
    moveAvaliable = false;
    $rollDiceBtn.prop('disabled', true);

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
    $playerCurrentRoundValue.text(`Power: ${playerCurrentRoundValue}`);

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
    const playerAnimationTime = MAX_PLAYER_ROLL_SPRITES * SPRITE_ANIMATION_SPEED;
    setTimeout(monsterRoll, playerAnimationTime);
    
    const monsterAnimationTime = currentMonster.ROLL_SPRITES * SPRITE_ANIMATION_SPEED;
    setTimeout(function(){
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
            moveAvaliable = true;
            $rollDiceBtn.prop('disabled', false);
        }

    }, playerAnimationTime + monsterAnimationTime);

}

function combat()
{
    let combatResult;

    if(playerCurrentRoundValue ==  monsterCurrentRoundValue)
    {
        displayGameLog(`You and the ${currentMonster.name} have same power of ${playerCurrentRoundValue}, no one takes damage`);
        combatResult = "draw";
        moveAvaliable = true;
        $rollDiceBtn.prop('disabled', false);

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>DRAW</h2>`);

        return;
    }
    else if(playerCurrentRoundValue > monsterCurrentRoundValue)
    {
        let damage = playerAttack - monsterDefence;
        if(damage < 0)
        {
            damage = 0;
        }

        monsterHealth -= damage;
        displayGameLog(`Your power is ${playerCurrentRoundValue}, the ${currentMonster.name}'s power is ${monsterCurrentRoundValue}, you Win!`);
        displayGameLog(`You hit the ${currentMonster.name} for ${damage} damage`);
        combatResult = "player";

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>WIN</h2>`);
    }
    else if(playerCurrentRoundValue < monsterCurrentRoundValue)
    {
        let damage = monsterAttack - playerDefence;
        if(damage < 0)
        {
            damage = 0;
        }

        playerHealth -= damage;
        displayGameLog(`Your power is ${playerCurrentRoundValue}, the ${currentMonster.name}'s power is ${monsterCurrentRoundValue}, you Lose!`);
        displayGameLog(`The ${currentMonster.name} hit you for ${damage} damage`, "monster");
        combatResult = "monster";

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>LOSE</h2>`);
    }

    //update UI
    $playerHealthBarFill.css("width", `${playerHealth/playerMaxHealth*100}%`);
    $monsterHealthBarFill.css("width", `${monsterHealth/monsterMaxHealth*100}%`);
    $playerHealthBarText.text(playerHealth + "/" + playerMaxHealth);
    $monsterHealthBarText.text(monsterHealth + "/" + monsterMaxHealth);

    //animation when rolling dice
    let animationWaitTime = 0;
    if(combatResult == "player")
    {
        animationWaitTime = MAX_PLAYER_ATTACK_SPRITES * SPRITE_ANIMATION_SPEED;
        playerAttackAnimate();
        monsterDefenceAnimate();
    }
    else
    {
        animationWaitTime = currentMonster.ATTACK_SPRITES * SPRITE_ANIMATION_SPEED;
        playerShieldAnimate();
        monsterAttackAnimate();
    }

    setTimeout(function(){
        //if player or monster health is 0, current game over
        if(playerHealth <= 0)
        {
            displayGameLog("You are defeated, lost all gold and xp", "monster");
            playerDeathAniamte();
            $rollDiceBtn.hide();
            $runBtn.hide();

            playerGold = 0;
            playerXp = 0;

            //update life time stats
            totalPlayerDeath++;

            //display combat visual
            $combatArea.empty();
            $combatArea.append(`<h2>YOU DIED</h2>`);

            //update ui
            $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);

            setTimeout(function(){
                $newEnemyBtn.show();
            }, animationWaitTime);
            return;
        }
        else if(monsterHealth <= 0)
        {
            displayGameLog(`You killed the ${currentMonster.name}`);
            displayGameLog(`monster dropped ${currentMonster.gold} gold, you gained ${currentMonster.xp} xp`);
            if(currentMonster.name == "Ghost")
            {
                displayGameLog(`You have defeated the ghost, the ultimate monster. I believe you are just boring as me, the devoloper who made this game`);
                displayGameLog(`This is actaully my final project for my web development course, I hope you like it, and I hope you have a good day`);
                displayGameLog(`You have won the game, congrats!`);
            }

            monsterDeathAnimate();
            $rollDiceBtn.hide();
            $runBtn.hide();

            playerGold += currentMonster.gold;
            playerXp += currentMonster.xp;

            //update life time stats
            totalEnemyKilled++;
            totalGoldEarned += currentMonster.gold;
            totalXpEarned += currentMonster.xp;

            //display combat visual
            $combatArea.empty();
            $combatArea.append(`<h2>ENEMY KILLED</h2>`);

            //update ui
            $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);

            setTimeout(function(){
                $newEnemyBtn.show();
            }, animationWaitTime);

            return;
        }

        moveAvaliable = true;
        $rollDiceBtn.prop('disabled', false);

    }, animationWaitTime);

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

    //display combat visual
    $combatArea.empty();
    $combatArea.append(`<div>${gameDice.getDiceFace(rollingDice1).outerHTML}</div>`);
    $combatArea.append(`<div>${gameDice.getDiceFace(rollingDice2).outerHTML}</div>`);

    //UI Update
    $monsterCurrentRoundValue.text(`Power: ${monsterCurrentRoundValue}`);
    

    //monster animation when rolling dice
    monsterRollAnimate();
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
    clearTimeout(myAnimation.monsterAnimationHandler);

    //clear monster UI
    $monsterHealthBarFill.css("width", "0%");
    $monsterHealthBarText.text("");
    $monsterAttibute.text(`Attack: 0 Defence: 0`);
    $monsterCurrentRoundValue.text(`Power: 0`);

    monsterImgContainer.getContext('2d').clearRect(0, 0, monsterImgContainer.width, monsterImgContainer.height);

    $rollDiceBtn.hide();
    $runBtn.hide();
    $newEnemyBtn.show();
}

//#endregion


//#region statPanel
function showStatPanel()
{
    $statPanel.show();

    //update stat panel information
    $totalGoldEarnedText.text(`${totalGoldEarned}`);
    $totalXpEarnedText.text(`${totalXpEarned}`);
    $totalEnemyKilledText.text(`${totalEnemyKilled}`);
    $totalPlayerDeathText.text(`${totalPlayerDeath}`);
    
}
//#endregion

//#region ----------------------------------------------------------animation template functions----------------------------------------------------------
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

function playerDeathAniamte()
{
    clearTimeout(myAnimation.playerAnimationHandler);

    myAnimation.animate(
        playerImgContainer,
        PLAYER_DEATH_IMAGE,
        PLAYER_SPRITE_WIDTH,
        PLAYER_SPRITE_HEIGHT,
        MAX_PLAYER_DEATH_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        null,
        false
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
        playerIdleAniamte
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
        playerIdleAniamte
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
        playerIdleAniamte
    );
}

function monsterIdleAniamte()
{
    clearTimeout(myAnimation.monsterAnimationHandler);

    myAnimation.animate(
        monsterImgContainer,
        currentMonster.IDLE_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.IDLE_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster"
    );
}

function monsterAttackAnimate()
{
    clearTimeout(myAnimation.monsterAnimationHandler);

    myAnimation.animate(
        monsterImgContainer,
        currentMonster.ATTACK_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.ATTACK_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster",
        0,
        monsterIdleAniamte
    );
}

function monsterRollAnimate()
{
    clearTimeout(myAnimation.monsterAnimationHandler);

    myAnimation.animate(
        monsterImgContainer,
        currentMonster.ROLL_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.ROLL_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster",
        0,
        monsterIdleAniamte
    );
}

function monsterDefenceAnimate()
{
    clearTimeout(myAnimation.monsterAnimationHandler);

    myAnimation.animate(
        monsterImgContainer,
        currentMonster.DEFENCE_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.DEFENCE_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster",
        0,
        monsterIdleAniamte
    );
}

function monsterDeathAnimate()
{
    clearTimeout(myAnimation.monsterAnimationHandler);

    myAnimation.animate(
        monsterImgContainer,
        currentMonster.DEATH_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.DEATH_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster",
        0,
        null,
        false
    );
}
//#endregion