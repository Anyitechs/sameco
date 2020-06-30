import { PartsModel } from '@/modules/parts/parts-model';

const { fields } = PartsModel;

export default [
  fields.id,
  fields.name,
  fields.quantity,
  fields.status,
  fields.stock,
  fields.createdAt
];
