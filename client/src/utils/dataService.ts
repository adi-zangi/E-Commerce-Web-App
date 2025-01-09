/**
 * Methods to request data from the server
 */

import { AxiosResponse } from 'axios';
import axios from './axiosConfig';

type PromiseResponse = Promise<AxiosResponse<any, any>>;

/**
 * Gets a user from the database
 * @param email The user's email
 * @returns A promise on a User object
 */
const getUser = (email: string) : PromiseResponse => {
   return axios.get(`/users/${email}`);
}

/**
 * Gets all the store products from the database
 * @returns A promise on an array of Product
 */
const getAllProducts = () : PromiseResponse => {
   return axios.get(`/products`);
}

/**
 * Gets the store products that match a given search query from the database
 * @param query The search query
 * @returns A promise on an array of Product
 */
const searchForProducts = (query: string): PromiseResponse => {
   if (query.length === 0) {
      return getAllProducts();
   }
   return axios.get(`/products/search/${query}`);
}

/**
 * Gets the store products with a given category from the database
 * @param categoryId The category id
 * @returns A promise on an array of Product
 */
const getProductsByCategory = (categoryId: number): PromiseResponse => {
   return axios.get(`/products/category/${categoryId}`);
}

/**
 * Gets all the departments from the database
 * @returns A promise on an array of Department
 */
const getAllDepartments = () : PromiseResponse => {
   return axios.get(`/departments`);
}

/**
 * Gets all the categories for a given department
 * @param departmentId The department id
 * @returns A promise on an array of Category
 */
const getCategoriesForDepartment = (departmentId: number) : PromiseResponse => {
   return axios.get(`/department/${departmentId}/categories`)
}

export {getUser, getAllProducts, searchForProducts, getAllDepartments,
         getCategoriesForDepartment, getProductsByCategory};