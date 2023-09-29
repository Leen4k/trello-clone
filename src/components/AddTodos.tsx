"use client"
import axios from 'axios';
import { serverTimestamp } from 'firebase/database';
import React, { useState } from 'react'
import {GrAdd} from "react-icons/gr"
import { getTodoProps } from './DeleteTodo';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

const AddTodos = ({mutate,isLoading}:getTodoProps) => {
    const session = useSession();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const notify = () => toast("Todo has been added");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {

        // Create a new JavaScript Date object representing the current date and time
        const currentDate = new Date();
        const createdAt = currentDate.toISOString();

        e.preventDefault();
        axios.post("api/todos",{title,desc,createdAt,username:session?.data?.user?.email}).then((res)=>{
            mutate();
            notify();
        }).catch((err) => {console.log(err)})
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border text-white border-gray-100 p-2">
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="p-2 bg-[#22272B] rounded-md" placeholder='add another list' />
          <input type="text" value={desc} onChange={e=>setDesc(e.target.value)} className="p-2 bg-[#22272B] rounded-md" placeholder='description' />
          <button type="submit" className="p-2 bg-green-500 flex justify-center"><GrAdd className="text-white rounded-md" /></button>
    </form>
  )
}

export default AddTodos