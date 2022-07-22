function sortItemsByPriceUp(): void {
  const allItemsOnPage = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
  const arr = Array.from(allItemsOnPage)
  arr.sort((a, b) => {
    const x = a.childNodes[1].childNodes[2].textContent;
    const y = b.childNodes[1].childNodes[2].textContent;
    return +x! - +y!;
  })
  const itemsContainer = document.querySelector('.items');
  itemsContainer!.innerHTML = "";
  arr.forEach(el => {
    itemsContainer?.appendChild(el);
  })
}

function sortItemsByPriceDown(): void{
  const allItemsOnPage = document.querySelectorAll(".item") as NodeListOf<HTMLElement>;
  const arr = Array.from(allItemsOnPage)
  arr.sort((a, b) => {
    const x = a.childNodes[1].childNodes[2].textContent;
    const y = b.childNodes[1].childNodes[2].textContent;
    return +x! - +y!;
  })
  arr.reverse();
  const itemsContainer = document.querySelector('.items');
  itemsContainer!.innerHTML = "";
  arr.forEach(el => {
    itemsContainer?.appendChild(el);
  })
}

export function sortItemsOnPage(): void{
  const priceUp = document.querySelector(".price__up");
  priceUp?.addEventListener("click", () => {sortItemsByPriceUp()});
  const priceDown = document.querySelector(".price__down");
  priceDown?.addEventListener("click", () => {sortItemsByPriceDown()});
}