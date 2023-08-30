export type Modal = {
    newBoard: false;
    editBoard: false;
    newTask: false;
    editTask: false;
    viewTask: false;
    closeModal: false;
};

export type Board = {
    id: number;
    created_at: string;
    title: string;
    user_id: string;
};
export type Category = {
    id: string;
    title: string;
    board: Board["id"];
    created_at: string;
    task: [];
};

export type Task = {
    id: string;
    created_at: string;
    category: Category["id"];
    title: string;
    description: string;
    completed: boolean;
};

export type Subtask = {
    id: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
    task: Task["id"];
};
