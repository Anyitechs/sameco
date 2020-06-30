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

      <!-- <el-table-column :label="fields.id.label" :prop="fields.id.name" sortable="custom">
        <template slot-scope="scope">{{ presenter(scope.row, 'id') }}</template>
      </el-table-column> -->

      <el-table-column :label="fields.parts.label" :prop="fields.parts.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.parts.label"
            :permission="fields.parts.readPermission"
            :url="fields.parts.viewUrl"
            :value="presenter(scope.row, 'parts')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.vehicle.label" :prop="fields.vehicle.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.vehicle.label"
            :permission="fields.vehicle.readPermission"
            :url="fields.vehicle.viewUrl"
            :value="presenter(scope.row, 'vehicle')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.issueDate.label"
        :prop="fields.issueDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'issueDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.quantity.label"
        :prop="fields.quantity.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'quantity') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.otherExpenses.label"
        :prop="fields.otherExpenses.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'otherExpenses') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/overhead/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/overhead/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
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
import { OverheadModel } from '@/modules/overhead/overhead-model';
import { mapGetters, mapActions } from 'vuex';
import { OverheadPermissions } from '@/modules/overhead/overhead-permissions';
import { i18n } from '@/i18n';

const { fields } = OverheadModel;

export default {
  name: 'app-overhead-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'overhead/list/rows',
      count: 'overhead/list/count',
      loading: 'overhead/list/loading',
      pagination: 'overhead/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'overhead/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new OverheadPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new OverheadPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'overhead/list/doChangeSort',
      doChangePaginationCurrentPage:
        'overhead/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'overhead/list/doChangePaginationPageSize',
      doMountTable: 'overhead/list/doMountTable',
      doDestroy: 'overhead/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return OverheadModel.presenter(row, fieldName);
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
