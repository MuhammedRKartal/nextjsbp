/* eslint-disable @akinon/projectzero/client-url */

const API_URL = 'backend';

export const basket = {
  getBasket: '/baskets/basket/'
};

export const product = {
  getProductByPk: (pk: number) => `/product/${pk}/`,
  addProduct: '/baskets/basket/'
};

export const user = {
  currentUser: '/current_user/',
  login: '/users/login/',
  register: '/users/registration/',
  logout: '/users/logout',
  profiles: '/users/profile/',
  forgotPassword: '/users/password/reset/',
  changeEmailVerification: (token: string) =>
    `/users/email-set-primary/${token}/`,
  confirmEmailVerification: (token: string) =>
    `/users/registration/account-confirm-email/${token}/`,
  csrfToken: '/csrf_token/'
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
