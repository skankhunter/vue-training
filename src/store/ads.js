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
        ads: [
            {
                title: 'First ad',
                description: 'salam aleikum',
                promo: false,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: '123'
            },
            {
                title: 'Second ad',
                description: 'salam aleikum',
                promo: true,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                id: '234'
            },
            {
                title: 'Third ad',
                description: 'salam aleikum',
                promo: true,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '432'
            }
        ]
    },
    mutations: {
        createAd(state, payload) {
            state.ads.push(payload)
        }
    },
    actions: {
        async createAd({commit, getters}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const {
                    title,
                    description,
                    imgSrc,
                    promo
                } = payload;

                const newAd = new Ad(
                    title,
                    description,
                    getters.user.id,
                    imgSrc,
                    promo
                );

                const ad = await firebase.database().ref('ads').push(newAd);
                commit('createAd', {...newAd, id: ad.key});

                commit('setLoading', false);
            } catch (e) {
                commit('setError', e.message);
                commit('setLoading', false);

                throw Error
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
        myAds(state) {
            return state.ads
        },
        adById(state) {
            return adId => state.ads.find(ad => ad.id === adId)
        }
    }
}
