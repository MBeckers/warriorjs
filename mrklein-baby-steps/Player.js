class Player {
    constructor() {
        this.shouldHeal=false;
    }
    playTurn(warrior) {
        this.turn(warrior, this.strategy(warrior));
    }

    strategy(warrior) {
        if (!warrior.feel().isEmpty()) {
            if (warrior.feel().isWall()) {
                return ['pivot', 'backward'];
            }
        }

        if (!warrior.feel().isEmpty()) {
            if (warrior.feel().getUnit().isEnemy()) {
                return ['attack', 'forward'];
            } else {
                return ['rescue', 'forward'];
            }
        }

        if (warrior.health() < 5) {
            this.shouldHeal=true;

        }

        if (warrior.health() >= 20) {
            this.shouldHeal=false;
        }


        const fields = warrior.look();
        const field = fields[fields.length-1];

        warrior.think(field.getUnit());
        if (!field.isEmpty() && !field.isStairs() && !field.isWall() && !field.getUnit().isBound() && field.getUnit().isEnemy()) {
            return ['shoot', 'forward'];
        }

        if (this.shouldHeal) {
            if (warrior.feel('backward').isEmpty()) {
                return ['walk', 'backward']
            }

            return ['rest', ''];
        }

        return ['walk', 'forward'];
    }

    turn(warrior, strategy) {
        warrior[strategy[0]](strategy[1]);
    }
}
