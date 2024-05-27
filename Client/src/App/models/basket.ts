//import { Product } from "./product";

export interface Basket{
id:number;
BuyerId: string;
items:BasketItem[];

}
export interface BasketItem{
    productId: number;

    quantity: number;
  
    name: string;
  
    description: string;
  
    price: number;
  
    pictureUrl: string;
  
    type: string;
  
    brand: string;
  
  }


