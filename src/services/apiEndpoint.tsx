export const apiEndpoint = {
  user: {
    login: "/users/token",
    me: "/users/me",
    secret: "/users/secret/generate/",
    api_uses: "/users/api-uses/",
    get_secret: "/users/get-secret/",
    package: "/users/packages/",
    edit_profile: "/users/profile/edit/",
    edit_profile_picture: "/users/profile/picture/edit/",
  },
  subscription: {
    package: "/subscription/packages/",
    user_features: "/subscription/user/features/",
    stripe_payment: "/payment/stripe/create/",
    read_invoice: "/invoice/subscription/read/",
    download_invoice: "/invoice/generate-invoice-pdf/",
    read_transaction: "/payment/transaction/read/",
  },
  product: {
    query: "/products",
  },
};
