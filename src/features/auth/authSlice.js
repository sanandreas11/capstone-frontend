import { createSlice } from "@reduxjs/toolkit"

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    isAuthenticated: !!token,
    role: role || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.role = action.payload.role
      state.isAuthenticated = true
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("role", action.payload.role)
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem("token", action.payload)
    },
    logout: (state) => {
      state.token = null
      state.role = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
      localStorage.removeItem("role")
    },
  },
})

export const { loginSuccess, logout, setToken } = authSlice.actions
export default authSlice.reducer
