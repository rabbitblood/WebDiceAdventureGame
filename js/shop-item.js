class shopItem
{
    constructor(name, cost, itemFunction, player)
    {
        this.name   = name;
        this.cost   = cost;
        this.player = player;

        this.bought = false;

        this.itemFunction = itemFunction;

        this.buy = function()
        {
            if(this.bought == false && player.gold >= this.cost)
            {
                itemFunction();
                this.bought = true;
                playerGold -= this.cost;
            }

        };
    }
}


class longSword extends shopItem
{
    constructor()
    {
        const name = "Long Sword";
        const cost = 100;
        const itemFunction = function()
        {
            playerAttack += 10;
        };


        super(name, cost, itemFunction);
    }
}