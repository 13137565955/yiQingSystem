import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import('@/components/menu/Login.vue')
  },
  //管理员界面
  {
    path: '/admin',
    component: () => import('@/components/menu/Admin.vue'),
    children: [{
        path: 'student',
        component: () => import('@/components/main/studentAdmin.vue')
      },
      {
        path: 'teacher',
        component: () => import('@/components/main/teacherAdmin.vue')
      },
      {
        path: 'home',
        component: () => import('@/components/homepage/homepage.vue')
      },
      {
        path: 'noticeSend',
        component: () => import('@/components/main/noticeSend.vue')
      },
      {
        path: 'otp',
        component: () => import('@/components/socket/otp_socket.vue')
      },
      {
        path: 'oto',
        component: () => import('@/components/socket/otp_socket.vue')
      },
      {
        path: 'add',
        component: () => import('@/components/main/addclass.vue')
      },
    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('@/components/menu/Student.vue'),
    children: [{
        path: 'home',
        component: () => import('@/components/homepage/homepage.vue')
      },
      {
        path: 'myNotice',
        component: () => import('@/components/main/myNotice.vue')
      },
      {
        path: 'health',
        component: () => import('@/components/main/healthTable.vue')
      },
      {
        path: 'application',
        component: () => import('@/components/main/application.vue')
      },
      {
        path: 'user',
        component: () => import('@/components/main/user.vue')
      },
      {
        path: 'otp',
        component: () => import('@/components/socket/otp_socket.vue')
      },
      {
        path: 'oto',
        component: () => import('@/components/socket/otp_socket.vue')
      },
    ]
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('@/components/menu/Teacher.vue'),
    children: [{
        path: 'home',
        component: () => import('@/components/homepage/homepage.vue')
      },
      {
        path: 'notice',
        component: () => import('@/components/main/noticeSend.vue')
      },
      {
        path: 'leave',
        component: () => import('@/components/main/leave.vue')
      },
      {
        path: 'user',
        component: () => import('@/components/main/user.vue')
      },
      {
        path: 'otp',
        component: () => import('@/components/socket/otp_socket.vue')
      },
      {
        path: 'oto',
        component: () => import('@/components/socket/otp_socket.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  //   next() 放行 next('/Login') 强制跳转
  if (to.path === '/') return next()
  // 获取token
  const token = window.localStorage.getItem('token')
  if (!token) return next('/')
  next()
})
export default router