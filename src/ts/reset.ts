import { randomItems } from "../../src/ts/resources";
import { setPrices } from "./filter__price";
import { selectCountry } from "./filter__country"
import { selectArtist } from "./filter__artist"

const resetButton = document.getElementById("reset");

function resetAction(): void{
  selectCountry.value = "Not selected";
  for(const i of selectArtist ) {i.classList.remove("artist_active")}
  randomItems();
  setPrices();
}

export function resetFilters(): void{
  if(resetButton !== null){
    resetButton.addEventListener("click", () => {resetAction()});
  }
}