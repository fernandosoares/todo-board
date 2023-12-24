import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

export type Status = 'PLANNING' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type Actions = {
  add: (title: string, description?: string) => void
  drag: (id: string | null) => void
  remove: (id: string) => void
  update: (id: string, status: Status) => void
}

export type State = {
  tasks: Task[]
  draggedTask: string | null
}

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      add: (title, description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: 'PLANNING' },
          ],
        })),
      drag: (id) => set({ draggedTask: id }),
      remove: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      update: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
    }),
    { name: 'task-store', skipHydration: true }
  )
)
