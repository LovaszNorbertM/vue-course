
const state = {
    modalOpen: false,
    trigger: null,
}

const mutations = {
    set_modalVisibility(state, payload) {
        state.modalOpen = payload;
    },
    set_triggerComponnet(state, payload) {
        state.trigger = payload;
    }
}

const actions = {
    set(context, {type, data}) {
        context.commit(`set_${type}`, data)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
}