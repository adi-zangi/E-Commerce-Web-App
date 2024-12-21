import logo from '../logos/logo.svg';
import { Product } from './DataTypes';

export const data = [
   {name: "Item 1", image: logo},
   {name: "Item 2", image: logo},
   {name: "Item 3", image: logo},
   {name: "Item 4", image: logo},
   {name: "Item 5", image: logo},
   {name: "Item 6", image: logo},
   {name: "Item 7", image: logo},
   {name: "Item 8", image: logo},
   {name: "Item 9", image: logo},
   {name: "Item 10", image: logo},
   {name: "Item 11", image: logo},
   {name: "Item 12", image: logo},
]

/**
 * Returns the number of search results pages available for the given search query
 * @param query The search query
 * @param itemsPerPage The number of items per page
 */
export const getNumberOfPages = (query: string, itemsPerPage: number): number => {
   return Math.ceil(data.length / itemsPerPage);
}

/**
 * Returns an array of search results for the given search query and page
 * @param query The search query
 * @param pageNumber The page number
 * @param itemsPerPage The number of items per page
 * @returns 
 */
export const getDataForPage = (query: string, pageNumber: number, itemsPerPage: number)
      : Array<Product> => {
   const startIndex = (pageNumber - 1) * itemsPerPage;
   let endIndex = startIndex + itemsPerPage;
   endIndex = endIndex < data.length ? endIndex : data.length;
   return data.slice(startIndex, endIndex);
}