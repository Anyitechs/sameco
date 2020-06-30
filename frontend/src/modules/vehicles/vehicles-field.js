import { VehiclesService } from '@/modules/vehicles/vehicles-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class VehiclesField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/vehicles',
      Permissions.values.vehiclesRead,
      VehiclesService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.vehicleNumber,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/vehicles',
      Permissions.values.vehiclesRead,
      VehiclesService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.vehicleNumber,
        };
      },
      options,
    );
  }
}
