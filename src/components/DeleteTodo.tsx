"use client"
import axios from 'axios';
import React from 'react'
import { BiTrash } from 'react-icons/bi';

interface DeleteTodoProps {
    id: string;
}

const DeleteTodo = ({id}:DeleteTodoProps) => {

    const handleDelete = async (id:string) => {
        try{
            const res = await axios.delete(`api/todos/${id}`)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

  return (
    <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();handleDelete(id)}}><BiTrash /></button>
  )
}

export default DeleteTodo