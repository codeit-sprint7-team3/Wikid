interface paramsType {
  updatedAt: string;
  securityQuestion: string;
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
  image: null | string;
  code: string;
  name: string;
  id: number;
}

export const params: paramsType = {
  updatedAt: '',
  securityQuestion: '',
  teamId: '',
  content: '',
  nationality: '',
  family: '',
  bloodType: '',
  nickname: '',
  birthday: '',
  sns: '',
  job: '',
  mbti: '',
  city: '',
  image: null,
  code: '',
  name: '',
  id: 1,
};
