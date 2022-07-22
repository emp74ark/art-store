import * as itemsList from "../assets/artists.json";
import { basketActions } from "./basket__container";
import { removeSizeFilter, sizeFilter } from "./filter__size";

interface item {
  id: number,
  artist: string,
  country: string,
  name: string,
  image: string,
  date: number,
  description: string,
  price: number,
  size: string,
  amount: number
}

export function buildItem(item: item): HTMLDivElement{

  const itemCard = document.createElement("div");
  itemCard.className = "item";
  itemCard.setAttribute("data-id", item.id.toString())
  itemCard.setAttribute("data-size", item.size)

  const itemImg = document.createElement("img");
  itemImg.src = item.image;
  const itemDescription = document.createElement("div");
  const itemArtist = document.createElement("p");
  itemArtist.className = "item__signature";
  itemArtist.innerText = item.artist;
  const itemName = document.createElement("p");
  itemName.className = "item__signature";
  itemName.innerText = item.name;
  const itemPrice = document.createElement("p");
  itemPrice.className = "item__price";
  itemPrice.innerText = item.price.toString();
  const itemBuy = document.createElement("p");
  itemBuy.className = "item__buy";
  itemBuy.innerText = "Buy";
  const itemAmount = document.createElement("p");
  itemAmount.className = "item__amount";
  itemAmount.innerText = item.amount.toString();
  itemDescription.appendChild(itemArtist);
  itemDescription.appendChild(itemName);
  itemDescription.appendChild(itemPrice);
  itemDescription.appendChild(itemBuy);
  itemDescription.appendChild(itemAmount);

  itemCard.appendChild(itemImg);
  itemCard.appendChild(itemDescription);
  
  return itemCard;
}

export function buildList(arr: number[]): void{
  const itemsContainer = document.querySelector('.items');
  if (itemsContainer !== null){
    itemsContainer.innerHTML = "";
  }
  for (let i=0; i<arr.length; i++){
    if (itemsContainer !== null){
      const newItem = buildItem(itemsList[arr[i]])
      itemsContainer.appendChild(newItem);
    }
  }
  basketActions();
  removeSizeFilter();
  sizeFilter();
}


export function randomItems(): void {
  const tempArr: number[] = [];
  for (let i=0; i<Object.keys(itemsList).length-1; i++){
    tempArr.push(i)
  }
  buildList(tempArr);
}

export {itemsList}