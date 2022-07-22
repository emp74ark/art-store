import "../scss/style.scss";
import { randomItems } from "../../src/ts/resources";
import { priceRangeAll, setPrices, priceFilter, createSlider } from "./filter__price";
import { artistFilter } from "./filter__artist";
import { countryFilter } from "./filter__country";
import { searchFilter } from "./search";
import { resetFilters } from "./reset";
import { sortItemsOnPage } from "./sort";
import { redefineAmount } from "./basket__container"
import { updateUserData } from "./session-storage"

randomItems();
// set from-to prices of items on page
priceRangeAll();
setPrices();

// add sort buttons actions
sortItemsOnPage();

// filters
searchFilter();
artistFilter();
countryFilter();
priceFilter();
createSlider();
resetFilters()

updateUserData();

redefineAmount();