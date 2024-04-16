enum GENERAL_ROUTES {
  HOME = '/',
  PRODUCTS = '/products'
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
  ORDERS = '/account/orders',
  FAQ = '/account/faq'
}

export const ROUTES = {
  ...GENERAL_ROUTES,
  ...AUTH_ROUTES,
  ...ACCOUNT_ROUTES
};
