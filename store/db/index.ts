import { Task, Subtask, Category, Board } from '~~/types/app.types'
import { useMainStore } from '../main'
import { uuid } from 'vue-uuid'
export const useDBStore = defineStore('db', {
  state: () => ({
    test: 'test',
    isLoadingData: true,
  }),
  actions: {
    registerUser() {
      return ''
    },
    async postBoard(boardId: string, title: string) {
      await $fetch('/api/boards/post', {
        method: 'POST',
        body: {
          id: boardId,
          title: title,
        },
      })
    },
    async setActiveBoard(params: string) {
      const store = useMainStore()
      this.isLoadingData = true
      try {
        const data = await $fetch(`/api/boards/get/${params}`)
        store.activeBoard = data
      } catch (error) {
        console.error('Error fetching board by Id', error)
      } finally {
        this.isLoadingData = false
      }
    },
    async fetchAllBoards() {
      this.isLoadingData = true
      try {
        const data = await $fetch('/api/boards/get/all')
        return data
      } catch (err) {
        console.error('Error fetching all boards', err)
      } finally {
        this.isLoadingData = false
      }
    },
    async updateBoard(id: string, title: Board['title']) {
      await $fetch(`/api/boards/update/${id}`, {
        method: 'PATCH',
        body: {
          title: title,
        },
      })
    },
    async deleteBoard(id: string) {
      const res = await $fetch(`/api/boards/delete/${id}`)
      if (res) {
        navigateTo('/')
      }
    },
    async postCategory(boardId: string, catObjs: [][]) {
      const categories = catObjs.map((pair: []) => ({
        board: boardId,
        title: pair.title,
        id: uuid.v4(),
      }))

      await $fetch('/api/category/post', {
        method: 'POST',
        body: {
          board: boardId,
          categories: categories,
        },
      })
    },
    async updateCategory(id: Category['id'], title: Category['title']) {
      await $fetch(`/api/category/update/${id}`, {
        method: 'PATCH',
        body: {
          title: title,
        },
      })
    },
    async deleteCategory(id: Category['id']) {
      await $fetch(`/api/category/delete/${id}`)
    },

    async fetchTaskById(id: Task['id']) {
      const store = useMainStore()

      this.isLoadingData = true
      try {
        const task = await $fetch(`/api/task/${id}/`)
        store.selectedTask = task as Task
      } catch (err) {
        console.error('Error fetching task by Id', err)
      } finally {
        this.isLoadingData = false
      }
    },
    async fetchCategoriesByBoard(boardId: string) {
      this.isLoadingData = true
      try {
        const data = await $fetch(`/api/category/${boardId}`)
        return data as Category[]
      } catch (error) {
        return console.error('Error fetching categories by board', error)
      } finally {
        this.isLoadingData = false
      }
    },
    async fetchTasksByCategory(id: Category['id']) {
      const response = await $fetch(`/api/category/${id}/tasks/`)
      return response
    },
    setSubtasksForTask() {
      const store = useMainStore()

      return store.selectedTask.subtask
    },
    async createTask(taskId: string, categoryId: string, board: string, title: string, description: string) {
      const data = await $fetch(`/api/task/post/`, {
        method: 'POST',
        body: {
          taskId: taskId,
          categoryId: categoryId,
          board: board,
          title: title,
          description: description,
        },
      })
      return data
    },
    async postSubtask(taskId: string, subtasks: Subtask[]) {
      await $fetch('/api/subtask/post/', {
        method: 'POST',
        body: {
          task: taskId,
          subtasks: subtasks,
        },
      })
    },

    async updateTask(taskId: string, categoryId: string, title?: string, description?: string) {
      await $fetch(`/api/task/update/${taskId}`, {
        method: 'PATCH',
        body: {
          category: categoryId,
          title: title,
          description: description,
        },
      })
    },
    async deleteTask(id: string) {
      const store = useMainStore()
      store.categoriesByBoard[store.selectedTask.category].task.forEach((task, index) => {
        if (task.id === id) {
          store.categoriesByBoard[store.selectedTask.category].task.splice(index, 1)
        }
      })
      await $fetch(`/api/task/delete/${id}`)
    },

    async updateSubtask(id: Subtask['id'], isComplete: boolean, title?: string) {
      await $fetch(`/api/subtask/update/${id}/`, {
        method: 'PATCH',
        body: {
          completed: isComplete,
          title: title ? title : null,
        },
      })
    },
    async deleteSubtask(id: Subtask['id']) {
      await $fetch(`/api/subtask/delete/${id}`)
    },
  },
})
