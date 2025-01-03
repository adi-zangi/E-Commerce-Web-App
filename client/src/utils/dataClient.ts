import { AxiosResponse } from 'axios';
import { Product } from './dataTypes';
import client from './httpClient';

const getAllProducts = () : Promise<AxiosResponse<Array<Product>, any>> => {
   return client.get(`/products`);
}

const searchForProducts = (keyword: string): Promise<AxiosResponse<any, any>> => {
   if (keyword.length === 0) {
      return getAllProducts();
   }
   return getAllProducts();
}

const getDepartments = () => {

}

const getCategoriesForDepartment = (department: string) => {

}

export {getAllProducts, searchForProducts};