import { Modal, Task, Board, Category, CategoriesByBoard } from '~~/types/app.types'
import { useDB } from '@/store/db'
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      theme: localStorage.getItem('theme'),
      isSideBarVisible: true,
      isMobileView: true,

      modal: {
        newBoard: false,
        editBoard: false,
        newTask: false,
        editTask: false,
        viewTask: false,
        closeModal: false,
        deleteView: false,
      },
      userBoards: [] as Board[],
      activeBoard: {} as Board,
      inputItems: [],
      selectedTask: {} as Task,
      categoriesByBoard: {} as CategoriesByBoard,
      deleteView: '',
    }
  },
  actions: {
    toggleModal(key: keyof Modal, id?: string) {
      const db = useDB()
      if (key === 'closeModal') {
        return this.closeModal()
      }
      if (key === 'viewTask') {
        db.fetchTaskById(id as Task['id'])
      }
      if (key === 'editTask' || key === 'deleteView') {
        this.modal['viewTask'] = false
      }

      this.modal[key] = !this.modal[key]
    },
    closeModal() {
      for (const key in this.modal) {
        if (this.modal[key as keyof Modal] === true) {
          this.modal[key as keyof Modal] = false
          break
        }
      }
      this.modal['closeModal'] = false
    },
  },
})
