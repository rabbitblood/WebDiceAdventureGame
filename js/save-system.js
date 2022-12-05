function saveGameData(gold, xp, stat, shopItems, skills) {


    var data = {
        currency: {
            gold: gold,
            xp: xp
        },
        stat: {
            totalGoldEarned: stat.totalGoldEarned,
            totalXpEarned: stat.totalXpEarned,
            totalEnemyKilled: stat.totalEnemyKilled,
            totalPlayerDeath: stat.totalPlayerDeath
        },
        shopItems: {

        },
        skills: {

        }
    };

    for (var i = 0; i < shopItems.length; i++) {
        data.shopItems[shopItems[i].name] = shopItems[i].bought;
    }

    for (var i = 0; i < skills.length; i++) {
        data.skills[skillList[i].name] = skillList[i].bought;
    }


    localStorage.setItem("gameData", JSON.stringify(data));
}

function loadGameData() {
    var data = JSON.parse(localStorage.getItem("gameData"));

    if (data != null) {
        playerGold = data.currency.gold;
        playerXp = data.currency.xp;

        statData.totalGoldEarned = data.stat.totalGoldEarned;
        statData.totalXpEarned = data.stat.totalXpEarned;
        statData.totalEnemyKilled = data.stat.totalEnemyKilled;
        statData.totalPlayerDeath = data.stat.totalPlayerDeath;

        for (var i = 0; i < shop.length; i++) {
            shop[i].bought = data.shopItems[shop[i].name];
            if (shop[i].bought) {
                shop[i].itemFunction();
            }
        }

        for (var i = 0; i < skillList.length; i++) {
            skillList[i].bought = data.skills[skillList[i].name];
        }
    }
}