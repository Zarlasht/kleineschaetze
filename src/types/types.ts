
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: string;
}

export interface Memory{
    id: number;
    title: string;
    image_url?: string;
    description: string;
    date: string;
  };