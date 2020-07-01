let url = 'https://api.chucknorris.io/jokes/random'

let eventBus = new Vue ()

Vue.component ('joke-item', {
  data: function () {
    return {
      empty_heart: 'images/empty_heart.png',
      full_heart: 'images/full_heart.png',
      favoriteIcon: 'images/empty_heart.png',
      json: {},
      show: true
    }
  },
  created () {
    if (this.joke.duplicate === true) {
      this.show = true
      this.$destroy()
    }
    for (const key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue
      }
      if (this.joke.id === key) {
        this.show = !this.show
        this.$destroy()
      }
    }
    eventBus.$on('getIdBack', (id) => {
      if (this.joke.id === id) {
        eventBus.$once('unFavorite', (favoriteIcon) => {
          this.favoriteIcon = favoriteIcon
        })
      }
    })
  },
  methods: {
    mark: function () {
      eventBus.$emit('getId', this.joke.id)
      if (this.favoriteIcon === this.empty_heart) {
        this.favoriteIcon = this.full_heart
        eventBus.$emit('showChange', true)
        const json = JSON.stringify(this.joke)
        localStorage.setItem(this.joke.id, json)
      } else {
        this.favoriteIcon = this.empty_heart
        eventBus.$emit('showChange', false)
        localStorage.removeItem(this.joke.id)
      }
    }
  },
  template: `
  <div class='jokeDiv' :class='joke.id' v-if="show">
  <img v-bind:src=favoriteIcon v-on:click='mark' class='favoriteIcon' align='right'><br>
  <img src='images/comment.png' class='justIcon'>
  <span>ID:</span>
  <a
  target='_blank'  :href='"https://api.chucknorris.io/jokes/" + joke.id'>
  {{ joke.id }}
  </a>
  <img src='images/outlink.png' class='outlink'>
  <div>
  {{ joke.title }}
  </div>
  <div class='jokeFooter'>
  <span class='lastUpdateSpan'> Last update: {{ joke.timeTillUpdated }} hours ago </span><span v-bind:class='{ jokeCategorySpan: joke.category }'>{{ joke.category.toUpperCase() }}</span>
  </div>
  </div>
  `,
  props: ['joke']
})

Vue.component ('clone', {
  data: function () {
    return {
      favoriteIcon: 'images/full_heart.png',
      show: false,
      backcol: ''
    }
  },
  created () {
    if (this.joke.duplicate === true) {
      eventBus.$emit('setColor', this.joke.id)
      eventBus.$emit('isDuplicate', 'green')
      this.show = true
      this.$destroy()
    }
    for (const key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue
      }
      if (this.joke.id === key) {
        this.show = !this.show
      }
    }
    eventBus.$on('setColor', (id) => {
      if (this.joke.id === id) {
        eventBus.$once('isDuplicate', (backcol) => {
          this.backcol = backcol
        })
      }
    })
    eventBus.$on('getId', (id) => {
      if (this.joke.id === id) {
        eventBus.$once('showChange', (show) => {
          this.show = show
        })
      }
    })
  },
  methods: {
    mark: function () {
      this.show = false
      eventBus.$emit('getIdBack', this.joke.id)
      eventBus.$emit('unFavorite', 'images/empty_heart.png')
      localStorage.removeItem(this.joke.id)
    }
  },
  template: `
  <div class='jokeDiv' v-if='show' :style='{backgroundColor: backcol}'>
  <img v-bind:src=favoriteIcon v-on:click='mark' class='favoriteIcon' align='right'><br>
  <img src='images/comment.png' class='justIcon'>
  <span>ID:</span>
  <a
  target='_blank'  :href='"https://api.chucknorris.io/jokes/" + joke.id'>
  {{ joke.id }}
  </a>
  <img src='images/outlink.png' class='outlink'>
  <div>
  {{ joke.title }}
  </div>
  <div class='jokeFooter'>
  <span class='lastUpdateSpan'> Last update: {{ joke.timeTillUpdated }} hours ago </span><span v-bind:class='{ jokeCategorySpan: joke.category }'>{{ joke.category.toUpperCase() }}</span>
  </div>
  </div>`,
  props: ['joke']
})

const vm = new Vue ({
  el: '#app',
  data: {
    picked: '',
    from_category: false,
    from_search: false,
    categoryId: '',
    textForSearch: '',
    jokeArray: [{}],
    hide: ''
  },
  computed: {
    showJokeType: {
      get: function () {
        if (this.picked === 'from_category') {
          this.from_category = true
          this.from_search = false
        }
        if (this.picked === 'from_search') {
          this.from_category = false
          this.from_search = true
        }
        if (this.picked === 'random') {
          this.from_category = false
          this.from_search = false
        }
      },
      set: function () {
      }
    }
  },
  methods: {
    getTimeTillUpdated: function () {
      for (const i in this.jokeArray) {
        let now = new Date()
        now = Date.parse(now)
        this.jokeArray[i].timeTillUpdated = Date.parse(this.jokeArray[i].updated_at)
        this.jokeArray[i].timeTillUpdated = Math.round((now - this.jokeArray[i].timeTillUpdated) / (3.6e6))
      }
    },
    addJoke:
    function () {
      if (this.picked === 'random') {
        url = 'https://api.chucknorris.io/jokes/random'
      }
      if ((this.picked === 'from_category') && (this.categoryId)) {
        url = 'https://api.chucknorris.io/jokes/random?category=' + this.categoryId
      }
      if (this.picked === 'from_search') {
        url = 'https://api.chucknorris.io/jokes/search?query=' + encodeURIComponent(this.textForSearch)
      }
      fetch (url)
        .then(function (response) {
          return response.json().then((data) => {
            if (vm.textForSearch) {
              for (const i in data.result) {
                let duplicate = false
                for (const key in localStorage) {
                  if (!localStorage.hasOwnProperty(key)) {
                    continue
                  }
                  if (data.result[i].id === key) {
                    duplicate = true
                    break
                  } else {
                    duplicate = false
                  }
                }
                vm.jokeArray.push({
                  id: data.result[i].id,
                  title: data.result[i].value,
                  updated_at: data.result[i].updated_at,
                  category: '',
                  duplicate: duplicate
                })
                vm.getTimeTillUpdated()
                vm.textForSearch = ''
              }
            } else {
              vm.jokeArray.push({
                id: data.id,
                title: data.value,
                updated_at: data.updated_at,
                category: vm.categoryId,
                duplicate: false
              })
              vm.categoryId = ''
              vm.getTimeTillUpdated()
            }
          })
        })
    }
  },
  created () {
    if (screen.width > 992) {
      this.hide = true
    } else {
      this.hide = false
    }
    this.jokeArray.splice(0, 1)
    for (const key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue
      }
      this.jokeArray.push(JSON.parse(localStorage.getItem(key)))
    }
  }
})
