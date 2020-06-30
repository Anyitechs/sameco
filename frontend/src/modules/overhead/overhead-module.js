import routes from '@/modules/overhead/overhead-routes';
import store from '@/modules/overhead/overhead-store';
import OverheadAutocompleteInput from '@/modules/overhead/components/overhead-autocomplete-input';

export default {
  components: [OverheadAutocompleteInput],
  routes,
  store,
};
