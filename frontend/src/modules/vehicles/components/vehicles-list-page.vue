<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.vehicles.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.vehicles.list.title"></app-i18n>
      </h1>

      <app-vehicles-list-toolbar></app-vehicles-list-toolbar>
      <app-vehicles-list-filter></app-vehicles-list-filter>
      <app-vehicles-list-table></app-vehicles-list-table>
    </div>
  </div>
</template>

<script>
import VehiclesListFilter from '@/modules/vehicles/components/vehicles-list-filter.vue';
import VehiclesListTable from '@/modules/vehicles/components/vehicles-list-table.vue';
import VehiclesListToolbar from '@/modules/vehicles/components/vehicles-list-toolbar.vue';

export default {
  name: 'app-vehicles-list-page',

  components: {
    [VehiclesListFilter.name]: VehiclesListFilter,
    [VehiclesListTable.name]: VehiclesListTable,
    [VehiclesListToolbar.name]: VehiclesListToolbar,
  },
};
</script>

<style>
</style>
