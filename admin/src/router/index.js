import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'

/* Main子路由 */ 
const Tag = () => import("@/views/Tag.vue")
const TechnicalArticle = () => import("@/views/TechnicalArticle.vue")
const MyArticle = () => import("@/views/MyArticle.vue")
const Photograph = () => import("@/views/Photograph.vue")
const Design = () => import("@/views/Design.vue")
const Drawing = () => import("@/views/Drawing.vue")

const ArticleDialog = () => import('@/components/ArticleDialog.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/tags', component: Tag },
      { path: '/technical_articles', 
        component: TechnicalArticle, 
        // beforeEnter: (to, from) => {
          
        //   // reject the navigation
        //   return false
        // },
        children: [
        { path: 'create', component: ArticleDialog },
        { path: 'edit/:id', component: ArticleDialog, props: true },
      ]},
      { path: '/my_articles', component: MyArticle },
      { path: '/photographs', component: Photograph },
      { path: '/designs', component: Design },
      { path: '/drawings', component: Drawing },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
