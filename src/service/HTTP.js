import axios from "axios";
import { URL_API } from "../Helper";

class HTTP {
  get = (url, headers = {}) => {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    };

    return axios.get(URL_API + url, headers);
  };
  delete = (url, headers = {}) => {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    };

    return axios.delete(URL_API + url, headers);
  };
  patch = (url, headers = {}) => {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    };

    return axios.patch(URL_API + url, headers);
  };
  post = (url, headers = {}) => {
    headers = {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    };

    return axios.post(URL_API + url, headers);
  };
}

export default new HTTP();
