import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResponse } from "../models/pagination";
//import {NavigateFunction}from 'react-router-dom'
//import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});
// let navigate:NavigateFunction;

axiosInstance.defaults.withCredentials = true;
//const responseBody=(response:AxiosResponse)=> response.data;
axiosInstance.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
   
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        // toast.error(data.title);
        break;
      case 401:
        // toast.error(data.title);
        break;
      case 500:
        //toast.error(data.title);
        // window.location.href = './server-error';

        break;
      // case 404:
      //     //toast.error(data.title)
      //     window.location.pathname='./not-found';
      //     break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
const requests = {
  get: async (url: string, params?: URLSearchParams) =>
    await axiosInstance.get(url, { params }),
  post: async (url: string, body: object) =>
    await axiosInstance.post(url, body),
  put: async (url: string, body: object) => await axiosInstance.put(url, body),
  delete: async (url: string) => await axiosInstance.delete(url),
};
const Catalog = {
  list: (params?: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorized"),

  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};
const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
  updateItem: (productId: number, quantity = 1) =>
    requests.put(`basket?productId=${productId}&quantity=${quantity}`, {}),
};
const agent = {
  Catalog,
  TestErrors,
  Basket,
};
export default agent;
