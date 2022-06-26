import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'place',
      component: () => import('@/views/Place.vue'),
      meta: {
        pageTitle: 'Place List',
        // breadcrumb: [
        //   {
        //     text: 'Place',
        //     active: true,
        //   },
        // ],
      },
    },
    {
      path: '/place-detail/:id',
      name: 'placeDetail',
      component: () => import('@/views/PlaceDetail.vue'),
      meta: {
        pageTitle: 'Place Detail',
        breadcrumb: [
          {
            text: 'Place List',
            to: { name: 'place' },
          },
          {
            text: 'Place Detail',
            active: true,
          },
        ],
      },
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
