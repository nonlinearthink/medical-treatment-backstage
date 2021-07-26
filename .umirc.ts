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
      wrappers: ['@/wrappers/LoginWrapper'],
      routes: [
        { path: '/welcome', component: '@/pages/WelcomePage', exact: true },
        {
          path: '/root',
          component: '@/pages/RootPage',
          exact: true,
          wrappers: ['@/wrappers/SuperAdminWrapper'],
        },
        {
          path: '/org',
          component: '@/pages/OrgPage',
        },
        {
          path: '/org/dept',
          component: '@/pages/DeptPage',
          exact: true,
          name: '科室',
        },
        { path: '/diagnosis', component: '@/pages/DiagnosisPage', exact: true },
        { path: '/drug', component: '@/pages/DrugPage', exact: true },
        { path: '/doctor', component: '@/pages/DoctorPage', exact: true },
        {
          path: '/doctor/new',
          component: '@/pages/CreateDoctorPage',
          exact: true,
        },
        {
          path: '/doctor/edit',
          component: '@/pages/EditDoctorPage',
          exact: true,
        },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
});
