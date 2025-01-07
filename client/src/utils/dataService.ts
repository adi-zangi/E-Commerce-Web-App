/**
 * Methods to request data from the server
 */

import { AxiosResponse } from 'axios';
import axios from './axiosConfig';

type PromiseResponse = Promise<AxiosResponse<any, any>>;

const getAllProducts = () : PromiseResponse => {
   return axios.get(`/products`);
}

const searchForProducts = (query: string): PromiseResponse => {
   if (query.length === 0) {
      return getAllProducts();
   }
   return axios.get(`/products/search/${query}`);
}

const getProductsByCategory = (categoryId: number): PromiseResponse => {
   return axios.get(`/products/category/${categoryId}`);
}

const getAllDepartments = () : PromiseResponse => {
   return axios.get(`/departments`);
}

const getCategoriesForDepartment = (departmentId: number) : PromiseResponse => {
   return axios.get(`/department/${departmentId}/categories`)
}

export {getAllProducts, searchForProducts, getAllDepartments,
         getCategoriesForDepartment, getProductsByCategory};