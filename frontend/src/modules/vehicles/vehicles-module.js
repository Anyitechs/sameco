import routes from '@/modules/vehicles/vehicles-routes';
import store from '@/modules/vehicles/vehicles-store';
import VehiclesAutocompleteInput from '@/modules/vehicles/components/vehicles-autocomplete-input';

export default {
  components: [VehiclesAutocompleteInput],
  routes,
  store,
};
