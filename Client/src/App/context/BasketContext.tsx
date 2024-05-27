import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { Basket } from "../models/basket";
import agent from "../api/agent";
import { getCookie } from "../util/util";
interface BasketContextType {
  basket: Basket | null;
  setBasket: (bask: Basket) => void;
  removeitem: (id: number, quantity?: number) => void;
}

export const BasketContext = createContext<BasketContextType>({
  basket: null,
  setBasket: () => {},
  removeitem: () => {},

  /* removeitem:(id: number, bask: Basket, quantity = 1) => {
    if (bask) {
      const index = bask.items.findIndex((item) => item.productId == id);
      bask.items[index].quantity -= quantity;
      if (bask.items[index].quantity <= 0)
        bask.items = bask.items.splice(index, 1);
    }
  }
   */
});

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<Basket | null>(null);
  const remitem = (id: number /* , bask: Basket */, quantity = 1) => {
    if (basket) {
      const items = [...basket.items];
      const index = items.findIndex((item) => item.productId == id);
      if (index >= 0) {
        items[index].quantity -= quantity;

        if (items[index].quantity <= 0) items.splice(index, 1);
        console.log("setbasket");
        setBasket((prevstate) => {
        
          return { ...prevstate!,items};
        });

        
      }
    }

  };
  /* const additem=(id:number,quantity=1)=>{
    if (basket){
      const items=[...basket.items]
      const index=items.findIndex(item=>item.productId==id)
      if (index<0){
        // agent.Basket.addItem(id,quantity).then(b=>setBasket(b)).catch((error)=>console.log(error))
        return;
      }
      items[index].quantity+=quantity;
      setBasket((prevstate=>{return {...prevstate!,items}}))

    }
  } */
  useEffect(() => {
    const buyerid = getCookie("buyerId");
    if (buyerid) {
      agent.Basket.get()
        .then((basket) => {
          // console.log(basket)
          setBasket(basket);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  //const applyBasket=(item:Basket)=>{setBasket(item)};
  return (
    <BasketContext.Provider
      value={{ basket:basket,setBasket:setBasket,removeitem:remitem,}}
    >
      {children}
    </BasketContext.Provider>
  );
};
