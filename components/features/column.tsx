'use client'

import { Task as TaskType, useTaskStore } from '@/lib/store/task'
import { useEffect, useMemo } from 'react'
import Task from './task'

export default function Column({
  title,
  status,
}: Omit<TaskType, 'id' | 'description'>) {
  const tasks = useTaskStore((state) => state.tasks)
  const update = useTaskStore((state) => state.update)
  const drag = useTaskStore((state) => state.drag)
  const draggedTask = useTaskStore((state) => state.draggedTask)

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  )

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return
    update(draggedTask, status)
    drag(null)
  }

  useEffect(() => {
    useTaskStore.persist.rehydrate()
  }, [])

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 text-2xl font-semibold">{title}</h2>
      <div
        className="mt-3.5 min-h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  )
}
