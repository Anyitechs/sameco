import importerStore from '@/shared/importer/importer-store';
import { OverheadService } from '@/modules/overhead/overhead-service';
import overheadImporterFields from '@/modules/overhead/overhead-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  OverheadService.import,
  overheadImporterFields,
  i18n('entities.overhead.importer.fileName'),
  i18n('entities.overhead.importer.hint'),
);
