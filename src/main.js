import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/shared/BuyModal'
import fb from 'firebase/app'
import 'firebase/auth'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyAbVP-oNm7zqsJiSm1eTXr0pLSVjBl-AAc',
      authDomain: 'itc-ads-41154.firebaseapp.com',
      databaseURL: 'https://itc-ads-41154.firebaseio.com',
      projectId: 'itc-ads-41154',
      storageBucket: 'itc-ads-41154.appspot.com',
      messagingSenderId: '229371092459'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
