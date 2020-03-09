import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imgSrc = '', promo = false, id = null) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imgSrc = imgSrc;
        this.id = id;
        this.promo = promo;
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        },
        loadAds(state, payload) {
            state.ads = payload
        },
        updateAd(state, {title, description, id}) {
            const ad = state.ads.find(item => item.id === id);

            ad.title = title;
            ad.description = description;
        }
    },
    actions: {
        async createAd({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);
            const image = payload.image;

            try {
                const {
                    title,
                    description,
                    promo
                } = payload;

                const newAd = new Ad(
                    title,
                    description,
                    getters.user.id,
                    '',
                    promo
                );

                const ad = await firebase.database().ref('ads').push(newAd);
                const imageExt = image.name.slice(image.name.lastIndexOf('.'));

                const fileData = await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);
                const imgSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();

                await firebase.database().ref('ads').child(ad.key).update({imgSrc});

                commit('createAd', {...newAd, id: ad.key, imgSrc});

                commit('setLoading', false);
            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);

                throw e
            }
        },
        async fetchAds({commit}) {
            commit('clearError');
            commit('setLoading', true);
            const resultAds = [];

            try {
                const fbValue = await firebase.database().ref('ads').once('value');
                const ads = fbValue.val();
                ads && Object.keys(ads).forEach(key => {
                    const ad = ads[key];

                    resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imgSrc, ad.promo, key))
                });

                commit('loadAds', resultAds);

                commit('setLoading', false);
            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);

                throw e
            }
        },
        async updateAd({commit}, {title, description, id}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                await firebase.database().ref('ads').child(id).update({title, description});

                commit('updateAd', {title, description, id});
                commit('setLoading', false);
            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);

                throw e
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(item => item.promo)
        },
        myAds(state, getters) {
            return state.ads.filter(item => item.ownerId === getters.user.id)
        },
        adById(state) {
            return adId => state.ads.find(ad => ad.id === adId)
        }
    }
}
