/**
 * Utility functions for processing data
 */

import { Product } from "./dataTypes";

/**
 * Returns the distance between a given product's name and a given search query
 * @param productName A product's name
 * @param query A search query
 * @returns A number representing the distance between the product's name and
 * search query. A lower number means they match more closely.
 */
const getDistanceToQuery = (productName: string, query: string) : number => {
   let distanceToQuery = 0;
   const lowerName = productName.toLowerCase();
   const lowerQuery = query.toLowerCase();
   const productWords = lowerName.split(/\s|[,]\s/);
   const queryWords = lowerQuery.split(/\s/);
   for (const queryWord of queryWords) {
      let smallestDistance = 0;
      for (const productWord of productWords) {
         if (productWord.includes(queryWord)) {
            const distance = productWord.length - queryWord.length;
            if ((smallestDistance === 0) || distance < smallestDistance) {
               smallestDistance = distance;
            }
         }
      }
      distanceToQuery += smallestDistance;
   }
   return distanceToQuery;
}

/**
 * Sorts the given array of products by relevance compared to a search query
 * The relevance is determined by how closely a product's name matches the query
 * @param products An array of products produced by a search
 * @param query The search query
 * @returns An array of products sorted by relevance
 */
const sortProductsByRelevance = (products: Product[], query: string) : Product[] => {
   if (query.length <= 1) {
      return products;
   }
   const sorted: Product[] = [];
   const relevanceMap = new Map<Number, Product[]>();
   for (const product of products) {
      const distance = getDistanceToQuery(product.product_name, query);
      if (relevanceMap.has(distance)) {
         relevanceMap.get(distance)?.push(product);
      } else {
         relevanceMap.set(distance, [product]);
      }
   }
   const sortedDistance = Array.from(relevanceMap.keys()).sort();
   for (const distance of sortedDistance) {
      const products = relevanceMap.get(distance);
      products?.forEach(product => {
         sorted.push(product);
      });
   }
   return sorted;
}

export {sortProductsByRelevance};