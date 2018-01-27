import Home from '../src/components/Home.vue'
import Follow from '../src/components/Follow.vue'
import Column from '../src/components/Column.vue'
import Article from '../src/components/Article.vue'

export default [
    {
        path: '/home',
        component: Home
    }, {
        path: '/follow',
        component: Follow
    }, {
        path: 'column',
        component: Column
    }, {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/article/:id',
        component: Article
    }
]

