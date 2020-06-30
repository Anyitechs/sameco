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
        <app-i18n code="entities.vehicles.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.vehicles.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.vehicles.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.vehicles.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-vehicles-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!findLoading"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VehiclesForm from '@/modules/vehicles/components/vehicles-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-vehicles-form-page',

  props: ['id'],

  components: {
    [VehiclesForm.name]: VehiclesForm,
  },

  computed: {
    ...mapGetters({
      record: 'vehicles/form/record',
      findLoading: 'vehicles/form/findLoading',
      saveLoading: 'vehicles/form/saveLoading',
    }),

    isEditing() {
      return !!this.id;
    },
  },

  async created() {
    if (this.isEditing) {
      await this.doFind(this.id);
    } else {
      await this.doNew();
    }
  },

  methods: {
    ...mapActions({
      doFind: 'vehicles/form/doFind',
      doNew: 'vehicles/form/doNew',
      doUpdate: 'vehicles/form/doUpdate',
      doCreate: 'vehicles/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/vehicles');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
};
</script>

<style>
</style>
