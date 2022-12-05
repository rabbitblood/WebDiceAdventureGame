class shopItem {
    constructor(name, cost, itemFunction, player, description) {
        this.name = name;
        this.cost = cost;
        this.player = player;
        this.description = description;

        this.bought = false;

        this.itemFunction = itemFunction;

        this.buy = function () {
            if (this.bought == false && playerGold >= this.cost) {
                itemFunction();
                this.bought = true;
                playerGold -= this.cost;

            }

        };
    }
}

// weapons
class longSword extends shopItem {
    constructor(player) {
        const name = "Long Sword";
        const cost = 20;
        const description = "A long sword that deals 10 damage.";

        const itemFunction = function () {
            player.playerAttack += 10;
        };


        super(name, cost, itemFunction, player, description);
    }
}

class diamondSword extends shopItem {
    constructor(player) {
        const name = "Diamond Sword";
        const cost = 100;
        const description = "A diamond sword that deals 50 damage.";

        const itemFunction = function () {
            player.playerAttack += 50;
        };


        super(name, cost, itemFunction, player, description);
    }
}

class heroSword extends shopItem {
    constructor(player) {
        const name = "Hero Sword";
        const cost = 500;
        const description = "A hero sword that deals 200 damage.";

        const itemFunction = function () {
            player.playerAttack += 200;
        };


        super(name, cost, itemFunction, player, description);
    }
}

class kingsbane extends shopItem {
    constructor(player) {
        const name = "Kingsbane";
        const cost = 1000;
        const description = "A kingsbane that deals 300 damage.";

        const itemFunction = function () {
            player.playerAttack += 300;
        };


        super(name, cost, itemFunction, player, description);
    }
}

class godSlayer extends shopItem {
    constructor(player) {
        const name = "God Slayer";
        const cost = 9999;
        const description = "A god slayer that deals 9999 damage.";

        const itemFunction = function () {
            player.playerAttack += 9999;
        };


        super(name, cost, itemFunction, player, description);
    }
}

// armour
class shield extends shopItem {
    constructor(player) {
        const name = "Shield";
        const cost = 10;
        const description = "A shield that reduces damage by 5.";

        const itemFunction = function () {
            player.playerDefence += 5;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class armour extends shopItem {
    constructor(player) {
        const name = "Armour";
        const cost = 50;
        const description = "Armour that reduces damage by 20.";

        const itemFunction = function () {
            player.playerDefence += 20;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class enhancedSteelPlate extends shopItem {
    constructor(player) {
        const name = "Enhanced Steel Plate";
        const cost = 200;
        const description = "Enhanced steel plate that reduces damage by 50.";

        const itemFunction = function () {
            player.playerDefence += 50;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class divineHelmet extends shopItem {
    constructor(player) {
        const name = "Divine Helmet";
        const cost = 1000;
        const description = "Divine helmet that reduces damage by 500.";

        const itemFunction = function () {
            player.playerDefence += 500;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class angelsBone extends shopItem {
    constructor(player) {
        const name = "Angels Bone";
        const cost = 9999;
        const description = "Angels bone that reduces damage by 9999.";

        const itemFunction = function () {
            player.playerDefence += 9999;
        };

        super(name, cost, itemFunction, player, description);
    }
}

// health
class healthPotion extends shopItem {
    constructor(player) {
        const name = "Health Potion";
        const cost = 5;
        const description = "A health potion that increase health by 20.";

        const itemFunction = function () {
            player.playerMaxHealth += 20;
            player.playerHealth += 20;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class meatStew extends shopItem {
    constructor(player) {
        const name = "Meat Stew";
        const cost = 50;
        const description = "A meat stew that increase health by 50.";

        const itemFunction = function () {
            player.playerMaxHealth += 50;
            player.playerHealth += 50;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class krakenSoup extends shopItem {
    constructor(player) {
        const name = "Kraken Soup";
        const cost = 200;
        const description = "A kraken soup that increase health by 100.";

        const itemFunction = function () {
            player.playerMaxHealth += 100;
            player.playerHealth += 100;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class giantWine extends shopItem {
    constructor(player) {
        const name = "Giant Wine";
        const cost = 1000;
        const description = "A giant wine that increase health by 500.";

        const itemFunction = function () {
            player.playerMaxHealth += 500;
            player.playerHealth += 500;
        };

        super(name, cost, itemFunction, player, description);
    }
}

class gaeaEssence extends shopItem {
    constructor(player) {
        const name = "Gaea Essence";
        const cost = 9999;
        const description = "A gaea essence that increase health by 9999.";

        const itemFunction = function () {
            player.playerMaxHealth += 9999;
            player.playerHealth += 9999;
        };

        super(name, cost, itemFunction, player, description);
    }
}