<template>
  <el-form
    :label-position="labelPosition"
    :label-width="labelWidthFilter"
    :model="model"
    :rules="rules"
    @submit.native.prevent="doFilter"
    class="filter"
    ref="form"
  >
    <el-row>
      <!-- <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.id.label" :prop="fields.id.name">
          <el-input v-model="model[fields.id.name]"/>
        </el-form-item>
      </el-col> -->

      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.parts.label" :prop="fields.parts.name">
          <app-autocomplete-one-input
            :fetchFn="fields.parts.fetchFn"
            v-model="model[fields.parts.name]"
          ></app-autocomplete-one-input>
        </el-form-item>
      </el-col>

      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.vehicle.label" :prop="fields.vehicle.name">
          <app-autocomplete-one-input
            :fetchFn="fields.vehicle.fetchFn"
            v-model="model[fields.vehicle.name]"
          ></app-autocomplete-one-input>
        </el-form-item>
      </el-col>

      <el-col style="margin-bottom: -0.41px;" :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.issueDateRange.label" :prop="fields.issueDateRange.name">
          <el-date-picker type="datetimerange" v-model="model[fields.issueDateRange.name]"></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item
          :label="fields.quantityRange.label"
          :prop="fields.quantityRange.name"
        >
          <app-number-range-input v-model="model[fields.quantityRange.name]"/>
        </el-form-item>
      </el-col>

      <!-- <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.otherExpenses.label" :prop="fields.otherExpenses.name">
          <el-input v-model="model[fields.otherExpenses.name]"/>
        </el-form-item>
      </el-col> -->
    </el-row>

    <div class="filter-buttons">
      <el-button :disabled="loading" @click="doFilter" icon="el-icon-fa-search" type="primary">
        <app-i18n code="common.search"></app-i18n>
      </el-button>

      <el-button :disabled="loading" @click="doResetFilter" icon="el-icon-fa-undo">
        <app-i18n code="common.reset"></app-i18n>
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FilterSchema } from '@/shared/form/filter-schema';
import { OverheadModel } from '@/modules/overhead/overhead-model';

const { fields } = OverheadModel;

const filterSchema = new FilterSchema([
  fields.id,
  fields.parts,
  fields.vehicle,
  fields.issueDateRange,
  fields.quantityRange,
  fields.otherExpenses,
]);

export default {
  name: 'app-overhead-list-filter',

  data() {
    return {
      rules: filterSchema.rules(),
      model: {},
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthFilter: 'layout/labelWidthFilter',
      loading: 'overhead/list/loading',
      filter: 'overhead/list/filter',
    }),

    fields() {
      return fields;
    },
  },

  async mounted() {
    this.model = filterSchema.initialValues(
      this.filter,
      this.$route.query,
    );

    return this.doFilter();
  },

  methods: {
    ...mapActions({
      doReset: 'overhead/list/doReset',
      doFetch: 'overhead/list/doFetch',
    }),

    async doResetFilter() {
      this.model = filterSchema.initialValues();
      this.$refs.form.clearValidate();
      return this.doReset();
    },

    async doFilter() {
      try {
        await this.$refs.form.validate();
        this.$refs.form.clearValidate();
      } catch (error) {
        return;
      }

      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
      });
    },
  },
};
</script>

<style>
</style>
