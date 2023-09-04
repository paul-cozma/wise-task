interface FormData {
  fname: string;
  lname: string;
  email: string;
}

interface TaskItem {
  title: string;
  description: string;
  createdDate: Date;
  id: string;
  owner?: string;
  edit?: boolean;
}

interface TaskList {
  tasks: TaskItem[];
}

interface Props {
  onRegistrationSuccess: (formData: FormData) => void;
}

export type { FormData, Props, TaskItem, TaskList };
