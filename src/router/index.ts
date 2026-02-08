import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Detail from '@/views/Detail.vue'
import History from '@/views/History.vue'
import MobileDashboard from '@/views/MobileDashboard.vue'
import { isMobileDevice } from '@/utils/device'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Dashboard,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/mobile',
    name: 'MobileDashboard',
    component: MobileDashboard,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全局前置守卫：移动设备访问首页时重定向到 /mobile
router.beforeEach((to, _from, next) => {
  // 如果是移动设备且访问根路径 '/'，则重定向到 /mobile
  if (to.path === '/' && isMobileDevice()) {
    next('/mobile')
    return
  }
  // 否则正常导航
  next()
})

export default router