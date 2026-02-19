import * as qs from "qs";
import { apiEndpoint } from "./apiEndpoint";
import authApi from "./interceptor/interceptor";

const apiUrl = "http://localhost:8000";

export async function getProductData(query: object) {
  return await authApi
    .get(apiUrl + apiEndpoint.product.query + `?${qs.stringify(query)}`)
    .then((response: any) => {
      return response?.data;
    });
}
