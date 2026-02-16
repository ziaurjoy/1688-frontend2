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
