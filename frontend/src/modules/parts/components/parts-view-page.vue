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
        <app-i18n code="entities.parts.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.parts.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-parts-view-toolbar v-if="record"></app-parts-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-text :label="fields.name.label" :value="presenter(record, 'name')"></app-view-item-text>

        <app-view-item-text :label="fields.quantity.label" :value="presenter(record, 'quantity')"></app-view-item-text>

        <app-view-item-text :label="fields.status.label" :value="presenter(record, 'status')"></app-view-item-text>

        <app-view-item-image :label="fields.images.label" :value="presenter(record, 'images')"></app-view-item-image>

        <app-view-item-text :label="fields.stock.label" :value="presenter(record, 'stock')"></app-view-item-text>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PartsViewToolbar from '@/modules/parts/components/parts-view-toolbar.vue';
import { PartsModel } from '@/modules/parts/parts-model';

const { fields } = PartsModel;

export default {
  name: 'app-parts-view-page',

  props: ['id'],

  components: {
    [PartsViewToolbar.name]: PartsViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'parts/view/record',
      loading: 'parts/view/loading',
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
      doFind: 'parts/view/doFind',
    }),

    presenter(record, fieldName) {
      return PartsModel.presenter(record, fieldName);
    },
  },
};
</script>
