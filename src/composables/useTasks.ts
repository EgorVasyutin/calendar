import { ref } from 'vue'
import axiosInstance from '@/axiosInstance'
import { Task } from '@/types'
import useAuth from '@/composables/useAuth'
const { userId } = useAuth()

const useTasks = () => {
  const tasks = ref<Task[]>([])

  const getCards = async () => {
    try {
      const cards = await axiosInstance.get(`todos`)
      console.log('cards', cards.data)
      tasks.value = cards.data.sort((task1, task2) => {
        return new Date(task1.startDate).getTime() - new Date(task2.startDate).getTime()
      })
    } catch (e) {
      console.error('Ошибка при запросе задач')
    }
  }

  const getOneCard = async (id) => {
    try {
      const card = await axiosInstance.get(`todos`)
      console.log('card', card.data[0])

      return card.data[0]
    } catch (e) {
      console.error('Ошибка при запросе задач')
    }
  }

  const newCard = async (task: object) => {
    await axiosInstance.post(`todos`, task)
  }

  const redact = async (id, task: object) => {
    await axiosInstance.put(`todos/${id}`, task)
  }

  const deleteTodo = async (id) => {
    await axiosInstance.delete(`todos/${id}`)
  }

  const patch = async (id, value: object) => {
    await axiosInstance.patch(`todos/${id}`, value)
  }

  return {
    getCards,
    tasks,
    newCard,
    redact,
    deleteTodo,
    patch,
    getOneCard,
  }
}

export default useTasks
