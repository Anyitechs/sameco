import partsListStore from '@/modules/parts/parts-list-store';
import partsViewStore from '@/modules/parts/parts-view-store';
import partsImporterStore from '@/modules/parts/parts-importer-store';
import partsFormStore from '@/modules/parts/parts-form-store';
import partsDestroyStore from '@/modules/parts/parts-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: partsDestroyStore,
    form: partsFormStore,
    list: partsListStore,
    view: partsViewStore,
    importer: partsImporterStore,
  },
};
