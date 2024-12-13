import logo from '../logos/logo.svg';

interface Item {
   name: string
   image: string
}

export const data = [
   {name: "Item 1", image: logo},
   {name: "Item 2", image: logo},
   {name: "Item 3", image: logo},
   {name: "Item 4", image: logo},
   {name: "Item 5", image: logo},
   {name: "Item 6", image: logo},
   {name: "Item 7", image: logo},
   {name: "Item 8", image: logo},
   {name: "Item 9", image: logo},
   {name: "Item 10", image: logo},
   {name: "Item 11", image: logo},
   {name: "Item 12", image: logo},
]

export const getPage = (pageNumber: number, itemsPerPage: number) : Array<Item>=> {
   const startIndex = (pageNumber - 1) * itemsPerPage;
   let endIndex = startIndex + itemsPerPage;
   endIndex = endIndex < data.length ? endIndex : data.length;
   return data.slice(startIndex, endIndex);
}