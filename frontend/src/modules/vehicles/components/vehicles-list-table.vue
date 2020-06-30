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
        :label="fields.vehicleNumber.label"
        :prop="fields.vehicleNumber.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'vehicleNumber') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.driver.label"
        :prop="fields.driver.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'driver') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.phone.label"
        :prop="fields.phone.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'phone') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/vehicles/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/vehicles/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
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
import { VehiclesModel } from '@/modules/vehicles/vehicles-model';
import { mapGetters, mapActions } from 'vuex';
import { VehiclesPermissions } from '@/modules/vehicles/vehicles-permissions';
import { i18n } from '@/i18n';

const { fields } = VehiclesModel;

export default {
  name: 'app-vehicles-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'vehicles/list/rows',
      count: 'vehicles/list/count',
      loading: 'vehicles/list/loading',
      pagination: 'vehicles/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'vehicles/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new VehiclesPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new VehiclesPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'vehicles/list/doChangeSort',
      doChangePaginationCurrentPage:
        'vehicles/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'vehicles/list/doChangePaginationPageSize',
      doMountTable: 'vehicles/list/doMountTable',
      doDestroy: 'vehicles/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return VehiclesModel.presenter(row, fieldName);
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
