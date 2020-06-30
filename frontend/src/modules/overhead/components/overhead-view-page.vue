<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/overhead' }">
        <app-i18n code="entities.overhead.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.overhead.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.overhead.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-overhead-view-toolbar v-if="record"></app-overhead-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-relation-to-one
          :label="fields.parts.label"
          :permission="fields.parts.readPermission"
          :url="fields.parts.viewUrl"
          :value="presenter(record, 'parts')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-one
          :label="fields.vehicle.label"
          :permission="fields.vehicle.readPermission"
          :url="fields.vehicle.viewUrl"
          :value="presenter(record, 'vehicle')"
        ></app-view-item-relation-to-one>

        <app-view-item-text :label="fields.issueDate.label" :value="presenter(record, 'issueDate')"></app-view-item-text>

        <app-view-item-text :label="fields.quantity.label" :value="presenter(record, 'quantity')"></app-view-item-text>

        <app-view-item-text :label="fields.otherExpenses.label" :value="presenter(record, 'otherExpenses')"></app-view-item-text>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OverheadViewToolbar from '@/modules/overhead/components/overhead-view-toolbar.vue';
import { OverheadModel } from '@/modules/overhead/overhead-model';

const { fields } = OverheadModel;

export default {
  name: 'app-overhead-view-page',

  props: ['id'],

  components: {
    [OverheadViewToolbar.name]: OverheadViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'overhead/view/record',
      loading: 'overhead/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'overhead/view/doFind',
    }),

    presenter(record, fieldName) {
      return OverheadModel.presenter(record, fieldName);
    },
  },
};
</script>
