import { apiEndpoint } from "./apiEndpoint";
import authApi from "./interceptor/interceptor";

const apiUrl = "http://localhost:8000";

export async function getAccessData() {
  return await authApi
    .get(apiUrl + apiEndpoint.user.login)
    .then((response: any) => {
      return response?.data;
    });
}

export async function getAPIKey() {
  return await authApi
    .get(apiUrl + apiEndpoint.user.get_secret)
    .then((response: any) => {
      return response?.data;
    });
}

export async function generateAppKey() {
  return await authApi
    .get(apiUrl + apiEndpoint.user.secret)
    .then((response: any) => {
      return response?.data;
    });
}
