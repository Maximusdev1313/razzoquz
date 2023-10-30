
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'order', component: () => import('pages/Order.vue') },
      { path: 'search', component: () => import('pages/SearchPage.vue') },
      { path: 'wait-room', component: () => import('pages/WaitPage.vue') },
      // { path: 'category/:id', component: () => import('pages/Categories.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
