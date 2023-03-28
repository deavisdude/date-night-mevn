import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: '',
    uid: '',
    selectedDestination: null,
    selectedVisit: null
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
    },
    setSelectedVisit(state, newVisit){
      state.selectedVisit = newVisit;
    }
  },
});

export default store;
