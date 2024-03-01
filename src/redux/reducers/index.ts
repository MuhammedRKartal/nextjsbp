import { api } from '@/data/client/api';
import headerReducer from '@/redux/reducers/header';
import miniBasketReducer from '@/redux/reducers/mini-basket';

const reducers = {
  [api.reducerPath]: api.reducer,
  header: headerReducer,
  miniBasket: miniBasketReducer
};

export default reducers;
