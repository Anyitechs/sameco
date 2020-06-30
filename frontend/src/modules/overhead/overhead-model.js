import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import { PartsField } from '@/modules/parts/parts-field';
import { VehiclesField } from '@/modules/vehicles/vehicles-field';

function label(name) {
  return i18n(`entities.overhead.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  parts: PartsField.relationToOne('parts', label('parts'), {
    "required": true
  }),
  vehicle: VehiclesField.relationToOne('vehicle', label('vehicle'), {
    "required": true
  }),
  issueDate: new DateTimeField('issueDate', label('issueDate'), {
    "required": true
  }),
  quantity: new IntegerField('quantity', label('quantity'), {
    "required": true
  }),
  otherExpenses: new StringField('otherExpenses', label('otherExpenses'), {}),
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
  issueDateRange: new DateTimeRangeField(
    'issueDateRange',
    label('issueDateRange'),
  ),
  quantityRange: new IntegerRangeField(
    'quantityRange',
    label('quantityRange'),
  ),
};

export class OverheadModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
