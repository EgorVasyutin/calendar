import { ref } from "vue";
import axiosInstance from "@/axiosInstance";
import { Task } from "@/types";

const useTasks = () => {
  const tasks = ref<Task[]>([]);

  const getCards = async () => {
    try {
      const cards = await axiosInstance.get("todos");
      console.log("cards", cards.data);
      tasks.value = cards.data;
    } catch (e) {
      console.error("Ошибка при запросе задач");
    }
  };

  const newCard = async (title, isDone, priority, type, startDate, endDate) => {
    await axiosInstance.post("todos", {
      title,
      isDone,
      priority,
      type,
      startDate,
      endDate,
    });
  };

  const redact = async (
    id,
    title,
    isDone,
    priority,
    type,
    startDate,
    endDate
  ) => {
    await axiosInstance.put(`todos/${id}`, {
      title,
      isDone,
      priority,
      type,
      startDate,
      endDate,
    });
  };

  const deleteTodo = async (id) => {
    await axiosInstance.delete(`todos/${id}`);
  };

  const patch = async (id, value) => {
    await axiosInstance.patch(`todos/${id}`, value);
  };

  return {
    getCards,
    tasks,
    newCard,
    redact,
    deleteTodo,
    patch,
  };
};

export default useTasks;
