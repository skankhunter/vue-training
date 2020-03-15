import * as firebase from "firebase";

export default {
    state: {
        profiles: null
    },
    mutations: {
        setProfiles(state, payload) {
            state.profiles = payload;
        }
    },
    actions: {
        async fetchProfiles({commit}) {
            commit('clearError');
            commit('setLoading', true);
            const result = [];

            try {
                const fileData = await firebase.database().ref('profiles').once('value');
                const profilesDB = fileData.val();

                if (profilesDB) {
                    Object.keys(profilesDB).forEach(key => result.push(profilesDB[key]))
                }

                commit('setProfiles', result);

                commit('setLoading', false);
            } catch (e) {
                commit('setLoading', false);
                commit('setError', e.message);

                throw e
            }
        }
    },
    getters: {
        profiles(state) {
            return state.profiles
        }
    }
}
