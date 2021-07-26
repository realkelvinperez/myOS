import axios, { AxiosInstance } from 'axios';

const instance : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3333/api/v1/',
    headers: {
        "Content-type": "application/json"
    }
})

export default instance;