import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import Loading from './components/loading'
import axios from 'axios'

Vue.use(VueRouter);
Vue.use(Loading);

const router = new VueRouter({
	routes
})

Vue.prototype.$http = axios;

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
