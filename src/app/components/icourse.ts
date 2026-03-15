export interface ICourse {
  id: string;
  title: string;
  instructor: string;
  price: number;
  seats: number;
  image: string;
  catId: string;
  booked?: boolean;
}
