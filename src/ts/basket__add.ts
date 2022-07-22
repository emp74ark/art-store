import { saveUserData } from "./session-storage"
import { basketContainer, Basket, updateBasket } from "./basket__container"

export function addToBasket(item: HTMLElement){
  
  const parent = item.parentElement;
  const id = +parent!.parentElement!.dataset.id!;
  const artist = parent!.childNodes[0].textContent!;
  const name = parent!.childNodes[1].textContent!;
  const price = +parent!.childNodes[2].textContent!;
  const basketContainerSize = Object.keys(basketContainer).length;
  
  if (basketContainerSize === 0){
    basketContainer[0] = new Basket(id, artist, name, price);
    basketContainer[0].amountUp(1);
    Basket.idList.add(basketContainer[0].id);
  } else {
    for (let i = 0; i < basketContainerSize; i++){
      
      Basket.idList.add(basketContainer[i].id);
      
      if(Basket.idList.has(id)){
        if(basketContainer[i].id === id){
          basketContainer[i].amountUp(1);
        }
      } else {
        basketContainer[basketContainerSize] = new Basket(id, artist, name, price);
        basketContainer[basketContainerSize].amountUp(1);
        Basket.idList.add(basketContainer[basketContainerSize].id);
      }
    }
  }
  updateBasket();
  saveUserData();
}