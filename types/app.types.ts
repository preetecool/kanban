export type Modal = {
  newBoard: false
  editBoard: false
  newTask: false
  editTask: false
  viewTask: false
  closeModal: false
  deleteView: false
}

export type Board = {
  id: string
  created_at: string
  updated_at: string
  title: string
  user_id: string
  categories: {}[]
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
  category: string // Category['id]
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
