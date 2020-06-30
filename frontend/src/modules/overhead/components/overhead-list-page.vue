<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.overhead.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.overhead.list.title"></app-i18n>
      </h1>

      <app-overhead-list-toolbar></app-overhead-list-toolbar>
      <app-overhead-list-filter></app-overhead-list-filter>
      <app-overhead-list-table></app-overhead-list-table>
    </div>
  </div>
</template>

<script>
import OverheadListFilter from '@/modules/overhead/components/overhead-list-filter.vue';
import OverheadListTable from '@/modules/overhead/components/overhead-list-table.vue';
import OverheadListToolbar from '@/modules/overhead/components/overhead-list-toolbar.vue';

export default {
  name: 'app-overhead-list-page',

  components: {
    [OverheadListFilter.name]: OverheadListFilter,
    [OverheadListTable.name]: OverheadListTable,
    [OverheadListToolbar.name]: OverheadListToolbar,
  },
};
</script>

<style>
</style>
