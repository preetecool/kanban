import { Task } from '~~/types/app.types'
import { store } from './Categories.vue'

export function dragStart(event: DragEvent, task: Task) {
  // const dragIcon = new Image()
  // dragIcon.src = 'path_to_a_1x1_transparent_pixel.png' // or a custom image
  // event.dataTransfer.setDragImage(dragIcon, 0, 0)
  event.dataTransfer.setData('text/plain', task.id)
  store.selectedTask = task
}
