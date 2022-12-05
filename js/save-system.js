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

}