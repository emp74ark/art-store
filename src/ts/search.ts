import { itemsList, buildList } from "./resources";
import { itemsAllCount } from "./filter__price"
const searchInput = document.getElementById("search") as HTMLInputElement;

function searchArt(): void{
  const tempArr: number[] = [];
  for (let i=0; i<itemsAllCount-1; i++){
    if(itemsList[i].artist.toLocaleLowerCase().includes(searchInput.value) || itemsList[i].name.toLocaleLowerCase().includes(searchInput.value)){
      tempArr.push(i);
    }
    buildList(tempArr);
  }
}

export function searchFilter(): void{
  searchInput.addEventListener("input", () => {searchArt()})
}