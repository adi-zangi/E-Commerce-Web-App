/**
 * Defines common data types
 */

export enum Page {
   Home,
   LogIn,
   SearchResults,
   NoPage,
}

export interface AppState {
   user: User | null;
   idToCategoryMap: Map<number, string>;
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
   category_keyword: string;
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