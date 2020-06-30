<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.parts.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.parts.list.title"></app-i18n>
      </h1>

      <app-parts-list-toolbar></app-parts-list-toolbar>
      <app-parts-list-filter></app-parts-list-filter>
      <app-parts-list-table></app-parts-list-table>
    </div>
  </div>
</template>

<script>
import PartsListFilter from '@/modules/parts/components/parts-list-filter.vue';
import PartsListTable from '@/modules/parts/components/parts-list-table.vue';
import PartsListToolbar from '@/modules/parts/components/parts-list-toolbar.vue';

export default {
  name: 'app-parts-list-page',

  components: {
    [PartsListFilter.name]: PartsListFilter,
    [PartsListTable.name]: PartsListTable,
    [PartsListToolbar.name]: PartsListToolbar,
  },
};
</script>

<style>
</style>
