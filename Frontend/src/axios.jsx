import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api"
  // baseURL : "http://skillful-dream-production.up.railway.app/api"
});

delete API.defaults.headers.common["Authorization"];

export default API;
   