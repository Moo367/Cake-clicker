class CakeGame {
    constructor() {
        this.count = 0;
        this.clickValue = 1;
        this.autoClickers = 0;
        this.autoClickCost = 50;
        this.clickUpgradeCost = 10;
        this.autoClickerUpgradeCost = 100;
        this.doubleClickUpgradeCost = 200;
        this.luckyBoostCost = 300;
        this.doubleClickActive = false;

        this.clickableImage = document.getElementById('clickableImage');
        this.clickCountDisplay = document.getElementById('cakeCount');
        this.clickValueDisplay = document.getElementById('clickValue');
        this.autoClickersDisplay = document.getElementById('autoClickers');
        this.upgradeClickButton = document.getElementById('upgradeClickButton');
        this.autoClickButton = document.getElementById('autoClickButton');
        this.upgradeAutoClickButton = document.getElementById('upgradeAutoClickButton');
        this.doubleClickButton = document.getElementById('doubleClickButton');
        this.luckyBoostButton = document.getElementById('luckyBoostButton');

        this.clickUpgradeCostDisplay = document.getElementById('clickUpgradeCost');
        this.autoClickCostDisplay = document.getElementById('autoClickCost');
        this.autoClickerUpgradeCostDisplay = document.getElementById('autoClickerUpgradeCost');
        this.doubleClickUpgradeCostDisplay = document.getElementById('doubleClickUpgradeCost');
        this.luckyBoostCostDisplay = document.getElementById('luckyBoostCost');

        this.init();
    }

    init() {
        this.clickableImage.addEventListener('click', () => this.addCakes(this.clickValue));
        this.upgradeClickButton.addEventListener('click', () => this.upgradeClick());
        this.autoClickButton.addEventListener('click', () => this.buyAutoClicker());
        this.upgradeAutoClickButton.addEventListener('click', () => this.upgradeAutoClicker());
        this.doubleClickButton.addEventListener('click', () => this.doubleClick());
        this.luckyBoostButton.addEventListener('click', () => this.luckyBoost());

        setInterval(() => this.autoClick(), 500); // Auto click every half second
    }

    addCakes(amount) {
        this.count += amount;
        this.updateDisplay();
    }

    upgradeClick() {
        if (this.count >= this.clickUpgradeCost) {
            this.count -= this.clickUpgradeCost;
            this.clickValue++;
            this.clickUpgradeCost *= 1.5; // cost multiplier
            this.updateDisplay();
        }
    }

    buyAutoClicker() {
        if (this.count >= this.autoClickCost) {
            this.count -= this.autoClickCost;
            this.autoClickers++;
            this.autoClickCost = Math.floor(this.autoClickCost * 1.3); // Update cost for next auto clicker
            this.updateDisplay();
        }
    }

    upgradeAutoClicker() {
        if (this.count >= this.autoClickerUpgradeCost) {
            this.count -= this.autoClickerUpgradeCost;
            this.autoClickerUpgradeCost *= 1.5; // cost multiplier for the next upgrade
            this.autoClickers++; // Increase amount produced by each auto clicker
            this.updateDisplay();
        }
    }

    doubleClick() {
        if (this.count >= this.doubleClickUpgradeCost) {
            this.count -= this.doubleClickUpgradeCost;
            this.doubleClickActive = true;
            this.clickValue *= 2; // Double the click value
            setTimeout(() => {
                this.clickValue /= 2; // Restore the click value after 10 seconds
                this.doubleClickActive = false;
                this.updateDisplay();
            }, 10000);
            this.updateDisplay();
        }
    }

    luckyBoost() {
        if (this.count >= this.luckyBoostCost) {
            this.count -= this.luckyBoostCost;
            const luckyAmount = Math.floor(Math.random() * 500) + 1; // Random bonus between 1 and 500
            this.count += luckyAmount;
            this.updateDisplay();
        }
    }

    autoClick() {
        this.count += this.autoClickers;
        this.updateDisplay();
    }

    updateDisplay() {
        this.clickCountDisplay.textContent = this.count;
        this.clickValueDisplay.textContent = this.clickValue;
        this.autoClickersDisplay.textContent = this.autoClickers;
        this.clickUpgradeCostDisplay.textContent = Math.ceil(this.clickUpgradeCost);
        this.autoClickCostDisplay.textContent = Math.ceil(this.autoClickCost);
        this.autoClickerUpgradeCostDisplay.textContent = Math.ceil(this.autoClickerUpgradeCost);
        this.doubleClickUpgradeCostDisplay.textContent = Math.ceil(this.doubleClickUpgradeCost);
        this.luckyBoostCostDisplay.textContent = Math.ceil(this.luckyBoostCost);
    }
}

window.onload = () => {
    new CakeGame();
};