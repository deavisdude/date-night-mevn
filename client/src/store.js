import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: '',
    uid: '',
    selectedDestination: null
  },
  mutations: {
    setUsername(state, newUsername) {
      state.username = newUsername;
    },
    setUid(state, newUid) {
      state.uid = newUid;
    },
    setSelectedDestination(state, newDestination){
      state.selectedDestination = newDestination;
    }
  },
});

export default store;
