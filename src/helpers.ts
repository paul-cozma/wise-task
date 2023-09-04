import { TaskItem } from "./interface";

const waitTime = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const generateId = () => {
  return crypto.randomUUID();
};

const userEmail = () => {
  const userData = JSON.parse(localStorage.getItem("formData") || "{}");
  return userData.email;
};

const sortAndFilterTasks = (tasks: TaskItem[], owner: string) => {
  return tasks
    .filter((task: TaskItem) => task.owner === owner)
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
};

export { waitTime, generateId, userEmail, sortAndFilterTasks };
