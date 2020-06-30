import { OverheadModel } from '@/modules/overhead/overhead-model';

const { fields } = OverheadModel;

export default [
  fields.parts,
  fields.vehicle,
  fields.issueDate,
  fields.quantity,
  fields.otherExpenses,
];
