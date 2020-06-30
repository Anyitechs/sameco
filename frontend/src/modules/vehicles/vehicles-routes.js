import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const VehiclesListPage = () =>
  import('@/modules/vehicles/components/vehicles-list-page.vue');
const VehiclesFormPage = () =>
  import('@/modules/vehicles/components/vehicles-form-page.vue');
const VehiclesViewPage = () =>
  import('@/modules/vehicles/components/vehicles-view-page.vue');
const VehiclesImporterPage = () =>
  import('@/modules/vehicles/components/vehicles-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'vehicles',
        path: '/vehicles',
        component: VehiclesListPage,
        meta: {
          auth: true,
          permission: Permissions.values.vehiclesView,
        },
      },
      {
        name: 'vehiclesNew',
        path: '/vehicles/new',
        component: VehiclesFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.vehiclesCreate,
        },
      },
      {
        name: 'vehiclesImporter',
        path: '/vehicles/import',
        component: VehiclesImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.vehiclesImport,
        },
      },
      {
        name: 'vehiclesEdit',
        path: '/vehicles/:id/edit',
        component: VehiclesFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.vehiclesEdit,
        },
        props: true,
      },
      {
        name: 'vehiclesView',
        path: '/vehicles/:id',
        component: VehiclesViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.vehiclesView,
        },
        props: true,
      },
    ],
  },
];
