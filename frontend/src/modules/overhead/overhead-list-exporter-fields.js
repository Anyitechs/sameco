import { OverheadModel } from '@/modules/overhead/overhead-model';

const { fields } = OverheadModel;

export default [
  fields.id,
  fields.parts,
  fields.vehicle,
  fields.issueDate,
  fields.quantity,
  fields.otherExpenses,
  fields.createdAt
];
