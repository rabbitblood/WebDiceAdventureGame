// -------------------------------------------------constants-------------------------------------------------
const SPRITE_ANIMATION_SPEED = 50;
const ROUND_BEFORE_COMBAT = 3;

// -------------------------------------------------elements-------------------------------------------------
const $gamePanel = $(".game-panel");
const $statPanel = $(".stat-panel");
const $shopPanel = $(".shop-panel");
const $skillPanel = $(".skill-panel");
const $currencyDisplay = $(".currency");

//game panel
const $rollDiceBtn = $(".roll-btn");
const $runBtn = $(".run-btn");
const $newEnemyBtn = $(".new-enemy-btn");
const $gameLog = $(".game-log");
const $combatArea = $(".combat-area");
const $roundInfo = $(".round-info");

const $statBtn = $(".stat-btn");
const $shopBtn = $(".shop-btn");
const $skillBtn = $(".skill-btn");

const $playerHealthBarText = $(".player-health-bar .hp-bar-text");
const $playerHealthBarFill = $(".player-health-bar .hp-bar-fill");
const $playerAttibute = $(".player-attributes");
const $playerCurrentRoundValue = $(".player-current-round-power");

const $monsterName = $(".monster-name");
const $monsterHealthBarText = $(".monster-health-bar .hp-bar-text");
const $monsterHealthBarFill = $(".monster-health-bar .hp-bar-fill");
const $monsterAttibute = $(".monster-attributes");
const $monsterCurrentRoundValue = $(".monster-current-round-power");

const playerImgContainer = document.querySelector(".player-img-container");
const monsterImgContainer = document.querySelector(".monster-img-container");

//stat panel
const $statCloseBtn = $(".stat-panel-close");

const $totalGoldEarnedText = $(".total-gold-earned-text");
const $totalXpEarnedText = $(".total-xp-earned-text");
const $totalEnemyKilledText = $(".total-enemy-killed-text");
const $totalPlayerDeathText = $(".total-player-death-text");

//shop panel
const $shopCloseBtn = $(".shop-panel-close");
const $shopItemContainer = $(".shop-item-container");

//skill panel
const $skillCloseBtn = $(".skill-panel-close");
const $skillItemContainer = $(".skill-container");

// -------------------------------------------------variables-------------------------------------------------
//game data
const gameDice = new dice();
const monsterList = [
    new bat(),
    new rock(),
    new chicken(),
    new angryPig(),
    new rino(),
    new ghost()
];
const playerData = new player();
const statData = new stat();
const shop = [
    new longSword(playerData),
    new diamondSword(playerData),
    new heroSword(playerData),
    new kingsbane(playerData),
    new godSlayer(playerData),
    new shield(playerData),
    new armour(playerData),
    new enhancedSteelPlate(playerData),
    new divineHelmet(playerData),
    new angelsBone(playerData),
    new healthPotion(playerData),
    new meatStew(playerData),
    new krakenSoup(playerData),
    new giantWine(playerData),
    new gaeaEssence(playerData)
];
const skillList = [
    new increasePower(),
    new superIncreasePower(),
    new diceMaster(),
    new evenBetter(),
    new luckyCharm(),
    new undeadKing()
];

let currentMonster;

let currentRound = 1;

let moveAvaliable = true;

let playerCurrentRoundValue;

let monsterMaxHealth;
let monsterHealth;
let monsterAttack;
let monsterDefence;
let monsterCurrentRoundValue;

let playerXp = 0;
let playerGold = 0;

let endGame = false;

//#region -------------------------------------------------event listeners-------------------------------------------------
//game panel
$rollDiceBtn.on("click", function () {
    if (moveAvaliable) {
        rollDice();
    }
});

$runBtn.on("click", function () {
    if (moveAvaliable) {
        run();
    }
});

$newEnemyBtn.on("click", function () {
    $rollDiceBtn.show();
    $runBtn.show();
    newEnemy();
});

$statBtn.on("click", function () {
    $gamePanel.hide();
    showStatPanel();
});

$shopBtn.on("click", function () {
    $gamePanel.hide();
    $shopPanel.show();
    refreshShopItems();
});

$skillBtn.on("click", function () {
    $gamePanel.hide();
    $skillPanel.show();
    refreshSkillPanel();
});

//stat panel
$statCloseBtn.on("click", function () {
    $statPanel.hide();
    $gamePanel.show();
});

