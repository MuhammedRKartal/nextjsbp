enum GENERAL_ROUTES {
  HOME = '/',
  PRODUCTS = '/products',
  BASKET = '/baskets/basket'
}

enum ORDERS_ROUTES {
  CHECKOUT = '/orders/checkout',
  COMPLETE = '/orders/complete'
}

enum AUTH_ROUTES {
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/users/password/reset'
}

enum ACCOUNT_ROUTES {
  ACCOUNT = '/account',
  CHANGE_PASSWORD = '/account/change-password',
  NOTIFICATION_SETTINGS = '/account/notification-settings',
  ORDERS = '/account/orders?limit=4&page=1',
  FAQ = 'https://discord.com/invite/wowtasker'
}

export const ROUTES = {
  ...GENERAL_ROUTES,
  ...AUTH_ROUTES,
  ...ACCOUNT_ROUTES,
  ...ORDERS_ROUTES
};
