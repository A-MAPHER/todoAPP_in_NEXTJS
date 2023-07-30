import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodo } from '../../api'


export default async function Home() {
  const tasks = await getAllTodo();
  console.log(tasks)
  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4 '>
        <h1 className='text-2xl font-bold'>Todo APP</h1>
        <AddTask />
      </div>
        <TodoList tasks={tasks} />

    </main>
  )
}
