function getRandomValue(min, max) {
  Math.floor(Math.random() * (max - min)) + min;
}

const app = new Vue({
  el: "#game",
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(5, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackPlayer() {},
    specialAttackMonster() {
      const attackValue = Math.floor(Math.random() * (22 - 12)) + 5;
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;

      }
    },
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecial() {
      return this.currentRound % 3 !== 0;
    },
  },
});