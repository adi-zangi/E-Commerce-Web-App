/**
 * Utility functions for processing data
 */

import { getAllCategories } from "./dataService";
import { Category, Product } from "./dataTypes";
import levenshtein from "fast-levenshtein";

/**
 * Creates a map for all the categories in the store with category id's as keys
 * and category names as values
 * @returns A map with id's and categories
 */
const getIdToCategoryMap = async () : Promise<Map<number, string>> => {
   let categories: Category[] = [];
   let categoryMap = new Map<number, string>();

   await getAllCategories()
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
 * Returns the distance between a string and a search query
 * A lower distance means the string and search query match more closely
 * @param str A string
 * @param query A search query
 * @returns A positive number representing the distance between the string and
 * search query
 */
const getDistanceToQuery = (str: string, query: string) : number => {
   let distanceToQuery = 0;
   const lowerStr = str.toLowerCase();
   const lowerQuery = query.toLowerCase();
   const strWords = lowerStr.split(/\s|[,]\s/);
   const queryWords = lowerQuery.split(/\s|[,]\s/);
   for (const queryWord of queryWords) {
      let distanceToWord = queryWord.length;
      for (const strWord of strWords) {
         if (strWord.includes(queryWord) || queryWord.includes(strWord)) {
            const distance = Math.abs(strWord.length - queryWord.length);
            if (distance < distanceToWord) {
               distanceToWord = distance;
            }
         }
      }
      distanceToQuery += distanceToWord;
   }
   return distanceToQuery;
}

/**
 * Sorts the given array of products by relevance compared to a search query
 * The relevance is determined by how closely a product's category name matches
 * the query and then how closely a products's name matches the query
 * @param products An array of products produced by a search
 * @param query The search query
 * @param idToCategoryMap A map of category id's and names
 * @returns An array of products sorted by relevance
 */
const sortProductsByRelevance = (products: Product[], query: string,
                                 idToCategoryMap: Map<number, string>) : Product[] => {

   // Skip sorting if the query is one character or less
   if (query.length <= 1) {
      return products;
   }

   // Sort the products by how closely they match the query by category name
   // first and product name second 
   const sorted = products.sort((a: Product, b: Product) => {
      const firstCategory = idToCategoryMap.get(a.category_id) + "";
      const secondCategory = idToCategoryMap.get(b.category_id) + "";
      const firstCategoryDistance = levenshtein.get(firstCategory, query);
      const secondCategoryDistance = levenshtein.get(secondCategory, query);
      if (firstCategoryDistance !== secondCategoryDistance) {
         return firstCategoryDistance - secondCategoryDistance;
      }
      const firstNameDistance = getDistanceToQuery(a.product_name, query);
      const secondNameDistance = getDistanceToQuery(b.product_name, query);
      return firstNameDistance - secondNameDistance;
   });

   return sorted;
}

export {getIdToCategoryMap, sortProductsByRelevance};