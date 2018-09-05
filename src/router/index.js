import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: resolve => require(['../components/HelloWorld'], resolve)
        },
        { path: "/video", component: resolve => require(["../components/video"], resolve) },
        { path: "/circle", component: resolve => require(["../components/circle"], resolve) }
    ]
})