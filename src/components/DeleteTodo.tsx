"use client"
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Fragment, useState } from 'react'
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

export interface getTodoProps {
    id?: string;
    title?: string;
    desc?: string;
    data?: any[];
    mutate?: any;
    isLoading?: boolean;
}

const DeleteTodo = ({id,title,desc,data,mutate}:getTodoProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const notify = () => toast("Todo has been deleted");

    const getSingleTodo = (id:any) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("todo_id", id);
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathName,{scroll: false});
        setIsOpen(true);
    }

    const handleDelete = async () => {
        const id = searchParams.get('todo_id');
        try{
            const res = await axios.delete(`api/todos/${id}`)
            mutate();
            notify();
        }catch(err){
            console.log(err)
        }
    }

    const closeModal = () => {
        const searchParams = new URLSearchParams(window.location.search);
        setIsOpen(false);
        searchParams.delete("todo_id");
        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathName,{scroll: false});
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
                        Are you sure you want to delete this TODO?
                    </Dialog.Title>

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
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleDelete}
                        >
                        Delete
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        <button className="hover:scale-125 transition-all" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();getSingleTodo(id)}}><BiTrash /></button>
    </>
    // <button className="hover:scale-125 transition-all" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();handleDelete(id)}}><BiTrash /></button>
  )
}

export default DeleteTodo