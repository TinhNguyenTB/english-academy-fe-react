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
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZW1vLmNvbSIsInN1YiI6ImFoaWhpMUBnbWFpbC5jb20iLCJleHAiOjE3NTI2NzM0MDgsImN1c3RvbUNsYWltIjoiY3VzdG9tIiwiaWF0IjoxNzUyNjY5ODA4fQ.tEiFLbapNEDuJl63jPCBjgkme6BgA09lRLHnqB8LO-TmNvGBUuv_94a2n0UGdgLKU3CNrt1u3OG7mQYcMZJIAw`
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
