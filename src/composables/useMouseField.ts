import { ref } from 'vue'

const mouseFieldDate = ref(null)

const useMouseField = () => {
  const setMouseFieldDate = (date: string | null) => {
    mouseFieldDate.value = date
  }

  return { setMouseFieldDate, mouseFieldDate }
}

export default useMouseField
