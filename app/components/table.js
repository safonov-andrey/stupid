class Table {
    trump = null;
    cards = {
        all: [],
        attack: [],
        defense: [],
    };

    constructor(trump) {
        this.trump = trump;
    }

    addAttackCards(cards) {
        this.cards.all.push(...cards);
        this.cards.attack.push(...cards);
    }

    getAttackCards() {
        return this.cards.attack;
    }

    // TODO this check should in the game class
    addDefenseCards(cards) {
        if (cards && cards.length) {
            this.cards.all.push(...cards);
            this.cards.defense.push(...cards);
        }
    }

    getDefenseCards() {
        return this.cards.defense;
    }

    // TODO move this method to the game class
    allCardsCovered() {
        if (this.cards.attack.length !== this.cards.defense.length) {
            return false;
        }

        // TODO for
        for (var i = 0; i < this.cards.attack.length; i++) {
            var attackCard = this.cards.attack[i];
            var defenseCard = this.cards.defense[i];

            var equalSuits = attackCard.suit === defenseCard.suit;
            var isDefenseTrump = defenseCard.suit === this.trump
            var heigherRank = attackCard.rank < defenseCard.rank;

            if (!equalSuits && !isDefenseTrump) {
                return false;
            }
            if (equalSuits && !heigherRank) {
                return false;
            }
        }

        return true;
    }

    moveAllCoveredCards() {
        this.cards.attack = [];
        this.cards.defense = [];
    }
}

module.exports = Table;
