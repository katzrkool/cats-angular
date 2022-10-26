export interface CatsApiResponse {
  status_code: number;
  data: ICat[];
}

export interface ICat {
  id: string;
  info: Cat;
}

export interface Cat {
  name: string;
  age: number;
  description: string;
}
