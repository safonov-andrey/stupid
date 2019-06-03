/**
 * This class holds the state of game table: all cards that are
 *  on the table and current turn defence and attack cards.
 *  */
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
        this.cards.all.push(...cards);
        this.cards.defense.push(...cards);
    }

    getDefenseCards() {
        return this.cards.defense;
    }

    clear() {
        this.cards.all = [];
        this.cards.attack = [];
        this.cards.defense = [];
    }
}

module.exports = Table;
