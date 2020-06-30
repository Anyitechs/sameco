import { VehiclesModel } from '@/modules/vehicles/vehicles-model';

const { fields } = VehiclesModel;

export default [
  fields.id,
  fields.vehicleNumber,
  fields.driver,
  fields.phone,
  fields.createdAt
];
