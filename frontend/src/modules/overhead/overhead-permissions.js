import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class OverheadPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.overheadRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.overheadImport,
    );
    this.overheadAutocomplete = permissionChecker.match(
      Permissions.values.overheadAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.overheadCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.overheadEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.overheadDestroy,
    );
  }
}
