import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const PartsListPage = () =>
  import('@/modules/parts/components/parts-list-page.vue');
const PartsFormPage = () =>
  import('@/modules/parts/components/parts-form-page.vue');
const PartsViewPage = () =>
  import('@/modules/parts/components/parts-view-page.vue');
const PartsImporterPage = () =>
  import('@/modules/parts/components/parts-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'parts',
        path: '/parts',
        component: PartsListPage,
        meta: {
          auth: true,
          permission: Permissions.values.partsView,
        },
      },
      {
        name: 'partsNew',
        path: '/parts/new',
        component: PartsFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.partsCreate,
        },
      },
      {
        name: 'partsImporter',
        path: '/parts/import',
        component: PartsImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.partsImport,
        },
      },
      {
        name: 'partsEdit',
        path: '/parts/:id/edit',
        component: PartsFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.partsEdit,
        },
        props: true,
      },
      {
        name: 'partsView',
        path: '/parts/:id',
        component: PartsViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.partsView,
        },
        props: true,
      },
    ],
  },
];
