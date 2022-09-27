import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: 'goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: { isShow: true, title: '商品列表' },
        component: () => import('../views/goods/GoodsView.vue'),
      },
      {
        path: 'user',
        name: 'user',
        meta: { isShow: true, title: '用户列表' },
        component: () => import('../views/user/UserView.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: { isShow: true, title: '角色列表' },
        component: () => import('../views/role/RoleView.vue'),
      },
      {
        path: 'authority',
        name: 'authority',
        meta: { isShow: false, title: '权限列表' },
        component: () => import('../views/authority/AuthorityView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;
