import { PartsModel } from '@/modules/parts/parts-model';

const { fields } = PartsModel;

export default [
  fields.name,
  fields.quantity,
  fields.status,
  fields.images,
  fields.stock,
];
