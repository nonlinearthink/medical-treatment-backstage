import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: true,
  },
  base: '/admin/',
  dynamicImport: {},
  dva: {
    immer: true,
    hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/LoginPage', exact: true },
    {
      path: '/',
      component: '@/pages/index',
      wrappers: ['@/wrappers/LoginWrapper'],
      routes: [
        { path: '/welcome', component: '@/pages/WelcomePage', exact: true },
        {
          path: '/root',
          component: '@/pages/RootPage',
          exact: true,
          wrappers: ['@/wrappers/SuperAdminWrapper'],
        },
        { path: '/drug', component: '@/pages/DrugPage', exact: true },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
