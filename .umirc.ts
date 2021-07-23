import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
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
      routes: [
        { path: '/welcome', component: '@/pages/WelcomePage', exact: true },
        { path: '/root', component: '@/pages/RootPage', exact: true },
        { path: '/drug', component: '@/pages/DrugPage', exact: true },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
