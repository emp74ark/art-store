import { itemsList, buildList } from "./resources";
import { setPrices } from "./filter__price";
import { redefineAmount } from "./basket__container";
import { selectCountry } from "./filter__country"

const selectArtist = document.querySelectorAll(".artist") as NodeListOf<HTMLElement>;

function applyArtistFilter(artist: HTMLElement): void{
  const tempArr: number[] = [];
  for (let i=0; i<Object.keys(itemsList).length - 1; i++){
    if (artist.innerText === "All"){
      tempArr.push(i)
    }
    else if (itemsList[i].artist === artist.textContent){
      tempArr.push(i)
    }
  }
  for (let i=0; i<selectArtist.length; i++){
    if(selectArtist[i].innerText === artist.innerText){
      selectArtist[i].classList.add("artist_active");
    } else {
      selectArtist[i].classList.remove("artist_active");
    }
  }
  
  selectCountry.value = "Not selected";

  buildList(tempArr);
  redefineAmount();
  setPrices();
}

export function artistFilter(): void{
  selectArtist.forEach( el => {
    el.addEventListener("click", () => {
      applyArtistFilter(el);
    });
  });
}

export { selectArtist }