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
        createAd({commit}, payload) {
            payload.id = "654";

            commit('createAd', payload)
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
