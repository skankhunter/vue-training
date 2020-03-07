import * as firebase from 'firebase'

class User {
    constructor(id) {
        this.id = id;
    }
}

export default {
    state: {
        user: null
    },
    actions: {
        async registerUser({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);

                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
                commit('setError', e.message);

                throw e
            }
        },
        async loginUser({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);

                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
                commit('setError', e.message);

                throw e
            }
        }

    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
}
