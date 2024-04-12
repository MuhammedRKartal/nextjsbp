import { api } from '@/data/client/api';
import headerReducer from '@/redux/reducers/header';
import popUpReducer from '@/redux/reducers/pop-ups';

const reducers = {
  [api.reducerPath]: api.reducer,
  header: headerReducer,
  popUps: popUpReducer
};

export default reducers;
