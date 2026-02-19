import * as qs from "qs";

import { apiEndpoint } from "./apiEndpoint";
import authApi from "./interceptor/interceptor";

const apiUrl = "http://localhost:8000";

export async function getPackages() {
  return await authApi
    .get(apiUrl + apiEndpoint.subscription.package)
    .then((response: any) => {
      return response?.data;
    });
}

export async function getUserPackage() {
  return await authApi
    .get(apiUrl + apiEndpoint.subscription.user_features)
    .then((response: any) => {
      return response?.data;
    });
}

export async function SubscriptionPayment(data: object) {
  return await authApi
    .post(apiUrl + apiEndpoint.subscription.stripe_payment, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function getInvoiceData(query: object) {
  return await authApi
    .get(
      apiUrl +
        apiEndpoint.subscription.read_invoice +
        `?${qs.stringify(query)}`,
    )
    .then((response: any) => {
      return response?.data;
    });
}

export async function getTransactionData(query: object) {
  return await authApi
    .get(
      apiUrl +
        apiEndpoint.subscription.read_transaction +
        `?${qs.stringify(query)}`,
    )
    .then((response: any) => {
      return response?.data;
    });
}
