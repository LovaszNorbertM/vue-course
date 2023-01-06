import {get} from '../../api/api';

const storage = localStorage;
const favoritesKey = 'FAVORITE_TODOS';
/*
TODO
@completed Boolean
@id Number
@title String
@userId Number
*/

const initialFavorites = () => {
    const favorites = localStorage.getItem(favoritesKey);
    if(typeof favorites === 'string') {
        return JSON.parse(favorites);
    } else {
        return [];
    }
}

const state = {
    counter: 0,
    todos: [],
    favoriteTodos: initialFavorites(),
}

const mutations = {
    increment(state) {
        state.counter++;
    },
    decrement(state) {
        state.counter--;
    },
    set_todos(state, {todos}) {
        state.todos = todos;
    },
    // key = title | completd | id | userId;
    set_updateTodo(state, {id, key, value}) {
        let todoPosition;
        // state.todos.find(el => (el.id === id))
        const newTodo = state.todos.find((el, index) => {
            todoPosition = el.id === id ? index : null;
            return el.id === id;
        });
        console.log(newTodo);
        newTodo[key] = value;
        state.todos.splice(todoPosition, 1, newTodo);
    },
    set_addFavorite(state, {id}) {
        const favoriteTodo = state.todos.find(el => el.id === id);
        if( favoriteTodo ) {
            if( state.favoriteTodos.find(el => el.id === favoriteTodo.id)) {
                return; 
            } else {
                state.favoriteTodos.push(favoriteTodo);
            }
        }
    },
    set_removeFavorite(state, {id}) {
        const newFavoriteTodos = state.favoriteTodos.filter(el => el.id !== id);
        state.favoriteTodos = newFavoriteTodos;
    }
}

const actions = {
    someCoolAction(context) {
        console.log(context)
    },
    doIncrement(context) {
        context.commit('increment');
    },
    setToState(context, {type, payload}) {
        context.commit(`set_${type}`, payload);
    },
    async getTodos(context) {
        console.log('Started to get todos');
        const {status, data } = await get('todos');
        if(status <400) {
            console.log(data);
            context.commit('set_todos', {todos: data});
        } else {
            console.log(status);
        }
    },
    saveToLocalStorage(context) {
        console.log(context);
        console.log(storage);
    },
    saveFavorite(context, {id}){
        context.commit('set_addFavorite', {id})
        localStorage.setItem(favoritesKey, JSON.stringify(context.state.favoriteTodos))
    },
    removeFavorite(context, {id}) {
        context.commit('set_removeFavorite', {id})
        localStorage.setItem(favoritesKey, JSON.stringify(context.state.favoriteTodos))

    },
    clearStorage() {
        localStorage.clear();
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
}