Vue.component('chat-item', {
  methods: {
    openDialog: function () {
      this.$emit('send-dialog', this.chat)
    }
  },
  template: `
  <div class="chat-item" v-on:click="openDialog" v-if="chat.show">
    <img class="chat-item-avatar" v-bind:src="chat.avatar" alt="avatar">
    <img class="status" v-bind:src="chat.status" alt="status">
    <div class="chat-content">
      <div>
        <span> {{chat.name}} </span>
        <span class="chat-date">{{chat.chatHistory[chat.chatHistory.length - 1].date}}</span>
      </div>
      <div class="chat-text">{{chat.chatHistory[chat.chatHistory.length - 1].text}}</div>
    </div>
  </div>
  `,
  props: ['chat']
})

Vue.component('dialog-item', {
  template: `
  <span class="dialog-item">
    <img v-bind:class="{'dialog-item-avatar': !dialog.iSpeak}" v-if="!dialog.iSpeak" v-bind:src="currentAvatar" alt="avatar">
    <div v-bind:class="{'leftText': !dialog.iSpeak, 'rightText': dialog.iSpeak} ">{{dialog.text}}</div><br>
    <div v-bind:class="{'leftDate': !dialog.iSpeak, 'rightDate': dialog.iSpeak} ">{{dialog.date}} {{dialog.time}}</div>
  </span>
  `,
  props: ['dialog', 'currentAvatar']
})

const app = new Vue({
  el: '#app',
  data: {
    dialoges: {},
    currentAvatar: '',
    currentStatus: '',
    currentName: '',
    messageText: '',
    searchText: '',
    startingMessage: true,
    chatItemsArray: [{
      id: 1,
      name: 'Name One',
      avatar: 'images/avatar1.jpg',
      status: 'images/status_ok.png',
      show: true,
      chatHistory: [{
        iSpeak: true,
        text: 'Hello! 1111111111 1111111111 11111111 11111111111111111111111 111111111111111 11111111111 11111111 11111111 1111111',
        time: '15:05',
        date: '06/02/2020'
      },
      {
        iSpeak: false,
        text: 'Hey!',
        time: '15:06',
        date: '06/02/2020'
      },
      {
        iSpeak: false,
        text: 'How are you?',
        time: '15:07',
        date: '06/02/2020'
      },
      {
        iSpeak: true,
        text: 'i am ok! And you?',
        time: '15:10',
        date: '06/02/2020'
      }]
    },
    {
      id: 2,
      name: 'Name Two',
      avatar: 'images/avatar2.jpg',
      status: 'images/status_ok.png',
      show: true,
      chatHistory: [{
        iSpeak: true,
        text: 'Good luck! See you later. And dont forget to call me at 9',
        time: '17:05',
        date: '06/02/2020'
      }]
    },
    {
      id: 3,
      name: 'Name Three',
      avatar: 'images/avatar3.jpg',
      status: 'images/status_ok.png',
      show: true,
      chatHistory: [{
        iSpeak: true,
        text: 'no. Dont call me more',
        time: '7:55',
        date: '06/01/2020'
      },
      {
        iSpeak: false,
        text: 'ok',
        time: '7:56',
        date: '06/01/2020'
      }]
    },
    {
      id: 4,
      name: 'Name Four',
      avatar: 'images/no-avatar.jpg',
      status: 'images/status_ok.png',
      show: true,
      chatHistory: [{
        iSpeak: true,
        text: 'some text some text',
        time: '8:55',
        date: '06/03/2020'
      },
      {
        iSpeak: false,
        text: 'some another text',
        time: '12:56',
        date: '06/03/2020'
      }]
    }
    ]
  },
  methods: {
    sendDialog: function (dialog) {
      this.startingMessage = false
      this.dialoges = dialog.chatHistory
      this.currentAvatar = dialog.avatar
      this.currentStatus = dialog.status
      this.currentName = dialog.name
    },
    searchContact: function () {
      for (const i in this.chatItemsArray) {
        this.chatItemsArray[i].show = false
        if (this.chatItemsArray[i].name.toLowerCase().includes(this.searchText.toLowerCase())) {
          this.chatItemsArray[i].show = true
        }
      }
    },
    sendMessage: function () {
      if (this.dialoges.length) {
        let dateAndTime = new Date()
        dateAndTime = dateAndTime.toLocaleString()
        let date = dateAndTime.slice(0, 11).replace(/\./g, '/')
        date = date.split('/', 2).reverse().join('/') + date.slice(5, 10)
        const time = dateAndTime.slice(12, 17)
        this.dialoges.push({
          iSpeak: true,
          text: this.messageText,
          time: time,
          date: date
        })
        this.messageText = ''
        fetch('https://api.chucknorris.io/jokes/random')
          .then(function (response) {
            return response.json().then((data) => {
              let dateAndTime = new Date()
              dateAndTime = dateAndTime.toLocaleString()
              let date = dateAndTime.slice(0, 11).replace(/\./g, '/')
              date = date.split('/', 2).reverse().join('/') + date.slice(5, 10)
              const time = dateAndTime.slice(12, 17)
              app.dialoges.push({
                iSpeak: false,
                text: data.value,
                time: time,
                date: date
              })
            })
          })
      }
    }
  }
})
