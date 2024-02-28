import { api } from '@/data/client/api';
import headerReducer from '@/redux/reducers/header';

const reducers = {
  [api.reducerPath]: api.reducer,
  header: headerReducer
};

export default reducers;
