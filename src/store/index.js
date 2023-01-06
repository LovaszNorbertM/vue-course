import Vuex from "vuex"
import Vue from 'vue'
import CounterModule from './modul1';
import moduleModal from "./moduleModal";
Vue.use(Vuex);
 
const store = new Vuex.Store({
    modules: {
      counter: CounterModule,
      modal: moduleModal,
    }
  });


  export default store;