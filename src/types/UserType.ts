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
