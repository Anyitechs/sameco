import importerStore from '@/shared/importer/importer-store';
import { VehiclesService } from '@/modules/vehicles/vehicles-service';
import vehiclesImporterFields from '@/modules/vehicles/vehicles-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  VehiclesService.import,
  vehiclesImporterFields,
  i18n('entities.vehicles.importer.fileName'),
  i18n('entities.vehicles.importer.hint'),
);
