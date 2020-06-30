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
        <app-i18n code="entities.overhead.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.overhead.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.overhead.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.overhead.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-overhead-form
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
import OverheadForm from '@/modules/overhead/components/overhead-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-overhead-form-page',

  props: ['id'],

  components: {
    [OverheadForm.name]: OverheadForm,
  },

  computed: {
    ...mapGetters({
      record: 'overhead/form/record',
      findLoading: 'overhead/form/findLoading',
      saveLoading: 'overhead/form/saveLoading',
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
      doFind: 'overhead/form/doFind',
      doNew: 'overhead/form/doNew',
      doUpdate: 'overhead/form/doUpdate',
      doCreate: 'overhead/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/overhead');
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
