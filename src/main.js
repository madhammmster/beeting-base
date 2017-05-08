import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'

// views
import Home from './views/home.vue'
import Profile from './views/profile.vue'
const routes = [
  { path: '/app', component: Home },
  { path: '/app/profile', component: Profile },
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
   mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
