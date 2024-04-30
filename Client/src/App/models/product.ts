
export interface Product{
    id:number;
    name:string;
    description?:string;
    price:number;
    pictureUrl:string;
    type?: string;
    brand?: string;
    quantityInStock?: number;
/**
 *
 */

}

// enum producttype{ shoes, pants, shirt,tshirt};