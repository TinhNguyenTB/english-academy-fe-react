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
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZW1vLmNvbSIsInN1YiI6ImFoaWhpMUBnbWFpbC5jb20iLCJleHAiOjE3NTI2NjQ0NzYsImN1c3RvbUNsYWltIjoiY3VzdG9tIiwiaWF0IjoxNzUyNjYwODc2fQ.zFrGpPMfaIHZd0mZiDm6fo4Or3nMHnQ-bxsYexAlX3nkDeP5eoqKxVjUdEBfbTcYh79dQb15H6yiN4P2vmu5aA`
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
