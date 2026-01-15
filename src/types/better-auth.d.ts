import "better-auth";

declare module "better-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}
