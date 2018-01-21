import axios from "axios";
import { API_URL } from "app/config";

export const request = (
  opts = {},
) => {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...opts,
    },
    timeout: 15000,
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const axiosApi = axios.create({
    baseURL: API_URL,
    ...defaultOptions,
  });

  return axiosApi;
};

export default request;
