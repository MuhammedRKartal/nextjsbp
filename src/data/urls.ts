export const account = {
  orders: "/web/user/orders",
  lastActiveOrder: "/web/user/get-active-order",
  orderId: (id: string | string[]) => `/web/user/order/${id}`,
  updateNotifications: "/web/user/update-notifications",
  delete: "/web/user/delete",
};

export const basket = {
  getBasket: "/web/basket/get-basket",
  updateQuantity: "/web/basket/update-quantity",
  clearBasket: "/web/basket/clear-basket",
  addProduct: "/web/basket/add-item-to-basket",
};

export const product = {
  products: "/web/products",
  getProductByPk: (pk: string) => `/web/products/${pk}`,
};

export const checkout = {
  createCheckout: "/web/orders/checkout",
  fetchCheckout: "/web/orders/fetch-order-status",
};

export const user = {
  profile: "/web/user/profile",
};

export const auth = {
  currentUser: "/auth/current-user",
  login: "/auth/login",
  register: "/auth/register",
  changePassword: "/auth/change-password",
};

export const confirms = {
  confirmRegistration: "/auth/verify-registration",
  confirmChangePassword: "/auth/confirm-password-change",
};

const URLS = {
  basket,
  product,
  user,
  account,
  checkout,
};

export { URLS };
