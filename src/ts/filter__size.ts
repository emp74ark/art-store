export function removeSizeFilter(): void{
  const smallSize = document.querySelector("#sizeS") as HTMLElement;
  const mediumSize = document.querySelector("#sizeM") as HTMLElement;
  const largeSize = document.querySelector("#sizeL") as HTMLElement;

  smallSize.classList.remove("size__value_active");
  mediumSize.classList.remove("size__value_active");
  largeSize.classList.remove("size__value_active");

  smallSize.replaceWith(smallSize.cloneNode(true));
  mediumSize.replaceWith(mediumSize.cloneNode(true));
  largeSize.replaceWith(largeSize.cloneNode(true));
}

export function sizeFilter(): void{
  
  const allItems = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
  const smallSize = document.querySelector("#sizeS") as HTMLElement;
  const mediumSize = document.querySelector("#sizeM") as HTMLElement;
  const largeSize = document.querySelector("#sizeL") as HTMLElement;
  
  smallSize.addEventListener("click", ()=> {
    smallSize.classList.toggle("size__value_active");
    mediumSize.classList.remove("size__value_active");
    largeSize.classList.remove("size__value_active");
    allItems.forEach(el => {
      if (el.dataset.size !== "small"){
        if(smallSize.classList.contains("size__value_active")){
          el.classList.add("item-size_invisible");
        } else {
          el.classList.remove("item-size_invisible");
        }
      } else {
        el.classList.remove("item-size_invisible");
      }
    })
  })

  mediumSize.addEventListener("click", ()=>{
    mediumSize.classList.toggle("size__value_active");
    smallSize.classList.remove("size__value_active");
    largeSize.classList.remove("size__value_active");
    allItems.forEach(el => {
      if (el.dataset.size !== "medium"){
        if(mediumSize.classList.contains("size__value_active")){
          el.classList.add("item-size_invisible");
        } else {
          el.classList.remove("item-size_invisible");
        }
      } else {
        el.classList.remove("item-size_invisible");
      }
    })
  })

  largeSize.addEventListener("click", ()=>{
    largeSize.classList.toggle("size__value_active");
    smallSize.classList.remove("size__value_active");
    mediumSize.classList.remove("size__value_active");
    allItems.forEach(el => {
      if (el.dataset.size !== "big"){
        if(largeSize.classList.contains("size__value_active")){
          el.classList.add("item-size_invisible");
        } else {
          el.classList.remove("item-size_invisible");
        }
      } else {
        el.classList.remove("item-size_invisible");
      }
    })
  })

}