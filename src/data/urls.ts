const API_URL = 'backend';

export const basket = {
  getBasket: '/baskets/basket/'
};

export const product = {
  getProductByPk: (pk: number) => `/product/${pk}/`,
  addProduct: '/baskets/basket/'
};

export const user = {
  currentUser: '/web/currentuser',
  login: '/web/login',
  register: '/web/register',
  confirmRegistration: '/web/confirmregistration',
  logout: '/users/logout',
  profiles: '/users/profile',
  forgotPassword: '/users/password/reset',
  csrfToken: '/csrf_token'
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
