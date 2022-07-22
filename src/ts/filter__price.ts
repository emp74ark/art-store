import { itemsList } from "./resources";
import * as noUiSlider from 'nouislider';

function priceRangeOnPage(): number[] {
  const priceEl = document.querySelectorAll(".item__price") as NodeListOf<HTMLElement>;
  const priceArr: number[] = [];
  priceEl.forEach(el => {
    if (el.textContent !== null){
      priceArr.push(+el.textContent);
    }
  })
  priceArr.sort((a,b) => a-b);
  return priceArr;
}

const priceFrom = document.querySelector("#priceMin") as HTMLInputElement;
const priceTo = document.querySelector("#priceMax") as HTMLInputElement;

// Get min and max price from all items

let priceMinAll: number;
let priceMaxAll: number;
const itemsAllCount: number = Object.keys(itemsList).length;

export function priceRangeAll(): void {
  const arr: number[] = [];
  for (let i=0; i<itemsAllCount-1; i++){
    arr.push(itemsList[i].price);
  }
  arr.sort((a,b) => a-b);
  priceMinAll = arr[0];
  priceMaxAll = arr[arr.length-1];
}

// Set current range of prices to input

export function setPrices(): void {
  const minPrice: number = priceRangeOnPage()[0];
  priceFrom.value = minPrice.toString();
  const maxPrice: number = priceRangeOnPage()[priceRangeOnPage().length-1];
  priceTo.value = maxPrice.toString();

  slider.noUiSlider?.set([priceFrom.value, priceTo.value])
  slider.noUiSlider?.set([priceFrom.value, priceTo.value])
}

function applyPriceFilter(): void{
  const elementsOnPage = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
  for (let i=0; i<elementsOnPage.length; i++){
    const currPrice = elementsOnPage[i].childNodes[1].childNodes[2].textContent;
    if(currPrice !== null){
      if (+elementsOnPage[i].childNodes[1].childNodes[2].textContent! < +priceFrom.value){
        elementsOnPage[i].style.display = "none";
      }
      else if (+elementsOnPage[i].childNodes[1].childNodes[2].textContent! > +priceTo.value){
        elementsOnPage[i].style.display = "none";
      }
      else {
        elementsOnPage[i].style.display = "flex";
      }
    }
  }
}

// Slider
const slider = document.getElementById('slider') as noUiSlider.target;

export function createSlider(): void {
  
  const sliderMin: number = priceRangeOnPage()[0];
  const sliderMax: number = priceRangeOnPage()[priceRangeOnPage().length-1];
  
  noUiSlider.create(slider, {
    start: [sliderMin, sliderMax],
    connect: true,
    range: {
        'min': priceMinAll,
        'max': priceMaxAll
    },  
    step: 100,
  });

  slider.noUiSlider?.on("update", (values) => {
    priceFrom.value = Math.round(+values[0]).toString();
    priceTo.value = Math.round(+values[1]).toString();
    applyPriceFilter();
  })

  priceFrom.addEventListener("change", () => {
    slider.noUiSlider?.set([priceFrom.value, priceTo.value])
    applyPriceFilter();
  })
  
  priceTo.addEventListener("change", () => {
    slider.noUiSlider?.set([priceFrom.value, priceTo.value])
    applyPriceFilter();
  })
}

export function priceFilter(): void{
  priceFrom.addEventListener("change", () => {applyPriceFilter()});
  priceTo.addEventListener("change", () => {applyPriceFilter()});
}

export { itemsAllCount }