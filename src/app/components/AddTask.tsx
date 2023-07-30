'use client'
import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { addTodo } from '../../../api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  //This is handler to store todo data in ./data/todo.json
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-accent w-full'>Add new task
        <AiOutlinePlus className='ml-2' size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg '>Add New Task</h3>
          <div className='modal-action'>
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text" placeholder="Type here"
              className="input input-bordered input-info w-full"
            />
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>

        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg '>Add New Task</h3>
          <div className='modal-action'>
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text" placeholder="Type here"
              className="input input-bordered input-info w-full"
            />
            <button className='btn btn-outline btn-accent' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
