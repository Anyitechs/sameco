<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item :label="fields.id.label" :prop="fields.id.name" v-if="isEditing">
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :disabled="true" v-model="model[fields.id.name]" />
        </el-col>
      </el-form-item>
              <el-form-item
          :label="fields.parts.label"
          :prop="fields.parts.name"
          :required="fields.parts.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-parts-autocomplete-input
              :fetchFn="fields.parts.fetchFn"
              :mapperFn="fields.parts.mapperFn"
              :showCreate="!modal"
              v-model="model[fields.parts.name]"
              mode="single"
            ></app-parts-autocomplete-input>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.vehicle.label"
          :prop="fields.vehicle.name"
          :required="fields.vehicle.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-vehicles-autocomplete-input
              :fetchFn="fields.vehicle.fetchFn"
              :mapperFn="fields.vehicle.mapperFn"
              :showCreate="!modal"
              v-model="model[fields.vehicle.name]"
              mode="single"
            ></app-vehicles-autocomplete-input>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.issueDate.label"
          :prop="fields.issueDate.name"
          :required="fields.issueDate.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-date-picker placeholder type="datetime" v-model="model[fields.issueDate.name]"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.quantity.label"
          :prop="fields.quantity.name"
          :required="fields.quantity.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input-number :precision="0" :step="1" v-model="model[fields.quantity.name]" ></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.otherExpenses.label"
          :prop="fields.otherExpenses.name"
          :required="fields.otherExpenses.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input v-model="model[fields.otherExpenses.name]" />
          </el-col>
        </el-form-item>
      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doReset" icon="el-icon-fa-undo">
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doCancel" icon="el-icon-fa-close">
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { OverheadModel } from '@/modules/overhead/overhead-model';

const { fields } = OverheadModel;
const formSchema = new FormSchema([
  fields.id,
  fields.parts,
  fields.vehicle,
  fields.issueDate,
  fields.quantity,
  fields.otherExpenses,
]);

export default {
  name: 'app-overhead-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const { id, ...values } = formSchema.cast(this.model);

      return this.$emit('submit', {
        id,
        values,
      });
    },
  },
};
</script>

<style>
</style>
