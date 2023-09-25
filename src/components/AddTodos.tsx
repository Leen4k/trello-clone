"use client"
import axios from 'axios';
import React, { useState } from 'react'
import {GrAdd} from "react-icons/gr"

const AddTodos = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("/api/todos",{title,desc}).then((res)=>{
            window.location.reload();
        }).catch((err) => {console.log(err)})
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100">
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="p-2" placeholder='add another list' />
          <input type="text" value={desc} onChange={e=>setDesc(e.target.value)} className="p-2" placeholder='description' />
          <button type="submit" className="p-2 bg-green-500 flex justify-center"><GrAdd className="text-white" /></button>
    </form>
  )
}

export default AddTodos