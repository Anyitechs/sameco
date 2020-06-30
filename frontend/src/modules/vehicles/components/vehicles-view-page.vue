<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/vehicles' }">
        <app-i18n code="entities.vehicles.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.vehicles.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.vehicles.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-vehicles-view-toolbar v-if="record"></app-vehicles-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-text :label="fields.vehicleNumber.label" :value="presenter(record, 'vehicleNumber')"></app-view-item-text>

        <app-view-item-text :label="fields.driver.label" :value="presenter(record, 'driver')"></app-view-item-text>

        <app-view-item-text :label="fields.phone.label" :value="presenter(record, 'phone')"></app-view-item-text>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VehiclesViewToolbar from '@/modules/vehicles/components/vehicles-view-toolbar.vue';
import { VehiclesModel } from '@/modules/vehicles/vehicles-model';

const { fields } = VehiclesModel;

export default {
  name: 'app-vehicles-view-page',

  props: ['id'],

  components: {
    [VehiclesViewToolbar.name]: VehiclesViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'vehicles/view/record',
      loading: 'vehicles/view/loading',
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
      doFind: 'vehicles/view/doFind',
    }),

    presenter(record, fieldName) {
      return VehiclesModel.presenter(record, fieldName);
    },
  },
};
</script>
