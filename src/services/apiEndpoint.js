export const apiEndpoint = {
  user: {
    login: "/users/token",
    me: "/users/me",
    secret: "/users/secret/",
    get_secret: "/users/get-secret/",
    package: "/users/packages/",
  },
  subscription: {
    package: "/subscription/packages/",
    user_features: "/subscription/user/features/",
    stripe_payment: "/payment/stripe/create/",
    read_invoice: "/invoice/subscription/read/",
    read_transaction: "/payment/transaction/read/",
  },
  product: {
    query: "/products",
  },
};
