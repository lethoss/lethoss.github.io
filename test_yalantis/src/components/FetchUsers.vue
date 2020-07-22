  <template>
    <div>
      <Loader v-if="loading"/>
      <div v-else>
        <div v-for="(month, index) in monthArray" :key="index" class="month">
          <span :style="{color:month.color}" @mouseenter="showBornList(index)" @mouseleave="bornList = []">
            {{month.name}}
          </span>
        </div>
        <div class="bornList" v-if="bornList.length">
          Список людей, народжених цього місяця:
          <div v-for="(bornUser, index) in bornList">
            {{bornUser}}
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import Vue from 'vue'
  import Loader from '@/components/Loader.vue'
  export default {
    data: () => ({
      users: [],
      bornList: [],
      monthArray: [
        {
          name: 'Січень',
          bornedPeopleQuantity: 0,
        },
        {
          name: 'Лютий',
          bornedPeopleQuantity: 0,
        },
        {
          name: 'Березень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Квітень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Травень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Червень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Липень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Серпень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Вересень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Жовтень',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Листопад',
          bornedPeopleQuantity: 0
        },
        {
          name: 'Грудень',
          bornedPeopleQuantity: 0
        }
      ],
      loading: true
    }),
    components: {
      Loader
    },
    methods: {
      showBornList (index) {
        for (const i in this.users) {
          if (Number(this.users[i].dob.slice(5,7) - 1) === index) {
            this.bornList.push(this.users[i].firstName + ' ' + this.users[i].lastName)
          }
        }
      }
    },
    async mounted () {
      await fetch ('https://yalantis-react-school-api.yalantis.com/api/task0/users')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.users = data
      })
      for (const i in this.users) {
        this.monthArray[Number(this.users[i].dob.slice(5,7)) - 1].bornedPeopleQuantity++
      }
      for (const i in this.monthArray) {
        switch (true) {
          case this.monthArray[i].bornedPeopleQuantity >= 0 && this.monthArray[i].bornedPeopleQuantity <= 2: {
            Vue.set(this.monthArray[i], 'color', 'grey')
            break
          }
          case this.monthArray[i].bornedPeopleQuantity >= 3 && this.monthArray[i].bornedPeopleQuantity <= 6: {
            Vue.set(this.monthArray[i], 'color', 'blue')
            break
          }
          case this.monthArray[i].bornedPeopleQuantity >= 7 && this.monthArray[i].bornedPeopleQuantity <= 10: {
            Vue.set(this.monthArray[i], 'color', 'green')
            break
          }
          default: {
            Vue.set(this.monthArray[i], 'color', 'red')
            break
          }
        }
      }
      this.loading = false
    }
  }


  </script>

  <style>
  .month {
    display: inline-block;
    margin: 5px;
    width: 70px;
    text-align: center;
  }
  .bornList {
    text-align: center;
    margin-top: 50px;
  }
  </style>
