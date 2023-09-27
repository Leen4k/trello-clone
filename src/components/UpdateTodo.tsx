"use client"
import React, { useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { getTodoProps } from './DeleteTodo'
import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify';

const UpdateTodo = ({id,title,desc,mutate}:getTodoProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newDesc, setNewDesc] = useState<string>(desc);
    const router = useRouter();
    const searchParams = useSearchParams()

    const notify = () => toast("Update Successfull");

    const getSingleTodo = (id:string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("todo_id", id);
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathName,{scroll: false});
        setIsOpen(true);
    }
    const closeModal = () => {
        const searchParams = new URLSearchParams(window.location.search);
        setIsOpen(false);
        searchParams.delete("todo_id");
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathName,{scroll: false});
    }   

    const handleSubmit = async () => {
        const id = searchParams.get('todo_id');
        try{
            await axios.put(`/api/todos/${id}`, {newTitle,newDesc})
            const url = new URLSearchParams(window.location.search);
            url.delete("todo_id");
            const newPathName = `${window.location.pathname}?${url.toString()}`
            router.push(newPathName,{scroll: false});
            setIsOpen(false);
            mutate();
            notify();        
        }catch{
            throw new Error(`update ot kert`);
        }
    }

  return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-50 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-slate-100"
                    >
                        Update Task
                    </Dialog.Title>
                    <div className="flex flex-col gap-2 mt-2">
                        <input type="text" value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}} className="bg-[#22272B] p-2 rounded-md text-sm text-slate-100" placeholder="new title..." />
                        <input type="text" value={newDesc} onChange={(e)=>{setNewDesc(e.target.value)}} className="bg-[#22272B] p-2 rounded-md text-sm text-slate-100" placeholder="new body..." />
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#22272B] px-4 py-2 text-sm font-medium text-[#B5C2CF] hover:bg-[#101204] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                        >
                        Cancel
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                        >
                        Update
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        <button onClick={(e)=>{e.preventDefault();getSingleTodo(id);}} className="hover:scale-125 transition-all" ><BiEditAlt className="rounded-full" /></button>
    </>
  )
}

export default UpdateTodo