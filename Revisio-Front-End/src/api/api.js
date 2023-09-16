import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL : "http://localhost:8000"
    baseURL:process.env.REACT_APP_BASE_URL
}); //to set up base url to make request to server