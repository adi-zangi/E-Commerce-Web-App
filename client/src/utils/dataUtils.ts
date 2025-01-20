/**
 * Utility functions for processing data
 */

import { getAllCategories } from "./dataService";
import { Category, Product } from "./dataTypes";
import levenshtein from "fast-levenshtein";

/**
 * Creates a map for all the categories in the store with id's as keys and
 * category names as values
 * @returns A map with id's and categories
 */
const getIdToCategoryMap = () : Map<number, string> => {
   let categories: Category[] = [];
   let categoryMap = new Map<number, string>();

   getAllCategories()
      .then((res: any) => {
         categories = res.data;
         for (const category of categories) {
            categoryMap.set(category.category_id, category.category_name);
         }
         return categoryMap;
      })
      .catch((e: Error) => {
         console.error(e);
         return categoryMap;
      });
   
   return categoryMap;
}

/**
 * Sorts the given array of products by relevance compared to a search query
 * The relevance is determined by how closely a product's category name matches
 * the query using Levenshtein distance to compare words
 * @param products An array of products produced by a search
 * @param query The search query
 * @returns An array of products sorted by relevance
 */
const sortProductsByRelevance = (products: Product[], query: string,
                                 idToCategoryMap: Map<number, string>) : Product[] => {

   // Skip sorting if the query is one character or less
   if (query.length <= 1) {
      return products;
   }

   // Sort the products using Levenshtein distance
   const sorted = products.sort((a: Product, b: Product) => {
      const firstCategory = idToCategoryMap.get(a.category_id) + "";
      const secondCategory = idToCategoryMap.get(b.category_id) + "";
      const firstDistance = levenshtein.get(firstCategory, query);
      const secondDistance = levenshtein.get(secondCategory, query);
      return firstDistance - secondDistance;
   });

   return sorted;
}

export {getIdToCategoryMap, sortProductsByRelevance};