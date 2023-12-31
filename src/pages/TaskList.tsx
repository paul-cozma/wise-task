import React, { useEffect, useState } from "react";
import { TaskItem } from "../interface";
import { api } from "../api";
import AddIcon from "../icons/Add";
import DeleteIcon from "../icons/Delete";
import LoadingIcon from "../icons/Loading";
import EditIcon from "../icons/Edit";
import SearchBar from "../SearchBar";

function TaskList() {
  const [formData, setFormData] = useState<TaskItem>({
    title: "",
    description: "",
    id: "",
    createdDate: new Date(),
  });
  const [deletingId, setDeletingId] = useState<string>("");
  const [cacheTasks, setCacheTasks] = useState<TaskItem[]>([]); // cache tasks for search
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [errors, setErrors] = useState<TaskItem>({
    title: "",
    description: "",
    id: "",
    createdDate: new Date(),
    edit: false,
  });

  const dialogRef = React.createRef<HTMLDialogElement>();
  const getData = async () => {
    const tasks = await api.getTasks();
    setTasks(tasks);
    setCacheTasks(tasks);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...errors, title: "", description: "" });
    if (!formData.title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }
    if (!formData.description) {
      setErrors({ ...errors, description: "Description is required" });
      return;
    }
    dialogRef.current?.close();
    const newTasks = formData.edit
      ? await api.editTask(formData)
      : await api.addTask(formData);

    setTasks(newTasks);

    setFormData({ ...formData, title: "", description: "", edit: false });
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await api.removeTask(id);
    getData();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (task: TaskItem) => {
    setFormData({ ...task, edit: true });
    dialogRef.current?.showModal();
  };

  const formatToNiceDate = (date: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(date));
  };
  const searchForTask = () => {
    const filteredTasks = cacheTasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setTasks(filteredTasks);
  };
  return (
    <div className="max-w-6xl w-full">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl my-4">Task List</h1>
        <button
          onClick={() => dialogRef.current?.showModal()}
          title="Add new  task"
        >
          <AddIcon />
        </button>
      </div>
      <SearchBar
        onResetSearch={getData}
        onSetSearchKeyword={(e: string) => setSearchKeyword(e)}
        onSearch={searchForTask}
      />
      <dialog
        open={false}
        ref={dialogRef}
        className="w-full max-w-lg rounded-lg shadow-lg dialog-backdrop"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-lg font-semibold">
              Task Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="p-2 bg-slate-500 text-white rounded hover:bg-slate-600"
            >
              {formData.edit ? "Edit" : "Add"} Task
            </button>
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() =>
                dialogRef.current?.close() &&
                setFormData({ ...formData, edit: false })
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <ul className="">
        {tasks.length === 0 && !loading && (
          <li className="flex justify-center shadow-md rounded-lg p-4 bg-white">
            No tasks added
          </li>
        )}

        {loading && !formData.edit && (
          <li className="flex justify-center items-center shadow-md rounded-lg p-4 bg-white mb-5">
            <LoadingIcon />
          </li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex shadow-md rounded-lg p-4 bg-white mb-5 gap-4"
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
              <span className="text-sm mb-4">{task.description}</span>
              <span className="text-xs">
                Created on {formatToNiceDate(task.createdDate)}
              </span>
            </div>
            <button onClick={() => handleEdit(task)}>
              {formData.id === task.id && loading ? (
                <LoadingIcon />
              ) : (
                <EditIcon />
              )}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              title="Delete task"
              disabled={deletingId === task.id}
            >
              {deletingId === task.id ? <LoadingIcon /> : <DeleteIcon />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
