import { createStore } from 'vuex';

const store = createStore({
  state: {
    username: '',
    uid: ''
  },
  mutations: {
    setUsername(state, newUsername) {
      state.username = newUsername;
    },
    setUid(state, newUid) {
      state.uid = newUid;
    },
  },
});

export default store;
