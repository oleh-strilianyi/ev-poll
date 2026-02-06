import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Participants List</h2>
      <div className="p-4 border rounded bg-gray-50 text-center">
        Список учасників буде тут
      </div>
    </div>
  )
}