/**
 * Defines common data types
 */

export enum Page {
   Home,
   LogIn,
   SearchResults,
}

export interface AppState {
   page: Page;
   user: User | null;
   searchQuery: string;
   selectedCategory: Category | null;
}

export interface User {
   user_email: string;
   first_name: string;
   last_name: string;
   user_password: string;
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