import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class VehiclesPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.vehiclesRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.vehiclesImport,
    );
    this.vehiclesAutocomplete = permissionChecker.match(
      Permissions.values.vehiclesAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.vehiclesCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.vehiclesEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.vehiclesDestroy,
    );
  }
}
