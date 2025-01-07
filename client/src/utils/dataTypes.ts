/**
 * Defines common data types
 */

export enum Page {
   Home,
   SearchResults,
}

export interface AppState {
   page: Page;
   searchQuery: string;
   selectedCategory: Category | null;
}

export interface Department {
   department_id: number;
   department_name: string;
}

export interface Category {
   category_id: number;
   category_name: string;
   department_id: number;
}

export interface Product {
   product_id: number;
   department_id: number;
   category_id: number;
   product_name: string;
   price: string;
   image_link: string;
}