//shop panel
$shopCloseBtn.on("click", function () {
    $shopPanel.hide();
    $gamePanel.show();
});

//skill panel
$skillCloseBtn.on("click", function () {
    $skillPanel.hide();
    $gamePanel.show();
});
//#endregion

//-------------------------------------------------functions-------------------------------------------------
init();

function init() {
    $gamePanel.show();
    $statPanel.hide();
    $shopPanel.hide();
    $skillPanel.hide();

    //init game data
    $monsterHealthBarFill.css("width", "0%");
    $playerHealthBarFill.css("width", "100%");
    $playerHealthBarText.text(
        playerData.playerHealth + "/" + playerData.playerMaxHealth
    );
    $playerAttibute.text(
        `Attack:${playerData.playerAttack} Defence:${playerData.playerDefence}`
    );
    $playerCurrentRoundValue.text(`Power:${playerCurrentRoundValue}`);
    $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);
    playerIdleAniamte();

    $newEnemyBtn.show();
    $rollDiceBtn.hide();
    $runBtn.hide();
}

//#region gamepanel
function newEnemy() {
    //init game data
    currentRound = 1;
    moveAvaliable = true;
    $rollDiceBtn.prop("disabled", false);

    playerData.playerHealth = playerData.playerMaxHealth;
    playerCurrentRoundValue = 0;

    currentMonster = monsterList[Math.floor(Math.random() * monsterList.length)];
    monsterMaxHealth = currentMonster.health;
    monsterHealth = monsterMaxHealth;
    monsterAttack = currentMonster.attack;
    monsterDefence = currentMonster.defense;
    monsterCurrentRoundValue = 0;

    displayGameLog(`You encountered a ${currentMonster.name}`);

    //update UI
    $combatArea.empty();
    $newEnemyBtn.hide();
    $playerHealthBarFill.css("width", "100%");
    $monsterHealthBarFill.css("width", "100%");

    $playerAttibute.text(
        `Attack:${playerData.playerAttack} Defence:${playerData.playerDefence}`
    );
    $monsterAttibute.text(`Attack:${monsterAttack} Defence:${monsterDefence}`);

    $playerCurrentRoundValue.text(`Power: ${playerCurrentRoundValue}`);
    $monsterCurrentRoundValue.text(`Power: ${monsterCurrentRoundValue}`);

    $monsterName.text(currentMonster.name);

    $playerHealthBarText.text(
        playerData.playerHealth + "/" + playerData.playerMaxHealth
    );
    $monsterHealthBarText.text(monsterHealth + "/" + monsterMaxHealth);

    //display monster animation
    playerIdleAniamte();
    monsterIdleAniamte();

    $roundInfo.empty();
}

function rollDice() {
    moveAvaliable = false;
    $rollDiceBtn.prop("disabled", true);

    const rollingDice1 = gameDice.roll();
    const rollingDice2 = gameDice.roll();

    //roll dice game logic
    const roundValue = getRoundValue(rollingDice1, rollingDice2, "player");
    playerCurrentRoundValue += roundValue;



    //display combat visual
    $combatArea.empty();
    $combatArea.append(
        `<div>${gameDice.getDiceFace(rollingDice1).outerHTML}</div>`
    );
    $combatArea.append(
        `<div>${gameDice.getDiceFace(rollingDice2).outerHTML}</div>`
    );

    //UI Update
    $playerCurrentRoundValue.text(`Power: ${playerCurrentRoundValue}`);

    $roundInfo.empty();
    for (let i = 1; i <= currentRound; i++) {
        if (i == ROUND_BEFORE_COMBAT) {
            $roundInfo.append(`<div class="round-ball red-b">${i}</div>`);
        } else {
            $roundInfo.append(`<div class="round-ball">${i}</div>`);
        }
    }

    //player animation when rolling dice
    playerRollAnimate();

    //monster rolling after player
    const playerAnimationTime =
        playerData.MAX_PLAYER_ROLL_SPRITES * SPRITE_ANIMATION_SPEED;
    setTimeout(monsterRoll, playerAnimationTime);

    const monsterAnimationTime =
        currentMonster.ROLL_SPRITES * SPRITE_ANIMATION_SPEED;
    setTimeout(function () {
        if (currentRound >= ROUND_BEFORE_COMBAT) {
            combat();
            currentRound = 1;
            playerCurrentRoundValue = 0;
            monsterCurrentRoundValue = 0;
        } else {
            currentRound++;
            moveAvaliable = true;
            $rollDiceBtn.prop("disabled", false);
        }
    }, playerAnimationTime + monsterAnimationTime);
}

