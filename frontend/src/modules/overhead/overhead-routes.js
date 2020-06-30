import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const OverheadListPage = () =>
  import('@/modules/overhead/components/overhead-list-page.vue');
const OverheadFormPage = () =>
  import('@/modules/overhead/components/overhead-form-page.vue');
const OverheadViewPage = () =>
  import('@/modules/overhead/components/overhead-view-page.vue');
const OverheadImporterPage = () =>
  import('@/modules/overhead/components/overhead-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'overhead',
        path: '/overhead',
        component: OverheadListPage,
        meta: {
          auth: true,
          permission: Permissions.values.overheadView,
        },
      },
      {
        name: 'overheadNew',
        path: '/overhead/new',
        component: OverheadFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.overheadCreate,
        },
      },
      {
        name: 'overheadImporter',
        path: '/overhead/import',
        component: OverheadImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.overheadImport,
        },
      },
      {
        name: 'overheadEdit',
        path: '/overhead/:id/edit',
        component: OverheadFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.overheadEdit,
        },
        props: true,
      },
      {
        name: 'overheadView',
        path: '/overhead/:id',
        component: OverheadViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.overheadView,
        },
        props: true,
      },
    ],
  },
];
