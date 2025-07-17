import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    // if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZW1vLmNvbSIsInN1YiI6ImFoaWhpMUBnbWFpbC5jb20iLCJleHAiOjE3NTI3MjkyNjMsImlhdCI6MTc1MjcyNTY2MywiZGVtbyI6ImRlbW8gY2xhaW0ifQ.Ra9JGS7KapOEo9eWPQICUYAH9nVR1-PhQ8P6WQUm14BFe5l-U1OLXeYxGqyUDxN52RQTE_pB8FqhrWmqKDX4dQ`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
