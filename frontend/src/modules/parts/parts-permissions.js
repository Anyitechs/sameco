import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class PartsPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.partsRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.partsImport,
    );
    this.partsAutocomplete = permissionChecker.match(
      Permissions.values.partsAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.partsCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.partsEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.partsDestroy,
    );
  }
}
