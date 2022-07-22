import { basketContainer, Basket, updateBasket, basketItem } from "./basket__container";

export function updateUserData(): void{
  if (localStorage.length === 0){
    localStorage.setItem("basket", JSON.stringify(basketContainer));
  } else {
    const basketData = localStorage.getItem("basket");
    const basketAmountAll = localStorage.getItem("basketTotalAmount");
    if (basketAmountAll !== null){
      Basket.amountAll = JSON.parse(basketAmountAll);
    }
    if ( basketData !== null){
      const tmpObj: basketItem[] = JSON.parse(basketData);
      for (let i=0; i<Object.keys(tmpObj).length; i++){
        basketContainer[i] = new Basket(tmpObj[i]["id"], tmpObj[i]["artist"], tmpObj[i]["name"], tmpObj[i]["price"], tmpObj[i]["amount"]);
      }
    }
    updateBasket();
  }
}

export function saveUserData(){
  localStorage.setItem("basket", JSON.stringify(basketContainer));
  localStorage.setItem("basketTotalAmount", Basket.amountAll.toString())
}