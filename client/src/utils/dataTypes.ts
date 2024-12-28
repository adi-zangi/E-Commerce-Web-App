export enum Page {
   Home,
   SearchResults,
}

export interface AppState {
   page: Page;
   searchQuery: string;
}

export interface Product {
   product_id: number;
   department_id: number;
   category_id: number;
   product_name: string;
   price: string;
   image_link: string;
}