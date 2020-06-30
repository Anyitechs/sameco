import importerStore from '@/shared/importer/importer-store';
import { PartsService } from '@/modules/parts/parts-service';
import partsImporterFields from '@/modules/parts/parts-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  PartsService.import,
  partsImporterFields,
  i18n('entities.parts.importer.fileName'),
  i18n('entities.parts.importer.hint'),
);
