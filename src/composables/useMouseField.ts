import { ref } from 'vue'

const mouseFieldDate = ref({})

const useMouseField = () => {
  const setMouseFieldDate = (startDate: string | null, endDate: string | null) => {
    // @ts-ignore
    mouseFieldDate.value.startDate = startDate
    // @ts-ignore
    mouseFieldDate.value.endDate = endDate
  }

  return { setMouseFieldDate, mouseFieldDate }
}

export default useMouseField
