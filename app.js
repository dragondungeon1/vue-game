const game = new Vue({
  el: "#game",
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
      this.monsterHealth -= attackValue;
      this.logMessage('player', 'attack', attackValue)
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = Math.floor(Math.random() * (15 - 5)) + 5;
      this.playerHealth -= attackValue;
      this.logMessage('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      const attackValue = Math.floor(Math.random() * (22 - 12)) + 5;
      this.monsterHealth -= attackValue;
      this.logMessage('player', 'attack', attackValue)
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      this.currentRound++;
      const healValue = Math.floor(Math.random() * (20 - 8)) + 8;
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.logMessage('player', 'heal', healValue)
      this.attackPlayer();
    },
    restartGame(){
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = false;
      this.currentRound = 0;
      this.logMessages = [];
    },
    surrender() {
      this.winner ='monster';
      this.playerHealth = 0
    },
    logMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {width: '0%'};
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {width: '0%'};
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecial() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value){
       if (value <= 0 && this.monsterHealth <= 0) {
         this.winner = "draw";
       }else if (value <= 0) {
         this.winner = "monster"  
       }
    },
    monsterHealth(value){
      if (value <= 0 &&this.playerHealth <=0) {
        this.winner ="draw";
      }else if (value <= 0) {
        this.winner = "player;"
      }
    }
  },
});