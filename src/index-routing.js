import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=> import('./app/home/home')
const About = ()=> import('./app/about/about')

Vue.use(VueRouter)
const routes=[
    {
        path:"/home", component:Home
    },
    {
        path:"/about", component:About
    },
]

const router = new VueRouter({routes})

export default router;