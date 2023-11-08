import { IProduct } from "./productType";

export interface IForm {
  name: string;
  price: string;
  location: string;
  description: string;
}

export interface IFormComponentProps {
  onSubmit: (data: any) => void;
  product: IProduct | null;
}
