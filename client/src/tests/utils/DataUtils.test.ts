/**
 * Tests the functions in dataUtils.ts
 */

import { Product } from '../../utils/dataTypes';
import { getIdToCategoryMap, sortProductsByRelevance, sortSearchSuggestionsByRelevance } from '../../utils/dataUtils';

describe('Data Utility Tests', () => {
   let idToCategoryMap : Map<number, string>;

   beforeAll(async () => {
         idToCategoryMap = await getIdToCategoryMap();
      });
   
   it("verifies getIdToCategoryMap returns a map from category id's to category names", async () => {
      let expectedMap = new Map([
         [1, "Pencils"],
         [2, "Pens"],
         [3, "Highlighters"],
         [4, "Erasers"],
         [5, "Pencil Sharpeners"],
         [6, "Notebooks"],
         [7, "Notepads"],
         [8, "Sticky Notes"]
      ]);

      expect(idToCategoryMap).toEqual(expectedMap);
   });

   it("verifies sortProductsByRelevance with an empty array returns an empty array", async () => {
      let products : Product[] = [];
      let query = "blabla";
      let sorted = sortProductsByRelevance(products, query, idToCategoryMap);
      expect(sorted).toEqual([]);
   });

   it("verifies sortProductsByRelevance sorts products in the same category corrrectly", async () => {
      let products = [
         {
            product_id: 14,
            department_id: 1,
            category_id: 4,
            product_name: "Paper Mate® Pink Pearl Block Eraser, Pink, 3/Pack",
            price: "4.09",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/383BB641-E7B8-4856-8A6C267968CAEC8B_sc7?wid=700&hei=700",
         },
         {
            product_id: 15,
            department_id: 1,
            category_id: 4,
            product_name: "Paper Mate® White Pearl Latex-Free Plastic Eraser, 3/Pack",
            price: "2.79",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/m002303988_sc7?wid=700&hei=700",
         },
         {
            product_id: 16,
            department_id: 1,
            category_id: 4,
            product_name: "Pentel Hi-Polymer Latex Free Block Eraser, White, 3/Pack",
            price: "3.59",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/s0814463_sc7?wid=700&hei=700",
         },
      ];
      let sortedProducts = [
         {
            product_id: 15,
            department_id: 1,
            category_id: 4,
            product_name: "Paper Mate® White Pearl Latex-Free Plastic Eraser, 3/Pack",
            price: "2.79",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/m002303988_sc7?wid=700&hei=700",
         },
         {
            product_id: 16,
            department_id: 1,
            category_id: 4,
            product_name: "Pentel Hi-Polymer Latex Free Block Eraser, White, 3/Pack",
            price: "3.59",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/s0814463_sc7?wid=700&hei=700",
         },
         {
            product_id: 14,
            department_id: 1,
            category_id: 4,
            product_name: "Paper Mate® Pink Pearl Block Eraser, Pink, 3/Pack",
            price: "4.09",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/383BB641-E7B8-4856-8A6C267968CAEC8B_sc7?wid=700&hei=700",
         },
      ];
      let query = "white eraser";
      let sorted = sortProductsByRelevance(products, query, idToCategoryMap);
      expect(sorted).toEqual(sortedProducts);
   });

   it('verifies sortProductsByRelevance sorts products in the same category corrrectly', async () => {
      let products = [
         {
            product_id: 20,
            department_id: 2,
            category_id: 6,
            product_name: "Five Star 5-Subject Subject Notebooks, 8.5\" x 11\", College Ruled, 200 Sheets",
            price: "11.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/sp171348693_sc7?wid=700&hei=700",
         },
         {
            product_id: 21,
            department_id: 2,
            category_id: 6,
            product_name: "Five Star Soft Petals 1-Subject Notebooks, 8.5\" x 11\", College-Ruled, 80 Sheets, 2/Pack",
            price: "10.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E1FB4063-ABD4-419E-A05B65881CEBC577_sc7?wid=700&hei=700",
         },
         {
            product_id: 22,
            department_id: 2,
            category_id: 6,
            product_name: "Staples Composition Notebooks, College Ruled, 80 Sheets, Assorted Colors, 2/Pack",
            price: "1.99",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/A4E11E9F-8DB1-458A-BD394484419E07C3_sc7?wid=700&hei=700",
         },
         {
            product_id: 23,
            department_id: 2,
            category_id: 6,
            product_name: "Filofax A5 Classic 4-Subject Professional Notebook, College Ruled, 56 Sheets, Black",
            price: "13.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/sp111769894_sc7?wid=700&hei=700",
         },
         {
            product_id: 24,
            department_id: 2,
            category_id: 7,
            product_name: "Staples Notepads, 5\" x 8\", Narrow Ruled, White, 50 Sheets/Pad, Dozen",
            price: "12.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E8EB58A6-1FCF-4A53-9DABEFD0F20E751E_sc7?wid=700&hei=700",
         },
         {
            product_id: 25,
            department_id: 2,
            category_id: 7,
            product_name: "Staples Notepads, 5\" x 8\", Narrow Ruled, Canary, 50 Sheets/Pad, Dozen",
            price: "12.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E217C8B1-7859-4A04-8A102C658BECD21A_sc7?wid=700&hei=700",
         },
         {
            product_id: 26,
            department_id: 2,
            category_id: 7,
            product_name: "TRU RED™ Notepad, 5\" x 8\", Narrow Ruled, Pastels, 50 Sheets/Pad, 6 Pads/Pack",
            price: "10.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/B72E4CAA-50C7-4BAE-9A958266E4B1A039_sc7?wid=700&hei=700",
         },
         {
            product_id: 27,
            department_id: 2,
            category_id: 8,
            product_name: "Post-it Notes, 3\" x 3\", Canary Collection, 100 Sheet/Pad, 12 Pads/Pack",
            price: "13.29",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/54AEF998-2DD5-4EFA-B6CC8AA271777255_sc7?wid=700&hei=700",
         },
         {
            product_id: 28,
            department_id: 2,
            category_id: 8,
            product_name: "Post-it Notes, 3\" x 3\", Supernova Neons Collection, 70 Sheet/Pad, 24 Pads/Pack",
            price: "20.69",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/452A6108-45E7-4047-B9C0874D166A5611_sc7?wid=700&hei=700",
         },
      ];
      let sortedProducts = [
         {
            product_id: 26,
            department_id: 2,
            category_id: 7,
            product_name: "TRU RED™ Notepad, 5\" x 8\", Narrow Ruled, Pastels, 50 Sheets/Pad, 6 Pads/Pack",
            price: "10.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/B72E4CAA-50C7-4BAE-9A958266E4B1A039_sc7?wid=700&hei=700",
         },
         {
            product_id: 24,
            department_id: 2,
            category_id: 7,
            product_name: "Staples Notepads, 5\" x 8\", Narrow Ruled, White, 50 Sheets/Pad, Dozen",
            price: "12.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E8EB58A6-1FCF-4A53-9DABEFD0F20E751E_sc7?wid=700&hei=700",
         },
         {
            product_id: 25,
            department_id: 2,
            category_id: 7,
            product_name: "Staples Notepads, 5\" x 8\", Narrow Ruled, Canary, 50 Sheets/Pad, Dozen",
            price: "12.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E217C8B1-7859-4A04-8A102C658BECD21A_sc7?wid=700&hei=700",
         },
         {
            product_id: 20,
            department_id: 2,
            category_id: 6,
            product_name: "Five Star 5-Subject Subject Notebooks, 8.5\" x 11\", College Ruled, 200 Sheets",
            price: "11.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/sp171348693_sc7?wid=700&hei=700",
         },
         {
            product_id: 21,
            department_id: 2,
            category_id: 6,
            product_name: "Five Star Soft Petals 1-Subject Notebooks, 8.5\" x 11\", College-Ruled, 80 Sheets, 2/Pack",
            price: "10.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/E1FB4063-ABD4-419E-A05B65881CEBC577_sc7?wid=700&hei=700",
         },
         {
            product_id: 22,
            department_id: 2,
            category_id: 6,
            product_name: "Staples Composition Notebooks, College Ruled, 80 Sheets, Assorted Colors, 2/Pack",
            price: "1.99",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/A4E11E9F-8DB1-458A-BD394484419E07C3_sc7?wid=700&hei=700",
         },
         {
            product_id: 23,
            department_id: 2,
            category_id: 6,
            product_name: "Filofax A5 Classic 4-Subject Professional Notebook, College Ruled, 56 Sheets, Black",
            price: "13.39",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/sp111769894_sc7?wid=700&hei=700",
         },
         {
            product_id: 27,
            department_id: 2,
            category_id: 8,
            product_name: "Post-it Notes, 3\" x 3\", Canary Collection, 100 Sheet/Pad, 12 Pads/Pack",
            price: "13.29",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/54AEF998-2DD5-4EFA-B6CC8AA271777255_sc7?wid=700&hei=700",
         },
         {
            product_id: 28,
            department_id: 2,
            category_id: 8,
            product_name: "Post-it Notes, 3\" x 3\", Supernova Neons Collection, 70 Sheet/Pad, 24 Pads/Pack",
            price: "20.69",
            image_link: "https://www.staples-3p.com/s7/is/image/Staples/452A6108-45E7-4047-B9C0874D166A5611_sc7?wid=700&hei=700",
         },
      ];
      let query = "note";
      let sorted = sortProductsByRelevance(products, query, idToCategoryMap);
      expect(sorted).toEqual(sortedProducts);
   });

   it("verifies sortSearchSuggestionsByRelevance sorts search suggestions corrrectly", async () => {
      let suggestions = [
         {
            query: "pencils",
            frequency: 1,
         },
         {
            query: "pens",
            frequency: 1,
         },
         {
            query: "black pens",
            frequency: 2,
         },
         {
            query: "pencil sharpeners",
            frequency: 2,
         },
         {
            query: "mechanical pencils",
            frequency: 2,
         },
         {
            query: "blue pens",
            frequency: 5,
         },
      ];
      let sortedSuggestions = [
         {
            query: "blue pens",
            frequency: 5,
         },
         {
            query: "black pens",
            frequency: 2,
         },
         {
            query: "pens",
            frequency: 1,
         },
         {
            query: "pencil sharpeners",
            frequency: 2,
         },
         {
            query: "mechanical pencils",
            frequency: 2,
         },
         {
            query: "pencils",
            frequency: 1,
         },
      ];
      let query = "pen";
      let sorted = sortSearchSuggestionsByRelevance(suggestions, query);
      expect(sorted).toEqual(sortedSuggestions);
   });
});