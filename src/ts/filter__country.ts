import { itemsList, buildList } from "./resources";
import { setPrices } from "./filter__price";
import { redefineAmount } from "./basket__container";
import { selectArtist } from "./filter__artist"

const selectCountry  = <HTMLSelectElement>document.querySelector("#country");

function applyCountryFilter(): void{
  const tempArr: number[] = [];
  for (let i=0; i<Object.keys(itemsList).length - 1; i++){
    if (selectCountry.value === "all"){
      tempArr.push(i)
    }
    else if (itemsList[i].country.toLowerCase() === selectCountry.value){
      tempArr.push(i)
    }
  }
  
  buildList(tempArr);
  for(const i of selectArtist ) {i.classList.remove("artist_active")}
  redefineAmount();
  setPrices();
}

export function countryFilter(): void{
  selectCountry.addEventListener("change", () => {applyCountryFilter()});
}

export { selectCountry }