export interface Course {
  id: string;
  subject: string;
  course: string;
  section: string;
  title: string;
  instructor: string;
  enrolment: string;
  sessionCode: string;
}

export interface User {
  inGuild: boolean;
  updatedNickname: boolean;
  classes: string[];
  subjects: string[];
  status: 'student' | 'alumnus' | 'teacher';

  discord: {
    provider: 'discord';
    username: string;
    locale: string;
    mfa_enabled: boolean;
    flags: number;
    avatar: string;
    discriminator: string;
    verified: boolean;
    fetchedAt: string;
  };
}

export interface Subject {
  id: string;
  name: string;
}
