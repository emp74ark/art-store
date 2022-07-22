import { itemsList } from "./resources";
import { addToBasket } from "./basket__add"

interface basketItem {
  id: number,
  artist: string,
  name: string,
  price: number,
  amount: number,
  amountUp(n: number): void,
  amountDown(n: number): void
}

let basketContainer: {[key: number | string]: basketItem} = {}

class Basket {
    id: number;
    artist: string;
    name: string;
    price: number;
    amount: number;
    
    static amountAll = 0;
    static idList = new Set;
    
  constructor(id: number, artist: string, name: string, price: number, amount=0){
    this.id = id,
    this.artist = artist,
    this.name = name,
    this.price = price,
    this.amount = amount
  }
  amountUp(n: number){
    this.amount += n;
    Basket.amountAll += n;
  }
  amountDown(n: number){
    this.amount -= n;
    Basket.amountAll -= n;
  }
  static getAmount(){
    return Basket.amountAll;
  }
}

const basketModalWindowList = document.querySelector(".basket-container__list") as HTMLElement;

export function updateBasket(): void{
  redefineAmount();

  basketModalWindowList.textContent = "";
  
  for (let i=0; i<Object.keys(basketContainer).length; i++){
    const basketModalWindowItem = document.createElement("li");
    basketModalWindowItem.className = "basket-container__item";
    basketModalWindowItem.textContent = `${basketContainer[i].artist}: ${basketContainer[i].name} (${basketContainer[i].amount} pcs)`
    basketModalWindowList.appendChild(basketModalWindowItem);
  }
  
  const basketItemsCounter = document.querySelector(".basket-items") as HTMLElement;
  basketItemsCounter.textContent = Basket.getAmount().toString();

  if (Basket.getAmount() > 0){
    basketItemsCounter.style.display = "block";
  } else {
    basketItemsCounter.style.display = "none";
  }
}

export function basketActions(): void{
  const buttonBuy = document.querySelectorAll(".item__buy") as NodeListOf<HTMLElement>;

  buttonBuy.forEach(btn => {
    btn.addEventListener("click", () => {
      if(!btn.classList.contains("item__buy_disabled")){
        addToBasket(btn);
      }
    })
  })

  const basketModalWindow = document.querySelector(".basket-container") as HTMLElement;
  
  const basketButton = document.querySelector(".basket");
  basketButton?.addEventListener("click", () => {
    if (basketModalWindow.style.display !== "block"){
      basketModalWindow.style.display = "block";
    } else {
      basketModalWindow.style.display = "none";
    }
  })
  
  const basketCloseButton = document.querySelector(".basket-container__close");
  basketCloseButton?.addEventListener("click", () => {
    if (basketModalWindow.style.display !== "block"){
      basketModalWindow.style.display = "block";
    } else {
      basketModalWindow.style.display = "none";
    }
  })

  const basketClearButton = document.querySelector(".basket-container__list_clear");
  basketClearButton?.addEventListener("click", () => {
    localStorage.clear();
    basketContainer = {};
    Basket.amountAll = 0;
    updateBasket();
    basketModalWindow.style.display = "none";
  })
}

function searchInBasket(value: number){
  let result;
  for (let i=0; i<Object.keys(basketContainer).length; i++){
    if (value === basketContainer[i].id){
      result = i;
    }
  }
  return result;
}

export function redefineAmount(): void{
  const allItems = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
  allItems.forEach(el => {
    const prevValue = itemsList[+el.dataset.id!]["amount"]
    const btn = el.childNodes[1].childNodes[3] as HTMLElement;
    if (searchInBasket(+el.dataset.id!) !== undefined){
      const itemId = +el.dataset.id!;
      const indexInBasket = searchInBasket(itemId)!;
      const orderedValue = basketContainer[indexInBasket].amount;
      const nextValue = +prevValue - orderedValue;
      if (nextValue > 0){
        el.childNodes[1].childNodes[4].textContent = nextValue.toString();
        el.classList.add("item_in-basket")
      } else {
        el.childNodes[1].childNodes[4].textContent = "Out of stock";
        btn.classList.remove("item__buy");
        btn.classList.add("item__buy_disabled");
      }
    } else {
      el.classList.remove("item_in-basket")
      el.childNodes[1].childNodes[4].textContent = prevValue.toString();
      btn.classList.add("item__buy");
      btn.classList.remove("item__buy_disabled");
    }
  })
}

export { basketContainer, Basket, basketItem }