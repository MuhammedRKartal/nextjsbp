export const account = {
  orders: '/web/user/orders',
  orderId: (id: string | string[]) => `/web/user/order/${id}`,
  updatePassword: '/web/user/password/change',
  updateNotifications: '/web/user/update-notifications'
};

export const basket = {
  getBasket: '/web/basket/get-basket',
  updateQuantity: '/web/basket/update-quantity',
  clearBasket: '/web/basket/clear-basket',
  addProduct: '/web/basket/add-item-to-basket'
};

export const product = {
  products: '/web/products',
  getProductByPk: (pk: string) => `/web/products/${pk}`
};

export const user = {
  currentUser: '/web/currentuser',
  login: '/web/user/login',
  register: '/web/user/register',
  confirmRegistration: '/web/user/confirm-registration',
  profile: '/web/user/profile'
};

const URLS = {
  basket,
  product,
  user,
  account
};

export { URLS };
