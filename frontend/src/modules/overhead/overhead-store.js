import overheadListStore from '@/modules/overhead/overhead-list-store';
import overheadViewStore from '@/modules/overhead/overhead-view-store';
import overheadImporterStore from '@/modules/overhead/overhead-importer-store';
import overheadFormStore from '@/modules/overhead/overhead-form-store';
import overheadDestroyStore from '@/modules/overhead/overhead-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: overheadDestroyStore,
    form: overheadFormStore,
    list: overheadListStore,
    view: overheadViewStore,
    importer: overheadImporterStore,
  },
};
