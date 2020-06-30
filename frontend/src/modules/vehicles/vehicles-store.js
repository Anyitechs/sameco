import vehiclesListStore from '@/modules/vehicles/vehicles-list-store';
import vehiclesViewStore from '@/modules/vehicles/vehicles-view-store';
import vehiclesImporterStore from '@/modules/vehicles/vehicles-importer-store';
import vehiclesFormStore from '@/modules/vehicles/vehicles-form-store';
import vehiclesDestroyStore from '@/modules/vehicles/vehicles-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: vehiclesDestroyStore,
    form: vehiclesFormStore,
    list: vehiclesListStore,
    view: vehiclesViewStore,
    importer: vehiclesImporterStore,
  },
};
