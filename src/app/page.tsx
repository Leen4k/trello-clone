import AddTodos from '@/components/AddTodos';
import DeleteTodo from '@/components/DeleteTodo';
import Link from 'next/link';
import React from 'react'
import {BiEditAlt, BiTrash} from "react-icons/bi"

type DataProps = {
  id: string;
  title:string;
  desc: string;
}[]

const fetchData = async ():Promise<DataProps> => {
  const res = await fetch("http://localhost:3000/api/todos",{cache: "no-store"})
  if(!res.ok){
    console.log("Couldn't fetch the data hikhikk")
  } 
  return res.json();
}



const page = async () => {
  const data = await fetchData();


  return (
    <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen pt-32 px-4">
      <div className="flex gap-4 min-w-screen text-sm">
        {data.map((item)=>(
          <div key={item.id} className="flex flex-col gap-2 bg-[#101204] text-[#B5C2CF] px-2 py-4 rounded-lg w-[300px]">
            <h2 className="px-4">{item.title}</h2>
            <div>
              <p className="bg-[#22272B] px-4 py-4 rounded-lg">{item.desc}</p>
            </div>
            {/* <Link href={`/${item.id}`}><BiEditAlt className="bg-white rounded-full text-black w-6 h-6" />{item.id}</Link> */}
            <DeleteTodo id={item.id} />
          </div>
        ))}
        <AddTodos />
      </div>
    </section>
  )
}

export default page