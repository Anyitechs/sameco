import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import StringField from '@/shared/fields/string-field';

function label(name) {
  return i18n(`entities.vehicles.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  vehicleNumber: new StringField('vehicleNumber', label('vehicleNumber'), {
    "required": true
  }),
  driver: new StringField('driver', label('driver'), {
    "required": true
  }),
  phone: new StringField('phone', label('phone'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),

};

export class VehiclesModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
