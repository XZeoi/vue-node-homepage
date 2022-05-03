import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// content area
const TechnicalArticleView = () => import("@/components/content/TechnicalArticleView.vue")
const MyArticleView = () => import("@/components/content/MyArticleView.vue")
const PhotographView = () => import("@/components/content/PhotographView.vue")
const DesignView = () => import("@/components/content/DesignView.vue")
const DrawingView = () => import("@/components/content/DrawingView.vue")

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/content/technical_articles',
    component: Home,
    children: [
      { path: '/content/technical_articles', component: TechnicalArticleView },
      { path: '/content/my_articles', component: MyArticleView },
      { path: '/content/photographs', component: PhotographView },
      { path: '/content/designs', component:DesignView },
      { path: '/content/drawings', component: DrawingView },
    ]
  },
  {
    path: '/technical_article/:id',
    component: () => import('@/views/TechnicalArticle.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'isActive',
})

export default router