function combat() {
    let combatResult;

    //before combat skill
    for (const skill of skillList) {
        if (skill.skillTiming == "beforeCombat" &&
            skill.bought == true) {
            skill.skillFunction();
        }
    }

    //combat logic
    if (playerCurrentRoundValue == monsterCurrentRoundValue) {
        displayGameLog(
            `You and the ${currentMonster.name} have same power of ${playerCurrentRoundValue}, no one takes damage`
        );
        combatResult = "draw";
        moveAvaliable = true;
        $rollDiceBtn.prop("disabled", false);

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>DRAW</h2>`);

        return;
    } else if (playerCurrentRoundValue > monsterCurrentRoundValue) {
        let damage = playerData.playerAttack - monsterDefence;
        if (damage < 0) {
            damage = 0;
        }

        monsterHealth -= damage;
        displayGameLog(
            `Your power is ${playerCurrentRoundValue}, the ${currentMonster.name}'s power is ${monsterCurrentRoundValue}, you Win!`
        );
        displayGameLog(`⚔️You hit the ${currentMonster.name} for ${damage} damage`);
        combatResult = "player";

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>WIN</h2>`);
    } else if (playerCurrentRoundValue < monsterCurrentRoundValue) {
        let damage = monsterAttack - playerData.playerDefence;
        if (damage < 0) {
            damage = 0;
        }

        playerData.playerHealth -= damage;
        displayGameLog(
            `Your power is ${playerCurrentRoundValue}, the ${currentMonster.name}'s power is ${monsterCurrentRoundValue}, you Lose!`
        );
        displayGameLog(
            `⚔️The ${currentMonster.name} hit you for ${damage} damage`,
            "monster"
        );
        combatResult = "monster";

        //display combat visual
        $combatArea.empty();
        $combatArea.append(`<h2>LOSE</h2>`);
    }

    //update UI
    $playerCurrentRoundValue.text(`Power: ${playerCurrentRoundValue}`);
    $playerHealthBarFill.css(
        "width",
        `${(playerData.playerHealth / playerData.playerMaxHealth) * 100}%`
    );
    $monsterHealthBarFill.css(
        "width",
        `${(monsterHealth / monsterMaxHealth) * 100}%`
    );
    $playerHealthBarText.text(
        playerData.playerHealth + "/" + playerData.playerMaxHealth
    );
    $monsterHealthBarText.text(monsterHealth + "/" + monsterMaxHealth);

    //animation when rolling dice
    let animationWaitTime = 0;
    if (combatResult == "player") {
        animationWaitTime =
            playerData.MAX_PLAYER_ATTACK_SPRITES * SPRITE_ANIMATION_SPEED;
        playerAttackAnimate();
        monsterDefenceAnimate();
    } else {
        animationWaitTime = currentMonster.ATTACK_SPRITES * SPRITE_ANIMATION_SPEED;
        playerShieldAnimate();
        monsterAttackAnimate();
    }

    setTimeout(function () {
        //if player or monster health is 0, current game over
        if (playerData.playerHealth <= 0) {
            displayGameLog("☠️You are defeated, lost all gold and xp", "monster");
            playerDeathAniamte();
            $rollDiceBtn.hide();
            $runBtn.hide();

            playerGold = 0;
            playerXp = 0;

            //update life time stats
            statData.totalPlayerDeath++;

            //display combat visual
            $combatArea.empty();
            $combatArea.append(`<h2>YOU DIED</h2>`);

            //update ui
            $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);

            setTimeout(function () {
                $newEnemyBtn.show();
            }, animationWaitTime);
            return;
        } else if (monsterHealth <= 0) {
            displayGameLog(
                `💰You killed the ${currentMonster.name}, it dropped ${currentMonster.gold} gold, you gained ${currentMonster.xp} xp`
            );
            if (currentMonster.name == "Ghost" && endGame == false) {
                displayGameLog(
                    `You have defeated the ghost, the ultimate monster. I believe you are just boring as me, the devoloper who made this game`
                );
                displayGameLog(
                    `This is actaully my final project for my web development course, I hope you like it, and I hope you have a good day`
                );
                displayGameLog(`🎖️You have won the game, congrats!`);
                endGame = true;
            }

            monsterDeathAnimate();
            $rollDiceBtn.hide();
            $runBtn.hide();

            playerGold += currentMonster.gold;
            playerXp += currentMonster.xp;

            //update life time stats
            statData.totalEnemyKilled++;
            statData.totalGoldEarned += currentMonster.gold;
            statData.totalXpEarned += currentMonster.xp;

            //display combat visual
            $combatArea.empty();
            $combatArea.append(`<h2>ENEMY KILLED</h2>`);

            //update ui
            $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);

            setTimeout(function () {
                $newEnemyBtn.show();
            }, animationWaitTime);

            return;
        }

        moveAvaliable = true;
        $rollDiceBtn.prop("disabled", false);
    }, animationWaitTime);
}

