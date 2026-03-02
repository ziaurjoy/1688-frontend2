import { apiEndpoint } from "./apiEndpoint";
import authApi from "./interceptor/interceptor";

const apiUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

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

export async function queryAPIUses() {
  return await authApi
    .get(apiUrl + apiEndpoint.user.api_uses)
    .then((response: any) => {
      return response?.data;
    });
}

export async function editUserProfile(data: object) {
  return await authApi
    .patch(apiUrl + apiEndpoint.user.edit_profile, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function editProfilePicture(data: object) {
  return await authApi
    .patch(apiUrl + apiEndpoint.user.edit_profile_picture, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function getUsesData() {
  return await authApi
    .get(apiUrl + apiEndpoint.user.me)
    .then((response: any) => {
      return response?.data;
    });
}

export async function forgetPassword(data: object) {
  return await authApi
    .post(apiUrl + apiEndpoint.user.forget_password, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function verifyOTP(data: object) {
  return await authApi
    .post(apiUrl + apiEndpoint.user.otp_verify, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function resetPassword(data: object) {
  return await authApi
    .post(apiUrl + apiEndpoint.user.reset_password, data)
    .then((response: any) => {
      return response?.data;
    });
}

export async function UserRegistration(data: object) {
  return await authApi
    .post(apiUrl + apiEndpoint.user.user_register, data)
    .then((response: any) => {
      return response?.data;
    });
}
