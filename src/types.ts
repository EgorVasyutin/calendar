export interface Task {
  id: number
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  startDate: string
  endDate: string
}

export interface TaskCreatePayload {
  title: string
  isDone: boolean
  startDate: string
  endDate: string
}
