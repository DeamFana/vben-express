import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('测试'),
    },
    name: 'franztest',
    path: '/franztest',
    children: [
      {
        meta: {
          title: $t('测试表格'),
        },
        name: 'testTable',
        path: '/franztest/testTable',
        component: () => import('#/views/franz/basic.vue'),
      },
    ],
  },
];

export default routes;
