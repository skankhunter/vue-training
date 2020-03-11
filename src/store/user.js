import * as firebase from 'firebase'

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export default {
    state: {
        user: null
    },
    actions: {
        async registerUser({commit}, {email, password, name}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await firebase.database().ref(`/profiles/${user.uid}`).set({email, name});

                commit('setUser', new User(user.uid, name));
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
                const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);

                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
                commit('setError', e.message);

                throw e
            }
        },
       async autoLoginUser({commit}, user) {
           const fbValue = await firebase.database().ref(`/profiles/${user.uid}`).once('value');
           const userDB = fbValue.val();

           commit('setUser', new User(user.uid, userDB.name))
        },
        logoutUser({commit}) {
            firebase.auth().signOut();
            commit('setUser', null)
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
        },
        isUserLoggedIn(state) {
            return state.user !== null
        }
    }
}
