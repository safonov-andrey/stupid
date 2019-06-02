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

    addDefenseCards(cards) {
        if (cards && cards.length) {
            this.cards.all.push(...cards);
            this.cards.defense.push(...cards);
        }
    }

    getDefenseCards() {
        return this.cards.defense;
    }

    allCardsCovered() {
        if (this.cards.attack.length !== this.cards.defense.length) {
            return false;
        }

        this.cards.attack.forEach((attackCard, i) => {
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
        });

        return true;
    }
}

module.exports = Table;
