import { generateId, sortAndFilterTasks, userEmail, waitTime } from "./helpers";
import { TaskItem } from "./interface";

const WAIT_TIME = 1000;
export const api = {
  async getTasks() {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    waitTime(WAIT_TIME);
    return sortAndFilterTasks(tasks, userEmail());
  },

  async addTask(task: TaskItem) {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    task.id = generateId();
    task.owner = userEmail();
    task.createdDate = new Date();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    await waitTime(WAIT_TIME);
    return sortAndFilterTasks(tasks, userEmail());
  },

  async editTask(task: TaskItem) {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskIndex = tasks.findIndex((t: TaskItem) => t.id === task.id);
    task.createdDate = new Date();
    tasks[taskIndex] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    await waitTime(WAIT_TIME);
    return sortAndFilterTasks(tasks, userEmail());
  },

  async removeTask(id: string) {
    const tasks: TaskItem[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = tasks.filter((task: TaskItem) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    await waitTime(WAIT_TIME);
    return sortAndFilterTasks(filteredTasks, userEmail());
  },
};
