/**
 * Utility functions for processing data
 */

import { getAllCategories } from "../data/dataService";
import { Category, Page, Product, SearchHistory } from "./dataTypes";
import { distance } from "fastest-levenshtein";
import bcrypt from "bcryptjs";
import { AxiosResponse } from "axios";

/**
 * Returns the value of a page from the Page enum that matches the given pathname
 * @param pathname The pathname of a URL
 * @returns The Page enum value based on the given pathname
 */
const getPageFromPath = (pathname: string): Page => {
   if (pathname === "/") {
      return Page.Home;
   } else if (pathname === "/login") {
      return Page.LogIn;
   } else if (pathname === "/signup") {
      return Page.SignUp;
   } else if (pathname.includes("/results")) {
      return Page.SearchResults;
   }
   return Page.NoPage;
}

/**
 * Returns a hash for the given password
 * @param password The password
 * @returns The hashed password as a string or null if it couldn't be obtained
 */
const getHashedPassword = async (password: string) : Promise<string | null> => {
   let hashedPassword = null;
   const saltRounds = 12;
   await bcrypt.hash(password, saltRounds)
      .then((res: string) => {
         hashedPassword = res;
      })
      .catch((e: Error) => {
         console.log(e);
      });
   return hashedPassword;
}

/**
 * Compares the given password to the given hash and returns true if they match
 * @param password The password
 * @param hash The hash
 * @returns True if the password matches the hash, false otherwise
 */
const comparePassword = async (password: string, hash: string) => {
   let isMatch = false;
   await bcrypt.compare(password, hash)
      .then((res: boolean) => {
         isMatch = res;
      })
      .catch((e: Error) => {
         console.log(e);
      });
   return isMatch;
}

/**
 * Gets a map of all the categories in the store with category id's as keys
 * and category names as values
 * @returns A map with id's and categories
 */
const getIdToCategoryMap = async () : Promise<Map<number, string>> => {
   let categories: Category[] = [];
   let categoryMap = new Map<number, string>();

   await getAllCategories()
      .then((res: AxiosResponse<Category[]>) => {
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
      const firstCategoryDistance = distance(firstCategory, query);
      const secondCategoryDistance = distance(secondCategory, query);
      if (firstCategoryDistance !== secondCategoryDistance) {
         return firstCategoryDistance - secondCategoryDistance;
      }
      const firstNameDistance = getDistanceToQuery(a.product_name, query);
      const secondNameDistance = getDistanceToQuery(b.product_name, query);
      return firstNameDistance - secondNameDistance;
   });

   return sorted;
}

/**
 * Sorts the given array of search suggestions by relevance compared to a search query
 * The relevance is determined by how closely a suggested query matches the search
 * query and then the number of times the suggested query was searched
 * @param suggestions An array of SearchHistory objects that contain the suggestions
 * @param query The search query
 * @returns An array of suggestions as SearchHistory objects sorted by relevance
 */
const sortSearchSuggestionsByRelevance = (suggestions: SearchHistory[],
      query: string) : SearchHistory[] => {
   const sorted = suggestions.sort((a: SearchHistory, b: SearchHistory) => {
      const firstSuggestionDistance = getDistanceToQuery(a.query, query);
      const secondSuggestionDistance = getDistanceToQuery(b.query, query);
      if (firstSuggestionDistance !== secondSuggestionDistance) {
         return firstSuggestionDistance - secondSuggestionDistance;
      }
      return b.frequency - a.frequency;
   });

   return sorted;
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

export { getPageFromPath, getHashedPassword, comparePassword, getIdToCategoryMap,
   sortProductsByRelevance, sortSearchSuggestionsByRelevance};