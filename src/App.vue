<template>
  <div id="app">
    <p v-if="loading"> ...Loading </p>
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="doStuff"> </button>
    <div v-if="!loading">
      <div>
        {{ checkIfFormChanged() }}
        <label for="email">Email</label>
        <input v-model="theCoolForm.email.value" id="email" >
        <span style="color: red">{{ theCoolForm.email.validationErrors }}</span>
      </div>

      <div>
        <label for="pw">FirstName</label>
        <input v-model="theCoolForm.firstName.value" id="pw" >
        <span style="color: red">{{ theCoolForm.firstName.validationErrors }}</span>
      </div>
      <button @click="saveForm" :disabled="!checkIfFormChanged()" >Save</button>
    </div>

    <ModalVue v-if="modalOpen">
      <template #header>
        <p>{{trigger}}</p>
      </template>
      <template #body>
        <div>
          <div v-for="(todo) in todos" :key="todo.id">
            <div class="todo">
              <TodoInput :value="todo.title" :todoId="todo.id"  @hasChanged="updateTitle" />
              <span :style="{ backgroundColor: todo.completed ? 'green': 'red' }">x</span>
              <button @click="completeTodo(todo.id)">Complete</button>
              <button @click="saveAsFavorite(todo.id)">+Favorite</button>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click="closeModal">Close</button>
      </template>
    </ModalVue>
  </div>
</template>

<script>
import ModalVue from './components/Modal.vue';
import {mapState, mapActions, mapMutations} from 'vuex';
import TodoInput from './components/TodoInput.vue';
import Validation from './mixins/validation.js';

export default {
  name: 'App',
  components: {
    ModalVue,
    TodoInput
  },
  mixins:[Validation],
  data() {
    return {
      loading: false,
      randomTitle: 'saasassas',
      form: {
        email: {
          value: '',
          validationErrors: null
        },
        password: {
          value: '',
          validationErrors: null
        }
      },
      theCoolForm: null,
      theinitialForm: null,
    }
  },
  computed: {
    ...mapState('modal', ['modalOpen', 'trigger']),
    ...mapState('counter', ['todos']),
    email: {
      get() {
        return this.form.email.value;
      },
      set(newValue) {
        console.log(newValue)
        const {success, message} = this.validateString(newValue,1,10);
        this.form.email.value = newValue;
        if(!success) {
          this.form.email.validationErrors = message;
        } else {
          this.form.email.validationErrors = null;
        }
      }
    },
    password: {
      get() {
        return this.form.password.value;
      },
      set(newValue) {
        console.log(newValue)
        const {success, message} = this.validateString(newValue,1,10);
        this.form.password.value = newValue;
        if(!success) {
          this.form.password.validationErrors = message;
        } else {
          this.form.password.validationErrors = null;
        }
      }
    }
  },
  async mounted() {
    this.loading = true;
    await this.getTodos();
    const user = {
      id: 1,
      firstName: 'Bob',
      lastName: 'Sorin',
      email: 'aa@gmail.com',
      phone: '555-55555',
      address: 'Undeva frumos'
    }
    // { id, firstName, lastName, email, phone, address }
    const newForm = {};
    Object.keys(user).forEach(key => {
      if( key !== 'id') newForm[key] = {
        value: user[key],
        validationErrors: null,
      }
    })
    this.$set(this, 'theinitialForm', JSON.parse(JSON.stringify(newForm)));
    this.$set(this, 'theCoolForm', newForm);
    this.loading = false;

  },
  watch: {
    'theCoolForm.email.value': {
      handler: function(newValue) {
        const {success, message} = this.validateString(newValue,1,15);
        this.checkIfFormChanged();
        if(!success) {
          this.theCoolForm.email.validationErrors = message;
        } else {
          this.theCoolForm.email.validationErrors = null;
        }
    },
    immediate: false,
    }
  },
  methods: {
    ...mapActions('counter', {
      setCounterData: 'set_data',
      increment: 'doIncrement',
      getTodos: 'getTodos',
      saveToLocalStorage: 'saveToLocalStorage',
      saveFavorite: 'saveFavorite',
      removeFavorite: 'removeFavorite',
      clearStorage: 'clearStorage'
    }),
    ...mapActions('modal', {
      setModal: 'set'
    }),
    ...mapMutations('counter',['set_updateTodo']),
    saveForm() {
      //Action to save
    this.$set(this, 'theinitialForm', JSON.parse(JSON.stringify(this.theCoolForm)));
    },
    checkIfFormChanged() {
      if(this.loading && (this.theinitialForm === null || this.theCoolForm === null)) {
        return false;
      }
      for(const key in this.theCoolForm) {
        if(this.theCoolForm[key].value !== this.theinitialForm[key].value) return true;
      }
      return false;
    },
    saveAsFavorite(id) {
      this.saveFavorite({id});
    },
    doStuff() {
      // actiunea care seteaza modalul;
      //{type: string numele mutatiei, data - payloadul mutatiei }
      this.setModal({type: 'triggerComponnet', data: 'App'});
      this.setModal({type: 'modalVisibility', data: true });
    },
    closeModal() {
      this.setModal({type: 'modalVisibility', data: false });
      this.setModal({type: 'triggerComponnet', data: null});
      this.clearStorage();
    },
    completeTodo(id) {
      this.set_updateTodo({id, key: 'completed', value: true});
      this.saveToLocalStorage();
    },
    updateTitle({id, value}) {
      this.set_updateTodo({id, key: 'title', value});
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
