
Vue.component ('list-item', {
  data: function () {
    return {
      showSublistButton: true,
      isNotFirsttItemInList: true,
      isNotLasttItemInList: true,
      text: '',
      placeholder: 'Enter some text',
      backcol: 'white'
    }
  },
  mounted () {
    if (this.$root.isBackcol) {
      this.backcol = "#" + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase()
    }
    if (this.$el === this.$el.parentNode.firstChild) {
      this.isNotFirsttItemInList = false
    }
    if (this.$el === this.$el.parentNode.lastChild) {
      for (let i in this.$parent.$children) {
        this.$parent.$children[i].isNotLasttItemInList = true
      }
      this.isNotLasttItemInList = false
    }
  },
  methods: {
    liftUpText: function () {
      if (this.$el.previousSibling === this.$el.parentNode.firstChild) {
        for (let i in this.$parent.$children) {
          this.$parent.$children[i].isNotFirsttItemInList = true
        }
        this.isNotFirsttItemInList = false
      }
      if (this.$el === this.$el.parentNode.lastChild) {
        this.isNotLasttItemInList = true
        for (let i in this.$parent.$children) {
          if (this.$parent.$children[i].$el === this.$el.previousSibling) {
            this.$parent.$children[i].isNotLasttItemInList = false
          }
        }
      }
      this.$el.parentNode.insertBefore(this.$el, this.$el.previousSibling)
    },
    putDownText: function () {
      if (this.$el.nextSibling === this.$el.parentNode.lastChild) {
        for (let i in this.$parent.$children) {
          this.$parent.$children[i].isNotLasttItemInList = true
        }
        this.isNotLasttItemInList = false
      }
      if (this.$el === this.$el.parentNode.firstChild) {
        this.isNotFirsttItemInList = true
        for (let i in this.$parent.$children) {
          if (this.$parent.$children[i].$el === this.$el.nextSibling) {
            this.$parent.$children[i].isNotFirsttItemInList = false
          }
        }
      }
      this.$el.parentNode.insertBefore(this.$el.nextSibling, this.$el)
    },
    removeSublist: function () {
      this.showSublistButton = !this.showSublistButton
      Vue.delete(this.list, 'children', [{}])
    },
    makeSublist: function () {
      this.showSublistButton = !this.showSublistButton
      Vue.set(this.list, 'children', [{
        text: '',
        haveNotSublist: true,
        children: []
      }])
    },
    deleteListItem: function () {
      if (this.$el === this.$el.parentNode.firstChild) {
        for (let i in this.$parent.$children) {
          if (this.$parent.$children[i].$el === this.$el.nextSibling) {
            this.$parent.$children[i].isNotFirsttItemInList = false
          }
        }
      }
      if (this.$el === this.$el.parentNode.lastChild) {
        for (let i in this.$parent.$children) {
          if (this.$parent.$children[i].$el === this.$el.previousSibling) {
            this.$parent.$children[i].isNotLasttItemInList = false
          }
        }
      }
      this.$el.remove()
    },
    addListItem: function () {
      if (this.text) {
        this.list.children.push({
          text: this.text,
          haveNotSublist: false
        })
        this.text = ''
        this.placeholder = 'Enter some text'
      } else {
        this.placeholder = 'Firstly you must add some text'
      }
    }
  },
  template: `
  <li>
    <ul :style='{backgroundColor: this.backcol}'>
      <list-item
      v-for="(child, index) in list.children"
      :key="index"
      :list="child"
      ></list-item>
    </ul>
    <div class="listItemText">{{list.text}}</div>
    <button v-if="list.text" @click="deleteListItem">Delete</button>
    <button v-if="list.text" v-show="isNotFirsttItemInList" @click="liftUpText">Up</button>
    <button v-if="list.text" v-show="isNotLasttItemInList" @click="putDownText">Down</button>
    <button v-if="!list.haveNotSublist" v-show="showSublistButton" @click="makeSublist">Add sublist</button>
    <button v-if="!list.haveNotSublist" v-show="!showSublistButton" @click="removeSublist">Remove Sublist</button>
    <div v-if="list.haveNotSublist">
      <form v-on:submit.prevent>
        <input v-model="text" v-bind:placeholder="this.placeholder" />
        <button @click="addListItem">Add</button>
      </form>
    </div>
  </li>
  `,
  props: {
    list: Object
  }
})

var vm = new Vue({
  el: '#app',
  data: {
    isBackcol: false,
    test: '',
    listData: {
      text: '',
      haveNotSublist: true,
      children: []
    }
  }
})
