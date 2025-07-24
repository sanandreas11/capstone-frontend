import axios from "axios"
import store from "../Redux/store"
import { logout, loginSuccess } from "../Redux/authSlice"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const res = await axios.post(
          "http://localhost:8081/auth/refresh",
          {},
          { withCredentials: true }
        )
        const { token, role } = res.data

        store.dispatch(loginSuccess({ token, role }))
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
