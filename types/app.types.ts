export type Modal = {
  newBoard: boolean
  editBoard: boolean
  newTask: boolean
  editTask: boolean
  viewTask: boolean
  closeModal: boolean
  deleteView: boolean
}

export type Board = {
  id: string
  created_at: string
  updated_at: string
  title: string
  user_id: string
  category: Category[]
}

export type Category = {
  id: string
  title: string
  board: Board['id']
  created_at: string
  task: []
}

export type Task = {
  id: string
  created_at: string
  category: Category['id']
  title: string
  description: string
  completed: boolean
  subtask: Subtask[]
}

export type Subtask = {
  id: string
  title: string
  created_at: string
  updated_at: string
  completed: boolean
  task: Task['id']
}

export interface CategoriesByBoard {
  [key: string]: Category
}

export type ArgsForDBAction = string | number | boolean | [string | number | Subtask]

export type DbStoreMethods =
  | 'postBoard'
  | 'setActiveBoard'
  | 'fetchAllBoards'
  | 'updateBoard'
  | 'deleteBoard'
  | 'postCategory'
  | 'updateCategory'
  | 'deleteCategory'
  | 'fetchCategoriesByBoard'
  | 'fetchTasksByCategory'
  | 'setSubtasksForTask'
  | 'createTask'
  | 'postSubtask'
  | 'updateTask'
  | 'deleteTask'
  | 'updateSubtask'
  | 'deleteSubtask'
