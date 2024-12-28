import { AxiosResponse } from 'axios';
import axios from './axiosConfig';

const getAllProducts = () : Promise<AxiosResponse<any, any>> => {
   return axios.get(`/products`);
}

const searchForProducts = (query: string): Promise<AxiosResponse<any, any>> => {
   if (query.length === 0) {
      return getAllProducts();
   }
   return axios.get(`/products/search/${query}`);
}

const getDepartments = () => {

}

const getCategoriesForDepartment = (department: string) => {

}

export {getAllProducts, searchForProducts};