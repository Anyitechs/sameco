<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/parts' }">
        <app-i18n code="entities.parts.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.parts.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.parts.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.parts.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.parts.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-parts-form
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
import PartsForm from '@/modules/parts/components/parts-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-parts-form-page',

  props: ['id'],

  components: {
    [PartsForm.name]: PartsForm,
  },

  computed: {
    ...mapGetters({
      record: 'parts/form/record',
      findLoading: 'parts/form/findLoading',
      saveLoading: 'parts/form/saveLoading',
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
      doFind: 'parts/form/doFind',
      doNew: 'parts/form/doNew',
      doUpdate: 'parts/form/doUpdate',
      doCreate: 'parts/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/parts');
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
