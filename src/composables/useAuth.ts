import axiosInstance from '@/axiosInstance'
import { ref } from 'vue'

const userId = ref(null)
const useAuth = () => {
  const singUp = async (obj: object) => {
    try {
      return await axiosInstance.post('/sign-up', obj)
    } catch (e) {
      console.log(e)
    }
  }

  const singIn = async (obj: object) => {
    try {
      return await axiosInstance.post('/sign-in', obj)
    } catch (e) {
      console.log(e)
    }
  }
  const logout = async () => {
    return await axiosInstance.post('logout')
  }

  return { singIn, singUp, logout, userId }
}

export default useAuth
