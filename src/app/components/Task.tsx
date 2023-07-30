'use client'
import React, { FormEventHandler, useState } from 'react'
import { ITask } from '../../../types/tasks'
import { FiEdit } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import Modal from './Modal'
import { deleteTodo, editTodo } from '../../../api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
interface TaskProps {
    task: ITask

}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();

    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitNewTodoEdit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit,
        });
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();

    }

    const handleTaskDelete = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>

                {/* this is for update modal */}
                <FiEdit onClick={() => setOpenModalEdit(true)} size={20} className=' cursor-pointer text-blue-500' />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitNewTodoEdit}>
                        <h3 className='font-bold text-lg '>Edit Task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={e => setTaskToEdit(e.target.value)}
                                type="text" placeholder="Type here"
                                className="input input-bordered input-info w-full"
                            />
                            <button className='btn btn-accent btn-outline' type='submit'>Submit</button>
                        </div>
                    </form>
                </Modal>

                {/* this is for delete modal */}
                <BsTrash onClick={() => setOpenModalDelete(true)} size={20} className=' cursor-pointer text-red-500' />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button onClick={() => handleTaskDelete(task.id)} className='btn btn-outline btn-error'>
                            Yes
                        </button>

                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
