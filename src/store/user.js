import * as firebase from 'firebase'

class User {
    constructor(id, {name, about, stack, team, position, imgSrc}) {
        this.id = id;
        this.name = name;
        this.about = about;
        this.team = team;
        this.position = position;
        this.stack = stack;
        this.imgSrc = imgSrc;
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
                await firebase.database().ref(`profiles/${user.uid}`).set({email, name});

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
                const fbValue = await firebase.database().ref(`profiles/${user.uid}`).once('value');
                const userDB = fbValue.val();

                commit('setUser', new User(user.uid, userDB));
                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
                commit('setError', e.message);

                throw e
            }
        },
        async autoLoginUser({commit}, user) {
            const fbValue = await firebase.database().ref(`profiles/${user.uid}`).once('value');
            const userDB = fbValue.val();

            commit('setUser', new User(user.uid, userDB))
        },
        logoutUser({commit}) {
            firebase.auth().signOut();
            commit('setUser', null)
        },
        async updateProfile({commit, getters}, {name, about, stack, team, position, image}) {
            commit('clearError');
            commit('setLoading', true);
            let imgSrc = getters.user.imgSrc ?  getters.user.imgSrc : null;

            try {
                if (image) {
                    const imageExt = image.name.slice(image.name.lastIndexOf('.'));

                    const fileData = await firebase.storage().ref(`profiles/${getters.user.id}.${imageExt}`).put(image);
                    imgSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
                }

                await firebase.database().ref('profiles').child(getters.user.id).update({name, about, stack, team, position, imgSrc});

                commit('setUser', new User(getters.user.id, {name, about, stack, team, position, imgSrc}));

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
        },
        isUserLoggedIn(state) {
            return state.user !== null
        }
    }
}
