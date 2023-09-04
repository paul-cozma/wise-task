import { generateId, waitTime } from "./helpers";
import { TaskItem } from "./interface";

const WAIT_TIME = 1000;
export const api = {
  async getTasks() {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    waitTime(WAIT_TIME);
    return tasks.filter((task: TaskItem) => task.owner === userEmail());
  },

  async addTask(task: TaskItem) {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    task.id = generateId();
    task.owner = userEmail();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    waitTime(WAIT_TIME);
    return tasks;
  },

  async removeTask(id: string) {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = tasks.filter((task: TaskItem) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    waitTime(WAIT_TIME);
    return filteredTasks;
  },
};

const userEmail = () => {
  const userData = JSON.parse(localStorage.getItem("formData") || "{}");
  return userData.email;
};
