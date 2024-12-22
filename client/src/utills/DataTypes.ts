export enum Page {
   Home,
   SearchResults,
}

export interface AppState {
   page: Page;
   searchQuery: string;
}

export interface Product {
   name: string
   image: string
}