import axios from "axios";

const api = axios.create();
api.defaults.baseURL = 'http://localhost:5001';

export default api;