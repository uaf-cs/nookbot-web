export type Course = {
  id: string;
  channel: string;
  subject: string;
  course: string;
  section: string;
  title: string;
  instructor: string;
};

export type Subject = {
  id: string;
  name: string;
};

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
