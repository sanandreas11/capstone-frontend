import axios from "axios"
import store from "../app/Store"
import { logout, setToken } from "../features/auth/authSlice"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const res = await axios.post(
        "http://localhost:8081/auth/refresh",
        {},
        { withCredentials: true }
      )

      const newToken = res.data.token
      store.dispatch(setToken(newToken))
      api.defaults.headers.Authorization = `Bearer ${newToken}`
      onRefreshed(newToken)

      return api(originalRequest)
    } catch (err) {
      store.dispatch(logout())
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
