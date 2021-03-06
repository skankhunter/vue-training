import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase'
import BuyModal from "./components/Shared/BuyModal";
import CardProfile from './components/User/CardProfile'
import CardProfileModal from './components/User/CardProfileModal'

Vue.config.productionTip = false;
Vue.component('app-buy-modal', BuyModal);
Vue.component('app-card-profile', CardProfile);
Vue.component('app-card-profile-modal', CardProfileModal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAe7x26-O076x1mkmdnHmVY2VQDPJHt38g',
      authDomain: "vue-test-1ae71.firebaseapp.com",
      databaseURL: "https://vue-test-1ae71.firebaseio.com",
      projectId: "vue-test-1ae71",
      storageBucket: "vue-test-1ae71.appspot.com",
      messagingSenderId: "967591476155",
      appId: "1:967591476155:web:6df25647dbdc4b41daa29e"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    });
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app');
