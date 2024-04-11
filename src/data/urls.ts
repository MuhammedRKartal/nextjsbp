const API_URL = 'backend';

export const basket = {
  getBasket: '/web/basket/getbasket',
  updateQuantity: '/web/basket/updateQuantity',
  clearBasket: '/web/basket/clearbasket'
};

export const product = {
  products: '/web/products',
  getProductByPk: (pk: number) => `/web/products/${pk}/`,
  addProduct: '/web/basket/additemtobasket/'
};

export const user = {
  currentUser: '/web/currentuser',
  login: '/web/login',
  register: '/web/register',
  confirmRegistration: '/web/confirmregistration',
  logout: '/users/logout',
  profiles: '/users/profile',
  forgotPassword: '/users/password/reset'
};

const URLS = {
  basket,
  product,
  user
};

const UrlProxyHandler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return new Proxy(target[prop], {
        apply(target, thisArgs, argumentList) {
          return `${API_URL}${target(...argumentList)}`;
        }
      });
    }

    return `${API_URL}${target[prop]}`;
  }
};

Object.keys(URLS).forEach((key) => {
  URLS[key] = new Proxy(URLS[key], UrlProxyHandler);
});

export { URLS };
