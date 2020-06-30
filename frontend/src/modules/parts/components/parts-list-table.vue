<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column
        :label="fields.images.label"
        :prop="fields.images.name"
        align="center"
      >
        <template slot-scope="scope">
          <app-list-item-image :value="presenter(scope.row, 'images')"></app-list-item-image>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.name.label"
        :prop="fields.name.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'name') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.quantity.label"
        :prop="fields.quantity.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'quantity') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.status.label"
        :prop="fields.status.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'status') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.stock.label"
        :prop="fields.stock.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'stock') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/parts/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/parts/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { PartsModel } from '@/modules/parts/parts-model';
import { mapGetters, mapActions } from 'vuex';
import { PartsPermissions } from '@/modules/parts/parts-permissions';
import { i18n } from '@/i18n';

const { fields } = PartsModel;

export default {
  name: 'app-parts-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'parts/list/rows',
      count: 'parts/list/count',
      loading: 'parts/list/loading',
      pagination: 'parts/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'parts/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new PartsPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new PartsPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'parts/list/doChangeSort',
      doChangePaginationCurrentPage:
        'parts/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'parts/list/doChangePaginationPageSize',
      doMountTable: 'parts/list/doMountTable',
      doDestroy: 'parts/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return PartsModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
};
</script>

<style>
</style>
