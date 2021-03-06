import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'

/* Main子路由 */
const Tag = () => import("@/views/Tag.vue")
const TechnicalArticle = () => import("@/views/TechnicalArticle.vue")
const MyArticle = () => import("@/views/MyArticle.vue")
const Photograph = () => import("@/views/Photograph.vue")
const Design = () => import("@/views/Design.vue")
const Drawing = () => import("@/views/Drawing.vue")
const AdminUser = () => import("@/views/AdminUser.vue")
const Setting = () => import("@/views/Setting.vue")

const ArticleDialog = () => import('@/components/ArticleDialog.vue')
const TechArticleDialog = () => import('@/components/TechArticleDialog.vue')
const WorkDialog = () => import('@/components/WorkDialog.vue')

const AdminUserDialog = () => import('@/components/AdminUserDialog.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/tags', component: Tag },
      {
        path: '/technical_articles',
        component: TechnicalArticle,
        // beforeEnter: (to, from) => {

        //   // reject the navigation
        //   return false
        // },
        children: [
          // { path: 'create', component: ArticleDialog },
          {
            path: 'create', component: TechArticleDialog, props: {
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'technical_articles'
            }
          },
          // { path: 'edit/:id', component: ArticleDialog,  props: true},
          {
            path: 'edit/:id', component: TechArticleDialog, props: route => ({
              id: route.params.id,
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'technical_articles'
            })
          },
        ]
      },
      {
        path: '/my_articles', component: MyArticle, children: [
          {
            path: 'create', component: ArticleDialog, props: {
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'my_articles'
            }
          },
          // { path: 'edit/:id', component: ArticleDialog,  props: true},
          {
            path: 'edit/:id', component: ArticleDialog, props: route => ({
              id: route.params.id,
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'my_articles'
            })
          },
        ]
      },
      {
        path: '/photographs', component: Photograph,
        children: [
          {
            path: 'create', component: WorkDialog, props: {
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'photographs'
            }
          },
          {
            path: 'edit/:id', component: WorkDialog, props: route => ({
              id: route.params.id,
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'photographs'
            })
          },
        ]
      },
      {
        path: '/designs', component: Design,
        children: [
          {
            path: 'create', component: WorkDialog, props: {
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'designs'
            }
          },
          {
            path: 'edit/:id', component: WorkDialog, props: route => ({
              id: route.params.id,
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'designs'
            })
          },
        ]
      },
      {
        path: '/drawings', component: Drawing,
        children: [
          {
            path: 'create', component: WorkDialog, props: {
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'drawings'
            }
          },
          {
            path: 'edit/:id', component: WorkDialog, props: route => ({
              id: route.params.id,
              tagPath: 'main_tags',
              subTagsPath: 'sub_tags',
              articlePath: 'drawings'
            })
          },
        ]
      },
      {path: "/admin_users", component: AdminUser, children: [
        {path: "create", component: AdminUserDialog, props: true}
      ]},
      {
        path: "/settings", component: Setting
      }
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

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