function monsterRoll() {
    const rollingDice1 = gameDice.roll();
    const rollingDice2 = gameDice.roll();

    //roll dice game logic
    const roundValue = getRoundValue(rollingDice1, rollingDice2, "monster");
    monsterCurrentRoundValue += roundValue;

    //display log
    displayGameLog(
        `🎲${currentMonster.name} rolled a ${rollingDice1} and a ${rollingDice2}, round value is ${roundValue}`,
        "monster"
    );

    //display combat visual
    $combatArea.empty();
    $combatArea.append(
        `<div>${gameDice.getDiceFace(rollingDice1).outerHTML}</div>`
    );
    $combatArea.append(
        `<div>${gameDice.getDiceFace(rollingDice2).outerHTML}</div>`
    );

    //UI Update
    $monsterCurrentRoundValue.text(`Power: ${monsterCurrentRoundValue}`);

    //monster animation when rolling dice
    monsterRollAnimate();
}

function getRoundValue(rollingDice1, rollingDice2, currentRoller) {
    let roundValue = 0;

    if (rollingDice1 == 1 || rollingDice2 == 1) {
        roundValue = 0;
    } else if (rollingDice1 == rollingDice2) {
        roundValue = (rollingDice1 + rollingDice2) * 2;
    } else {
        roundValue = rollingDice1 + rollingDice2;
    }

    //skill effect
    if (currentRoller == "player") {
        //display log
        displayGameLog(
            `🎲You rolled a ${rollingDice1} and a ${rollingDice2}, your round value is ${roundValue}`
        );

        for (const skill of skillList) {
            if (skill.skillTiming == "afterRoll" &&
                skill.bought == true) {
                skill.skillFunction(rollingDice1, rollingDice2);
            }
        }
    }

    return roundValue;
}

function displayGameLog(displayText, logSource = "player") {
    //display log
    if (logSource == "player") {
        $gameLog.append(`<p>${displayText}</p>`);
    } else if (logSource == "monster") {
        $gameLog.append(`<p class="monster-log">${displayText}</p>`);
    }

    //remove first log if there are more than 10 log
    if ($(".game-log p").length > 10) {
        $(".game-log p").first().remove();
    }

    //scroll to bottom of log
    $gameLog.scrollTop(9999);
}

function run() {
    displayGameLog(`You got scared by ${currentMonster.name} and ran away`);
    clearTimeout(monsterAnimationHandler);

    //clear monster UI
    $monsterHealthBarFill.css("width", "0%");
    $monsterHealthBarText.text("");
    $monsterAttibute.text(`Attack: 0 Defence: 0`);
    $monsterCurrentRoundValue.text(`Power: 0`);

    monsterImgContainer
        .getContext("2d")
        .clearRect(0, 0, monsterImgContainer.width, monsterImgContainer.height);

    $rollDiceBtn.hide();
    $runBtn.hide();
    $newEnemyBtn.show();
}
//#endregion


//#region statPanel
function showStatPanel() {
    $statPanel.show();

    //update stat panel information
    $totalGoldEarnedText.text(`${statData.totalGoldEarned}`);
    $totalXpEarnedText.text(`${statData.totalXpEarned}`);
    $totalEnemyKilledText.text(`${statData.totalEnemyKilled}`);
    $totalPlayerDeathText.text(`${statData.totalPlayerDeath}`);
}
//#endregion


