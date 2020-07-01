Vue.component ('cart', {
  data: function () {
    return {
      change: false,
      count: 0
    }
  },
  updated () {
    if ((this.count > 0) && (this.emoji.backcol === 'white')) {
      this.change = false
    }
    this.count++
  },
  methods: {
    changeCart: function () {
      if (this.emoji.backcol === 'white') {
        this.count = 0
        this.change = true
        this.$emit('change-cart', this.emoji)
      }
    }
  },
  template: `
  <div  v-bind:class="{'openedCart': change, 'closedCart': !change}" v-on:click="changeCart">
  <div class='cart'></div>
  <div class='cartBack' :style='{backgroundColor: emoji.backcol}'> {{ emoji.emoji }} </div>
  </div>
  `,
  props: ['emoji']
})

const vm = new Vue ({
  el: '#vm',
  data: {
    count: 0,
    gameTimer: 0,
    gameEnd: false,
    gameStatus: '',
    buttonText: '',
    greenCardCount: 0,
    timer: {
      min: '01',
      sec: '00'
    },
    emojiArray: [{
      id: 0,
      emoji: '🐶',
      backcol: 'white'
    },
    {
      id: 1,
      emoji: '🐶',
      backcol: 'white'
    },
    {
      id: 2,
      emoji: '🐱',
      backcol: 'white'
    },
    {
      id: 3,
      emoji: '🐱',
      backcol: 'white'
    },
    {
      id: 4,
      emoji: '🐹',
      backcol: 'white'
    },
    {
      id: 5,
      emoji: '🐹',
      backcol: 'white'
    },
    {
      id: 6,
      emoji: '🐵',
      backcol: 'white'
    },
    {
      id: 7,
      emoji: '🐵',
      backcol: 'white'
    },
    {
      id: 8,
      emoji: '🐯',
      backcol: 'white'
    },
    {
      id: 9,
      emoji: '🐯',
      backcol: 'white'
    },
    {
      id: 10,
      emoji: '🐼',
      backcol: 'white'
    },
    {
      id: 11,
      emoji: '🐼',
      backcol: 'white'
    }],
    forCompare: [{
      id: '',
      emoji: ''
    }]
  },
  methods: {
    regame: function () {
      this.gameEnd = false
      this.timer.min = '01'
      this.timer.sec = '00'
      this.count = 0
      for (let i in this.$children) {
        this.$children[i].change = false
        this.$children[i].count = 0
        this.$children[i].emoji.backcol = 'white'
      }
      this.emojiArray.sort(() => Math.random() - 0.5)
    },
    rotateCart: function (getLastCart) {
      if (!this.count) {
        this.timer.min = '00'
        this.timer.sec = '59'
        this.gameTimer = setInterval(function startTimer (timer) {
          timer.sec--
          if (timer.sec == 0) {
            vm.gameEnd = true
            vm.gameStatus = 'Lose'
            vm.buttonText = 'Try again'
            clearTimeout(vm.gameTimer)
          }
          if (timer.sec < 10) {
            timer.sec = '0' + timer.sec
          }
        }, 1000, this.timer)
      }
      this.forCompare.push({
        id: getLastCart.id,
        emoji: getLastCart.emoji
      })
      if (this.forCompare[this.forCompare.length - 1].id !== this.forCompare[this.forCompare.length - 2].id) {
        this.count++
        if (this.count % 2 === 0) {
          if (this.forCompare[this.forCompare.length - 1].emoji === this.forCompare[this.forCompare.length - 2].emoji) {
            for (const i in this.emojiArray) {
              if (this.emojiArray[i].emoji === this.forCompare[this.forCompare.length - 1].emoji) {
                this.emojiArray[i].backcol = '#5AD66F'
                this.greenCardCount++
              }
            }
          } else {
            for (const i in this.emojiArray) {
              if (this.emojiArray[i].id === this.forCompare[this.forCompare.length - 1].id) {
                this.emojiArray[i].backcol = '#F44336'
              }
              if (this.emojiArray[i].id === this.forCompare[this.forCompare.length - 2].id) {
                this.emojiArray[i].backcol = '#F44336'
              }
            }
          }
        } else {
          if (this.count > 1) {
            this.count = 1
            for (const i in this.emojiArray) {
              if (this.emojiArray[i].id === this.forCompare[this.forCompare.length - 2].id) {
                if (this.emojiArray[i].backcol !== '#5AD66F') this.emojiArray[i].backcol = 'white'
              }
              if (this.emojiArray[i].id === this.forCompare[this.forCompare.length - 3].id) {
                if (this.emojiArray[i].backcol !== '#5AD66F') this.emojiArray[i].backcol = 'white'
              }
            }
          }
        }
      }
      if (this.greenCardCount === this.emojiArray.length) {
        this.gameEnd = true
        this.gameStatus = 'Win'
        this.buttonText = 'Play again'
        this.greenCardCount = 0
        clearTimeout(this.gameTimer)
      }
    }
  },
  created () {
    this.emojiArray.sort(() => Math.random() - 0.5)
  }
})
