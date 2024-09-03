import Google from "~/server/routes/auth/google";

export interface GoogleUserDetails {
  name: string;
  picture: string;
}

export interface DiscordUserDetails {
  id: string;
  username: string;
}

declare module "#auth-utils" {
  interface User {
    name: string;
    avatarUrl: string;
  }

  interface UserSession {
    user?: User;
    google?: GoogleUserDetails;
    discord?: DiscordUserDetails;
  }
}

export {};