//#region shopPanel
function refreshShopItems() {
    $shopItemContainer.empty();

    for (let i = 0; i < shop.length; i++) {
        if (shop[i].bought == false) {
            const shopItem = shop[i];
            const shopItemElement = $(`<div class="shop-item"></div>`);
            shopItemElement.append(`<h3>${shopItem.name}</h3>`);
            shopItemElement.append(`<p>Cost: ${shopItem.cost}Gold</p>`);
            shopItemElement.append(`<p>${shopItem.description}</p>`);
            shopItemElement.append(`<button class="buy-btn">Buy</button>`);

            shopItemElement.find(".buy-btn").click(function () {
                shop[i].buy();
                refreshShopItems();

                //updata ui
                $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);
                $playerAttibute.text(
                    `Attack:${playerData.playerAttack} Defence:${playerData.playerDefence}`
                );
            });

            $shopItemContainer.append(shopItemElement);
        }

    }
}
//#endregion


//#region skillPanel
function refreshSkillPanel() {
    $skillItemContainer.empty();

    for (let i = 0; i < skillList.length; i++) {
        if (skillList[i].bought == false) {
            const skill = skillList[i];
            const skillElement = $(`<div class="skill-item"></div>`);
            skillElement.append(`<h3>${skill.name}</h3>`);
            skillElement.append(`<p>Cost: ${skill.cost}XP</p>`);
            skillElement.append(`<p>${skill.description}</p>`);
            skillElement.append(`<button class="buy-btn">Buy</button>`);

            skillElement.find(".buy-btn").click(function () {
                skill.buy();
                refreshSkillPanel();

                //updata ui
                $currencyDisplay.text(`Gold: ${playerGold} Xp: ${playerXp}`);
            });

            $skillItemContainer.append(skillElement);
        }

    }
}
//#endregion



//#region ----------------------------------------------------------animation template functions----------------------------------------------------------
function playerIdleAniamte() {
    clearTimeout(playerAnimationHandler);

    animate(
        playerImgContainer,
        playerData.PLAYER_IDLE_IMAGE,
        playerData.PLAYER_SPRITE_WIDTH,
        playerData.PLAYER_SPRITE_HEIGHT,
        playerData.MAX_PLAYER_IDLE_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player"
    );
}

function playerDeathAniamte() {
    clearTimeout(playerAnimationHandler);

    animate(
        playerImgContainer,
        playerData.PLAYER_DEATH_IMAGE,
        playerData.PLAYER_SPRITE_WIDTH,
        playerData.PLAYER_SPRITE_HEIGHT,
        playerData.MAX_PLAYER_DEATH_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        null,
        false
    );
}

function playerShieldAnimate() {
    clearTimeout(playerAnimationHandler);

    animate(
        playerImgContainer,
        playerData.PLAYER_SHIELD_IMAGE,
        playerData.PLAYER_SPRITE_WIDTH,
        playerData.PLAYER_SPRITE_HEIGHT,
        playerData.MAX_PLAYER_SHIELD_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        playerIdleAniamte
    );
}

function playerRollAnimate() {
    clearTimeout(playerAnimationHandler);

    animate(
        playerImgContainer,
        playerData.PLAYER_ROLL_IMAGE,
        playerData.PLAYER_SPRITE_WIDTH,
        playerData.PLAYER_SPRITE_HEIGHT,
        playerData.MAX_PLAYER_ROLL_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        playerIdleAniamte
    );
}

function playerAttackAnimate() {
    clearTimeout(playerAnimationHandler);

    animate(
        playerImgContainer,
        playerData.PLAYER_ATTACK_IMAGE,
        playerData.PLAYER_SPRITE_WIDTH,
        playerData.PLAYER_SPRITE_HEIGHT,
        playerData.MAX_PLAYER_ATTACK_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "player",
        0,
        playerIdleAniamte
    );
}

function monsterIdleAniamte() {
    clearTimeout(monsterAnimationHandler);

    animate(
        monsterImgContainer,
        currentMonster.IDLE_IMAGE,
        currentMonster.SPRITE_WIDTH,
        currentMonster.SPRITE_HEIGHT,
        currentMonster.IDLE_SPRITES,
        SPRITE_ANIMATION_SPEED,
        "monster"
    );
}

function monsterAttackAnimate() {
    clearTimeout(monsterAnimationHandler);

    animate(
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

function monsterRollAnimate() {
    clearTimeout(monsterAnimationHandler);

    animate(
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

function monsterDefenceAnimate() {
    clearTimeout(monsterAnimationHandler);

    animate(
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

function monsterDeathAnimate() {
    clearTimeout(monsterAnimationHandler);

    animate(
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
