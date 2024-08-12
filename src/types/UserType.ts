export interface User {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: number;
    code: string;
  };
  email: string | null;
}

export interface UserProfile {
  id: number;
  code: string;
  image: string | null;
  city: string | null;
  nationality: string | null;
  job: string | null;
  updateAt: string;
  name: string;
}

export interface Profile {
  updatedAt: string;
  securityQuestion: string;
  securityAnswer: string; // 추가된 부분
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}
