import AddTodos from '@/components/AddTodos';
import DeleteTodo from '@/components/DeleteTodo';
import UpdateTodo from '@/components/UpdateTodo';
import Link from 'next/link';
import React from 'react'
import {BiEditAlt, BiTrash} from "react-icons/bi"
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


type DataProps = {
  id: string;
  title:string;
  desc: string;
  timestamp: any;
  createdAt: any;
}[]

const fetchData = async ():Promise<DataProps> => {
  const res = await fetch("http://localhost:3000/api/todos",{cache: "no-store"})
  if(!res.ok){
    console.log("Couldn't fetch the data hikhikk")
  } 
  return res.json();
}

const Dashboard = async () => {
    const data = await fetchData();
    console.log(data)
  return (
    <section className="h-screen min-w-fit pt-32 px-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
    <div className="flex gap-4 text-sm">
      {data.map((item)=>(
        <div key={item.id} className="flex flex-col gap-2 bg-[#101204] text-[#B5C2CF] px-2 py-4 rounded-lg w-[300px] shrink-0 hover:shadow-xl">
          <h2 className="px-4">{item.title}</h2>
          <div>
            <p className="bg-[#22272B] px-4 py-4 rounded-lg">{item.desc}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 p-2">
              <UpdateTodo id={item.id} title={item.title} desc={item.desc} />
              <DeleteTodo id={item.id} title={item.title} desc={item.desc} data={data} />
            </div>
            <p className="px-4 py-2 rounded-lg">{formatDistanceToNow(new Date(item.createdAt),{addSuffix:true})}</p>
          </div>
        </div>
      ))}
      <AddTodos />
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  </section>
  )
}

export default Dashboard