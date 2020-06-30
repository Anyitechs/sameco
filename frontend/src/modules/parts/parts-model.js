import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import ImagesField from '@/shared/fields/images-field';

function label(name) {
  return i18n(`entities.parts.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.parts.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true
  }),
  quantity: new IntegerField('quantity', label('quantity'), {
    "required": true
  }),
  status: new EnumeratorField('status', label('status'), [
    { id: 'available', label: enumeratorLabel('status', 'available') },
    { id: 'unavailable', label: enumeratorLabel('status', 'unavailable') },
  ],{}),
  images: new ImagesField('images', label('images'), 'parts/images',{
    "size": 3000000
  }),
  stock: new IntegerField('stock', label('stock'), {}),
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
  quantityRange: new IntegerRangeField(
    'quantityRange',
    label('quantityRange'),
  ),
  stockRange: new IntegerRangeField(
    'stockRange',
    label('stockRange'),
  ),
};

export class PartsModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
