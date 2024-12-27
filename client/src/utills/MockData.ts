import logo from '../logos/logo.svg';
import { Product } from './DataTypes';

export const data = [
   {name: "Pencil 1", price: 1.00, image: logo},
   {name: "Pencil 2", price: 1.00, image: logo},
   {name: "Pencil 3", price: 1.00, image: logo},
   {name: "Pencil 4", price: 1.00,image: logo},
   {name: "Pencil 5", price: 1.00,image: logo},
   {name: "Pencil 6", price: 1.00, image: logo},
   {name: "Pen 7", price: 1.00, image: logo},
   {name: "Pen 8", price: 1.00, image: logo},
   {name: "Pen 9", price: 1.00, image: logo},
   {name: "Pen 10", price: 1.00, image: logo},
   {name: "Pen 11", price: 1.00, image: logo},
   {name: "Pen 12", price: 1.00, image: logo},
]

/**
 * Returns an array of products that match the given query
 * An empty search returns all the products in the store
 * @param query The search query
 * @returns An array of products
 */
export const getSearchResults = (query: string): Array<Product> => {
   if (!query) {
      return data;
   }
   return data.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
   );
}