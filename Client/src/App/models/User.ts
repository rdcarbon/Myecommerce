import { Basket } from "./basket"

export interface User{
    email:string
    username:string,
    token:string,
    basker?:Basket
    
}
