"use client"
import axios from 'axios';
import React from 'react'
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

export interface getTodoProps {
    id?: string;
    title?: string;
    desc?: string;
    data?: any[];
    mutate?: any;
}

const DeleteTodo = ({id,title,desc,data,mutate}:getTodoProps) => {

    const notify = () => toast("Todo has been deleted");

    const handleDelete = async (id:string) => {
        try{
            const res = await axios.delete(`api/todos/${id}`)
            mutate();
            notify();
        }catch(err){
            console.log(err)
        }
    }

  return (
    <button className="hover:scale-125 transition-all" onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();handleDelete(id)}}><BiTrash /></button>
  )
}

export default DeleteTodo