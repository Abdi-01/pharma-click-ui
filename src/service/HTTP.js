import axios from "axios";
import { URL_API, headers } from "../Helper";

class HTTP {
  get = (url) => {

    return axios.get(URL_API + url, headers);
  };
  delete = (url) => {
    return axios.delete(URL_API + url, headers);
  };

  patch = (url, body) => {
    // headers = {
    //   ...headers,
    //   Authorization: `Bearer ${localStorage.getItem("tkn_id")}`,
    // };
    console.log("BROOO", URL_API + url)
    return axios.patch(URL_API + url, body, headers);
  };

  post = (url, body) => {
    // let headers = {
    //   ...headersParam,
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem("tkn_id")}`
    //   },
    // };
    
    return axios.post(URL_API + url, body, headers);
  };
}

export default new HTTP();
