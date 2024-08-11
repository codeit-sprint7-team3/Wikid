export interface Board {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    name: string;
  };
  likeCount: number;
}
