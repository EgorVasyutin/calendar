import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'cw90932.tw1.ru',
  withCredentials: true,
  timeout: 1000,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return config
})

axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        // const response = await axiosInstance.get('api_calendar/refresh', {
        //   withCredentials: true,
        // })
        // const response = await axiosInstance.get('refresh')
        // console.log(response)
        // localStorage.setItem('accessToken', response.data.accessToken)
        //
        // return axiosInstance.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  },
)

export default axiosInstance
