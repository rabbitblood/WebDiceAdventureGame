class skill {
    constructor(name, cost, skillFunction, description, skillTarget, skillTiming) {
        this.name = name;
        this.cost = cost;
        this.skillFunction = skillFunction;
        this.description = description;
        this.skillTarget = skillTarget;
        this.skillTiming = skillTiming;

        this.bought = false;

        this.buy = function () {
            if (this.bought == false && playerXp >= this.cost) {
                this.bought = true;
                playerXp -= this.cost;

            }

        };
    }
}

class increasePower extends skill {
    constructor() {
        const name = "Increase Power";
        const cost = 50;
        const description = "Increase your power by 1 before combat.";
        const skillTarget = "player";
        const skillTiming = "beforeCombat";

        const skillFunction = function () {
            playerCurrentRoundValue += 1;

            const gameLogMessage = "🍀Increase Power activated! Your round power increased by 1!";
            displayGameLog(gameLogMessage);
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}

class superIncreasePower extends skill {
    constructor() {
        const name = "Super Increase Power";
        const cost = 500;
        const description = "Increase your power by 5 before combat.";
        const skillTarget = "player";
        const skillTiming = "beforeCombat";

        const skillFunction = function () {
            playerCurrentRoundValue += 5;

            const gameLogMessage = "🍀Super Increase Power activated! Your round power increased by 5!";
            displayGameLog(gameLogMessage);
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}

class diceMaster extends skill {
    constructor() {
        const name = "Dice Master";
        const cost = 2000;
        const description = "Increase your power by 10 before combat.";
        const skillTarget = "player";
        const skillTiming = "beforeCombat";

        const skillFunction = function () {
            playerCurrentRoundValue += 10;

            const gameLogMessage = "🍀Dice Master activated! Your round power increased by 10!";
            displayGameLog(gameLogMessage);
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}

class evenBetter extends skill {
    constructor() {
        const name = "Even Better";
        const cost = 200;
        const description = "When you roll a 6, your round power increase by 1";
        const skillTarget = "player";
        const skillTiming = "afterRoll";

        const skillFunction = function (rollingDice1, rollingDice2) {
            if (rollingDice1 == 6 || rollingDice2 == 6) {
                playerCurrentRoundValue += 1;

                const gameLogMessage = "🍀Even Better activated! Your round power increased by 1!";
                displayGameLog(gameLogMessage);

            }
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}

class luckyCharm extends skill {
    constructor() {
        const name = "Lucky Charm";
        const cost = 1000;
        const description = "When you roll a 6, your round power is doubled";
        const skillTarget = "player";
        const skillTiming = "afterRoll";

        const skillFunction = function (rollingDice1, rollingDice2) {
            if (rollingDice1 == 6 || rollingDice2 == 6) {
                let roundValue = 0;

                if (rollingDice1 == 1 || rollingDice2 == 1) {
                    roundValue = 0;
                } else if (rollingDice1 == rollingDice2) {
                    roundValue = (rollingDice1 + rollingDice2) * 2;
                } else {
                    roundValue = rollingDice1 + rollingDice2;
                }

                playerCurrentRoundValue += roundValue;

                const gameLogMessage = "🍀Lucky Charm activated! Your round power increased by " + roundValue + "!";

                displayGameLog(gameLogMessage);
            }
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}

class undeadKing extends skill {
    constructor() {
        const name = "Undead King";
        const cost = 1000;
        const description = "When you roll a 1, your round power will not be turn to 0";
        const skillTarget = "player";
        const skillTiming = "afterRoll";

        const skillFunction = function (rollingDice1, rollingDice2) {
            if (rollingDice1 == 1 || rollingDice2 == 1) {
                let roundValue = 0;

                if (rollingDice1 == rollingDice2) {
                    roundValue = (rollingDice1 + rollingDice2) * 2;
                } else {
                    roundValue = rollingDice1 + rollingDice2;
                }

                playerCurrentRoundValue += roundValue;

                const gameLogMessage = "🍀Undead King activated! Your round power increased by " + roundValue + "!";
                displayGameLog(gameLogMessage);
            }
        };

        super(name, cost, skillFunction, description, skillTarget, skillTiming);
    }
}
