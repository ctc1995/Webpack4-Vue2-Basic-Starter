import Vue from 'vue'
// 导入路由模块
import router from './index-routing'

import './assets/font/iconfont.css'
import './assets/styles/index.scss'

const app = new Vue({
    el:'#root',
    router,
})

export default app